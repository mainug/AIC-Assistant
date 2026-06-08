import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CHARACTER_MAP,
  getCharacterStandingImage,
  CHARACTER_PLACEHOLDER_IMAGE,
} from "../data/operators";
import {
  WEAPON_MAP,
  getWeaponImage,
  WEAPON_PLACEHOLDER_IMAGE,
} from "../data/weapons";
import "../styles/endfield.css";

type Profile = {
  roleId: string;
  lastSyncedAt: string;
};

type Character = {
  charId: string;
  level: number;
  evolvePhase: number;
  owned: boolean;
};

type Weapon = {
  weaponId: string;
  owned: boolean;
};

type ViewMode = "characters" | "weapons";

function EndfieldMyDataPage() {
  const { roleId } = useParams<{ roleId: string }>();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("characters");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!roleId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [profileRes, charactersRes, weaponsRes] = await Promise.all([
          fetch(`http://localhost:8080/api/endfield/users/${roleId}/profile`),
          fetch(
            `http://localhost:8080/api/endfield/users/${roleId}/characters`,
          ),
          fetch(`http://localhost:8080/api/endfield/users/${roleId}/weapons`),
        ]);

        if (!profileRes.ok) throw new Error("프로필 조회 실패");
        if (!charactersRes.ok) throw new Error("캐릭터 조회 실패");
        if (!weaponsRes.ok) throw new Error("무기 조회 실패");

        setProfile(await profileRes.json());
        setCharacters(await charactersRes.json());
        setWeapons(await weaponsRes.json());
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roleId]);

  const ownedCharacters = useMemo(
    () => characters.filter((character) => character.owned),
    [characters],
  );

  const ownedWeapons = useMemo(
    () => weapons.filter((weapon) => weapon.owned),
    [weapons],
  );

  const filteredCharacters = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    if (!trimmed) return ownedCharacters;

    return ownedCharacters.filter((character) => {
      const name = CHARACTER_MAP[character.charId] ?? character.charId;
      return name.toLowerCase().includes(trimmed);
    });
  }, [keyword, ownedCharacters]);

  const filteredWeapons = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    if (!trimmed) return ownedWeapons;

    return ownedWeapons.filter((weapon) => {
      const name = WEAPON_MAP[weapon.weaponId] ?? weapon.weaponId;
      return name.toLowerCase().includes(trimmed);
    });
  }, [keyword, ownedWeapons]);

  if (loading) {
    return (
      <div className="page">
        <div className="page-inner">불러오는 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="page-inner">{error}</div>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="page-inner">
        <header className="page-header">
          <h1 className="page-title">Endfield 내 데이터</h1>
          <p className="page-description">
            추천 팀 편성 페이지에서 감지한 유저 게임 데이터를 기준으로
            표시합니다.
          </p>
        </header>

        <section className="card-grid">
          <StatCard title="Role ID" value={profile?.roleId ?? "-"} />
          <StatCard title="보유 캐릭터" value={`${ownedCharacters.length}명`} />
          <StatCard title="보유 무기" value={`${ownedWeapons.length}개`} />
        </section>

        <section className="section">
          <h2 className="section-title">동기화 정보</h2>
          <div className="stat-card">
            <div className="stat-label">마지막 동기화</div>
            <div style={{ marginTop: 8 }}>
              {formatDateTime(profile?.lastSyncedAt)}
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">보유 목록</h2>

          <div className="toolbar">
            <div className="entity-tabs" style={{ marginTop: 0 }}>
              <button
                className={`entity-tab ${viewMode === "characters" ? "active" : ""}`}
                onClick={() => {
                  setViewMode("characters");
                  setKeyword("");
                }}
              >
                캐릭터 {ownedCharacters.length}
              </button>

              <button
                className={`entity-tab ${viewMode === "weapons" ? "active" : ""}`}
                onClick={() => {
                  setViewMode("weapons");
                  setKeyword("");
                }}
              >
                무기 {ownedWeapons.length}
              </button>
            </div>

            <input
              className="search-input"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder={
                viewMode === "characters"
                  ? "캐릭터 이름 검색"
                  : "무기 이름 검색"
              }
            />
          </div>

          <div style={{ marginTop: 18 }}>
            {viewMode === "characters" ? (
              <CharacterShowcaseGrid characters={filteredCharacters} />
            ) : (
              <WeaponShowcaseGrid weapons={filteredWeapons} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function CharacterShowcaseGrid({ characters }: { characters: Character[] }) {
  if (characters.length === 0) {
    return <div className="empty-text">보유 캐릭터 데이터가 없습니다.</div>;
  }

  return (
    <div className="collection-grid">
      {characters.map((character) => {
        const name = CHARACTER_MAP[character.charId] ?? character.charId;

        return (
          <article className="collection-card" key={character.charId}>
            <div className="collection-image-area">
              <img
                referrerPolicy="no-referrer"
                className="collection-image character-art"
                src={getCharacterStandingImage(character.charId)}
                alt={name}
                onError={(event) => {
                  event.currentTarget.src = CHARACTER_PLACEHOLDER_IMAGE;
                }}
              />

              <div className="collection-top-badge">
                정예화 {character.evolvePhase}
              </div>
            </div>

            <div className="collection-bottom-gradient" />

            <div className="collection-info">
              <div className="collection-name">{name}</div>
              <div className="collection-detail">상세보기 &gt;</div>
            </div>

            <div className="collection-ring">Lv.{character.level}</div>
          </article>
        );
      })}
    </div>
  );
}

function WeaponShowcaseGrid({ weapons }: { weapons: Weapon[] }) {
  if (weapons.length === 0) {
    return <div className="empty-text">보유 무기 데이터가 없습니다.</div>;
  }

  return (
    <div className="collection-grid">
      {weapons.map((weapon) => {
        const name = WEAPON_MAP[weapon.weaponId] ?? weapon.weaponId;

        return (
          <article className="collection-card" key={weapon.weaponId}>
            <div className="collection-image-area">
              <img
                referrerPolicy="no-referrer"
                className="collection-image contain"
                src={getWeaponImage(weapon.weaponId)}
                alt={name}
                onError={(event) => {
                  event.currentTarget.src = WEAPON_PLACEHOLDER_IMAGE;
                }}
              />

              <div className="collection-top-badge">무기</div>
            </div>

            <div className="collection-bottom-gradient" />

            <div className="collection-info">
              <div className="collection-name">{name}</div>
              <div className="collection-detail">상세보기 &gt;</div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

type StatCardProps = {
  title: string;
  value: string;
};

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-label">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function formatDateTime(value?: string) {
  if (!value) return "-";

  try {
    return new Date(value).toLocaleString("ko-KR");
  } catch {
    return value;
  }
}

export default EndfieldMyDataPage;
