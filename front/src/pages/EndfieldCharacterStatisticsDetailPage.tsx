import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import {
  CHARACTER_CLASS_LABEL,
  CHARACTER_ELEMENT_LABEL,
  CHARACTER_PLACEHOLDER_IMAGE,
  CHARACTER_RARITY_LABEL,
  CHARACTER_WEAPON_TYPE_LABEL,
  getCharacterMeta,
} from "../data/operators";
import "../styles/endfield.css";

type CharacterOwnership = {
  charId: string;
  ownedCount: number;
  totalUsers: number;
  ownershipRate: number;
};

type EvolvePhaseStat = {
  evolvePhase: number;
  count: number;
};

type LevelDistributionStat = {
  levelRange: string;
  count: number;
};

function EndfieldCharacterStatisticsDetailPage() {
  const { charId } = useParams<{ charId: string }>();

  const [ownershipList, setOwnershipList] = useState<CharacterOwnership[]>([]);
  const [evolvePhaseStats, setEvolvePhaseStats] = useState<EvolvePhaseStat[]>(
    [],
  );
  const [levelStats, setLevelStats] = useState<LevelDistributionStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const meta = charId ? getCharacterMeta(charId) : null;

  const ownership = useMemo(() => {
    if (!charId) return null;

    return (
      ownershipList.find((item) => item.charId === charId) ?? {
        charId,
        ownedCount: 0,
        totalUsers: 0,
        ownershipRate: 0,
      }
    );
  }, [ownershipList, charId]);

  useEffect(() => {
    if (!charId) return;

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError("");

        const [ownershipRes, evolveRes, levelRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/endfield/statistics/characters/ownership`),
          fetch(
            `${API_BASE_URL}/api/endfield/statistics/characters/${charId}/evolve-phase`,
          ),
          fetch(
            `${API_BASE_URL}/api/endfield/statistics/characters/${charId}/level-distribution`,
          ),
        ]);

        if (!ownershipRes.ok) throw new Error("보유율 통계 조회 실패");
        if (!evolveRes.ok) throw new Error("정예화 상세 통계 조회 실패");
        if (!levelRes.ok) throw new Error("레벨 상세 통계 조회 실패");

        setOwnershipList(await ownershipRes.json());
        setEvolvePhaseStats(await evolveRes.json());
        setLevelStats(await levelRes.json());
      } catch (err) {
        console.error(err);
        setError("상세 통계를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [charId]);

  if (loading) {
    return (
      <div className="page">
        <div className="page-inner">불러오는 중...</div>
      </div>
    );
  }

  if (error || !charId || !meta) {
    return (
      <div className="page">
        <div className="page-inner">{error || "잘못된 캐릭터 ID입니다."}</div>
      </div>
    );
  }

  const maxEvolve = Math.max(...evolvePhaseStats.map((item) => item.count), 0);
  const maxLevel = Math.max(...levelStats.map((item) => item.count), 0);

  const location = useLocation();

  const backState = location.state as
    | {
        from?: string;
        fromLabel?: string;
      }
    | undefined;

  const backTo = backState?.from ?? "/endfield/statistics";
  const backLabel = backState?.fromLabel ?? "통계로 돌아가기";

  return (
    <div className="page">
      <main className="page-inner">
        <header className="page-header">
          <Link className="back-link" to={backTo}>
            ← {backLabel}
          </Link>

          <h1 className="page-title">{meta.name} 상세 통계</h1>
          <p className="page-description">
            AIC Assistant에 공유된 유저 데이터를 기준으로 합니다.
          </p>
        </header>

        <section className="character-detail-hero">
          <div className="character-detail-image-card">
            <img
              src={meta.standingImage || CHARACTER_PLACEHOLDER_IMAGE}
              alt={meta.name}
              className="character-detail-image"
              referrerPolicy="no-referrer"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = CHARACTER_PLACEHOLDER_IMAGE;
              }}
            />
          </div>

          <div className="character-detail-info-card">
            <div className="character-detail-top">
              <div>
                <div className="stat-label">캐릭터</div>
                <div className="character-detail-name">{meta.name}</div>
              </div>

              <RateRing rate={ownership?.ownershipRate ?? 0} />
            </div>

            <div className="character-detail-meta-grid">
              <MetaItem
                label="성급"
                value={CHARACTER_RARITY_LABEL[meta.rarity]}
              />
              <MetaItem
                label="속성"
                value={CHARACTER_ELEMENT_LABEL[meta.element]}
              />
              <MetaItem
                label="직업군"
                value={CHARACTER_CLASS_LABEL[meta.classType]}
              />
              <MetaItem
                label="사용 무기"
                value={CHARACTER_WEAPON_TYPE_LABEL[meta.weaponType]}
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

        <section className="section two-column-section">
          <div>
            <h2 className="section-title">정예화 단계 분포</h2>

            <div className="distribution-card">
              {evolvePhaseStats.map((item) => (
                <DistributionBar
                  key={item.evolvePhase}
                  label={`정예화 ${item.evolvePhase}`}
                  count={item.count}
                  max={maxEvolve}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="section-title">주요 레벨 구간</h2>

            <div className="distribution-card">
              {levelStats.map((item) => (
                <DistributionBar
                  key={item.levelRange}
                  label={`Lv.${item.levelRange}`}
                  count={item.count}
                  max={maxLevel}
                />
              ))}
            </div>
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

function DistributionBar({
  label,
  count,
  max,
}: {
  label: string;
  count: number;
  max: number;
}) {
  const width = max === 0 ? 0 : (count / max) * 100;

  return (
    <div className="distribution-row">
      <div className="distribution-label">{label}</div>

      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${width}%` }} />
      </div>

      <div className="distribution-count">{count}</div>
    </div>
  );
}

export default EndfieldCharacterStatisticsDetailPage;
