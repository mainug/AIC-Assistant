import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import {
  WEAPON_PLACEHOLDER_IMAGE,
  WEAPON_RARITY_LABEL,
  WEAPON_TYPE_LABEL,
  getWeaponMeta,
} from "../data/weapons";
import "../styles/endfield.css";

type WeaponOwnership = {
  weaponId: string;
  ownedCount: number;
  totalUsers: number;
  ownershipRate: number;
};

function EndfieldWeaponStatisticsDetailPage() {
  const { weaponId } = useParams<{ weaponId: string }>();

  const [ownershipList, setOwnershipList] = useState<WeaponOwnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const meta = weaponId ? getWeaponMeta(weaponId) : null;

  const location = useLocation();

  const backState = location.state as
    | {
        from?: string;
        fromLabel?: string;
      }
    | undefined;

  const backTo = backState?.from ?? "/endfield/statistics";
  const backLabel = backState?.fromLabel ?? "통계로 돌아가기";

  const ownership = useMemo(() => {
    if (!weaponId) return null;

    return (
      ownershipList.find((item) => item.weaponId === weaponId) ?? {
        weaponId,
        ownedCount: 0,
        totalUsers: 0,
        ownershipRate: 0,
      }
    );
  }, [ownershipList, weaponId]);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!weaponId) return;

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/api/endfield/statistics/weapons/ownership`,
        );

        if (!response.ok) throw new Error("무기 보유율 통계 조회 실패");

        setOwnershipList(await response.json());
      } catch (err) {
        console.error(err);
        setError("무기 상세 정보를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [weaponId]);

  if (loading) {
    return (
      <div className="page">
        <div className="page-inner">불러오는 중...</div>
      </div>
    );
  }

  if (error || !weaponId || !meta) {
    return (
      <div className="page">
        <div className="page-inner">{error || "잘못된 무기 ID입니다."}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="page-inner">
        <header className="page-header">
          <Link className="back-link" to={backTo}>
            ← {backLabel}
          </Link>

          <h1 className="page-title">{meta.name} 상세 정보</h1>
          <p className="page-description">
            AIC Assistant에 공유된 유저 데이터를 기준으로 합니다.
          </p>
        </header>

        <section className="weapon-detail-hero">
          <div className="weapon-detail-image-card">
            <img
              className="weapon-detail-image"
              src={meta.iconUrl || WEAPON_PLACEHOLDER_IMAGE}
              alt={meta.name}
              referrerPolicy="no-referrer"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = WEAPON_PLACEHOLDER_IMAGE;
              }}
            />
          </div>

          <div className="character-detail-info-card">
            <div className="character-detail-top">
              <div>
                <div className="stat-label">무기</div>
                <div className="character-detail-name">{meta.name}</div>
              </div>

              <RateRing rate={ownership?.ownershipRate ?? 0} />
            </div>

            <div className="character-detail-meta-grid">
              <MetaItem label="성급" value={WEAPON_RARITY_LABEL[meta.rarity]} />
              <MetaItem
                label="무기 타입"
                value={WEAPON_TYPE_LABEL[meta.weaponType]}
              />
            </div>

            <div className="character-detail-summary">
              <div>
                <div className="stat-label">보유 인원</div>
                <div className="character-detail-summary-value">
                  {ownership?.ownedCount ?? 0}명
                </div>
              </div>

              <div>
                <div className="stat-label">전체 유저</div>
                <div className="character-detail-summary-value">
                  {ownership?.totalUsers ?? 0}명
                </div>
              </div>

              <div>
                <div className="stat-label">보유율</div>
                <div className="character-detail-summary-value">
                  {ownership?.ownershipRate ?? 0}%
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">무기 설명</h2>

          <div className="detail-text-card">
            <p>{meta.description || "설명 데이터가 없습니다."}</p>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">스킬</h2>

          <div className="skill-list">
            {meta.skills.length > 0 ? (
              meta.skills.map((skill) => (
                <div className="skill-item" key={skill.key}>
                  <div className="skill-name">{skill.value}</div>
                  <div className="skill-key">{skill.key}</div>
                </div>
              ))
            ) : (
              <div className="empty-text">스킬 데이터가 없습니다.</div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="character-detail-meta-item">
      <div className="character-detail-meta-label">{label}</div>
      <div className="character-detail-meta-value">{value}</div>
    </div>
  );
}

function RateRing({ rate }: { rate: number }) {
  const safeRate = Math.max(0, Math.min(rate, 100));

  return (
    <div
      className="collection-rate-ring detail-rate-ring"
      style={
        {
          "--rate": `${safeRate}%`,
        } as CSSProperties
      }
    >
      <div className="collection-rate-ring-inner">{rate}%</div>
    </div>
  );
}

export default EndfieldWeaponStatisticsDetailPage;
