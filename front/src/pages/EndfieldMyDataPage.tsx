import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  fetchUserCharacters,
  fetchUserProfile,
  fetchUserWeapons,
} from "../api/endfield";

import type { UserCharacter, UserProfile, UserWeapon } from "../types/endfield";

import {
  CHARACTER_PROFESSION_LABEL,
  CHARACTER_ELEMENT_LABEL,
  CHARACTER_PLACEHOLDER_IMAGE,
  CHARACTER_RARITY_LABEL,
  getCharacterMeta,
} from "../data/operators";
import {
  WEAPON_PLACEHOLDER_IMAGE,
  WEAPON_RARITY_LABEL,
  WEAPON_TYPE_LABEL,
  getWeaponMeta,
} from "../data/weapons";

import { formatDateTime, getRarityRank } from "../utils/endfieldFormat";

import CharacterIconStack from "../components/endfield/CharacterIconStack";
import EmptyState from "../components/endfield/EmptyState";
import StatCard from "../components/endfield/StatCard";

import "../styles/endfield.css";

type ViewMode = "characters" | "weapons";

type MyDataSortMode = "levelDesc" | "evolveDesc" | "nameAsc" | "rarityDesc";

function EndfieldMyDataPage() {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [characters, setCharacters] = useState<UserCharacter[]>([]);
  const [weapons, setWeapons] = useState<UserWeapon[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("characters");
  const [keyword, setKeyword] = useState("");
  const [sortMode, setSortMode] = useState<MyDataSortMode>("levelDesc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!roleId) return;

    localStorage.setItem("aic:lastRoleId", roleId);
  }, [roleId]);

  useEffect(() => {
    if (!roleId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [profileData, charactersData, weaponsData] = await Promise.all([
          fetchUserProfile(roleId),
          fetchUserCharacters(roleId),
          fetchUserWeapons(roleId),
        ]);

        setProfile(profileData);
        setCharacters(charactersData);
        setWeapons(weaponsData);
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roleId]);

  const ownedCharacters = useMemo(() => {
    return characters
      .filter((character) => character.owned)
      .sort((a, b) => {
        const aMeta = getCharacterMeta(a.charId);
        const bMeta = getCharacterMeta(b.charId);

        switch (sortMode) {
          case "evolveDesc":
            if (b.evolvePhase !== a.evolvePhase) {
              return b.evolvePhase - a.evolvePhase;
            }
            if (b.level !== a.level) {
              return b.level - a.level;
            }
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "nameAsc":
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "rarityDesc":
            if (getRarityRank(bMeta.rarity) !== getRarityRank(aMeta.rarity)) {
              return getRarityRank(bMeta.rarity) - getRarityRank(aMeta.rarity);
            }
            if (b.level !== a.level) {
              return b.level - a.level;
            }
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "levelDesc":
          default:
            if (b.level !== a.level) {
              return b.level - a.level;
            }
            if (b.evolvePhase !== a.evolvePhase) {
              return b.evolvePhase - a.evolvePhase;
            }
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");
        }
      });
  }, [characters, sortMode]);

  const ownedWeapons = useMemo(() => {
    return weapons
      .filter((weapon) => weapon.owned)
      .sort((a, b) => {
        const aMeta = getWeaponMeta(a.weaponId);
        const bMeta = getWeaponMeta(b.weaponId);

        switch (sortMode) {
          case "rarityDesc":
            if (getRarityRank(bMeta.rarity) !== getRarityRank(aMeta.rarity)) {
              return getRarityRank(bMeta.rarity) - getRarityRank(aMeta.rarity);
            }
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "nameAsc":
          case "levelDesc":
          case "evolveDesc":
          default:
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");
        }
      });
  }, [weapons, sortMode]);

  const filteredCharacters = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    if (!trimmed) return ownedCharacters;

    return ownedCharacters.filter((character) => {
      const meta = getCharacterMeta(character.charId);
      return meta.name.toLowerCase().includes(trimmed);
    });
  }, [keyword, ownedCharacters]);

  const filteredWeapons = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    if (!trimmed) return ownedWeapons;

    return ownedWeapons.filter((weapon) => {
      const meta = getWeaponMeta(weapon.weaponId);
      return meta.name.toLowerCase().includes(trimmed);
    });
  }, [keyword, ownedWeapons]);

  if (loading) {
    return (
      <div className="page">
        <main className="page-inner">
          <EmptyState
            eyebrow="LOADING"
            title="데이터를 불러오는 중입니다."
            description="공유된 Endfield 데이터를 확인하고 있습니다."
          />
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <main className="page-inner">
          <EmptyState
            eyebrow="ERROR"
            title="데이터를 불러오지 못했습니다."
            description="확장 프로그램에서 데이터를 공유했는지 확인한 뒤 다시 시도해 주세요."
            actionLabel="전체 통계 보기"
            actionHref="/endfield/statistics"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="page-inner">
        <header className="page-header">
          <h1 className="page-title">내 Endfield 데이터</h1>
          <p className="page-description">
            추천 팀 편성 페이지에서 감지해 공유한 유저 게임 데이터를 기준으로
            표시합니다.
          </p>
        </header>

        <section className="card-grid">
          <StatCard title="Role ID" value={profile?.roleId ?? "-"} />
          <StatCard title="보유 캐릭터" value={`${ownedCharacters.length}명`} />
          <StatCard title="보유 무기" value={`${ownedWeapons.length}개`} />
          <StatCard
            title="마지막 동기화"
            value={formatDateTime(profile?.lastSyncedAt)}
          />
        </section>

        <section className="section">
          <div className="section-heading-row">
            <div>
              <h2 className="section-title">보유 목록</h2>
              <p className="section-subtitle">
                {viewMode === "characters"
                  ? `캐릭터 ${filteredCharacters.length}명 표시 중`
                  : `무기 ${filteredWeapons.length}개 표시 중`}
              </p>
            </div>

            <Link
              className="entity-tab"
              to={`/endfield/statistics?roleId=${profile?.roleId ?? roleId}`}
            >
              전체 통계 보기
            </Link>
          </div>

          <div className="toolbar">
            <div className="toolbar-left">
              <div className="entity-tabs">
                <button
                  className={`entity-tab ${
                    viewMode === "characters" ? "active" : ""
                  }`}
                  onClick={() => {
                    setViewMode("characters");
                    setKeyword("");
                    setSortMode("levelDesc");
                  }}
                >
                  캐릭터 {ownedCharacters.length}
                </button>

                <button
                  className={`entity-tab ${
                    viewMode === "weapons" ? "active" : ""
                  }`}
                  onClick={() => {
                    setViewMode("weapons");
                    setKeyword("");
                    setSortMode("nameAsc");
                  }}
                >
                  무기 {ownedWeapons.length}
                </button>
              </div>
            </div>

            <div className="toolbar-right">
              <select
                className="sort-select"
                value={sortMode}
                onChange={(event) =>
                  setSortMode(event.target.value as MyDataSortMode)
                }
              >
                {viewMode === "characters" ? (
                  <>
                    <option value="levelDesc">레벨 높은 순</option>
                    <option value="evolveDesc">정예화 높은 순</option>
                    <option value="nameAsc">이름순</option>
                    <option value="rarityDesc">성급 높은 순</option>
                  </>
                ) : (
                  <>
                    <option value="nameAsc">이름순</option>
                    <option value="rarityDesc">성급 높은 순</option>
                  </>
                )}
              </select>

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
          </div>

          <div style={{ marginTop: 18 }}>
            {viewMode === "characters" ? (
              <CharacterShowcaseGrid
                characters={filteredCharacters}
                onSelect={(charId) =>
                  navigate(`/endfield/statistics/characters/${charId}`, {
                    state: {
                      from: `/my/endfield/${roleId}`,
                      fromLabel: "내 데이터로 돌아가기",
                    },
                  })
                }
              />
            ) : (
              <WeaponShowcaseGrid
                weapons={filteredWeapons}
                onSelect={(weaponId) =>
                  navigate(`/endfield/statistics/weapons/${weaponId}`, {
                    state: {
                      from: `/my/endfield/${roleId}`,
                      fromLabel: "내 데이터로 돌아가기",
                    },
                  })
                }
              />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function CharacterShowcaseGrid({
  characters,
  onSelect,
}: {
  characters: UserCharacter[];
  onSelect: (charId: string) => void;
}) {
  if (characters.length === 0) {
    return (
      <div className="empty-text">
        조건에 맞는 보유 캐릭터가 없습니다. 검색어를 바꿔보세요.
      </div>
    );
  }

  return (
    <div className="collection-grid">
      {characters.map((character) => {
        const meta = getCharacterMeta(character.charId);

        return (
          <article
            className="collection-card"
            key={character.charId}
            onClick={() => onSelect(character.charId)}
          >
            <div className="collection-image-area">
              <CharacterIconStack
                element={meta.element}
                profession={meta.profession}
              />

              <img
                referrerPolicy="no-referrer"
                className="collection-image character-art"
                src={meta.standingImage || CHARACTER_PLACEHOLDER_IMAGE}
                alt={meta.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = CHARACTER_PLACEHOLDER_IMAGE;
                }}
              />

              <div className="collection-top-badge">
                정예화 {character.evolvePhase}
              </div>
            </div>

            <div className="collection-bottom-gradient" />

            <div className="collection-info">
              <div className="collection-name">{meta.name}</div>
              <div className="collection-detail">
                {CHARACTER_RARITY_LABEL[meta.rarity]} ·{" "}
                {CHARACTER_ELEMENT_LABEL[meta.element]} ·{" "}
                {CHARACTER_PROFESSION_LABEL[meta.profession]}
              </div>
            </div>

            <div className="collection-ring">Lv.{character.level}</div>
          </article>
        );
      })}
    </div>
  );
}

function WeaponShowcaseGrid({
  weapons,
  onSelect,
}: {
  weapons: UserWeapon[];
  onSelect: (weaponId: string) => void;
}) {
  if (weapons.length === 0) {
    return (
      <div className="empty-text">
        조건에 맞는 보유 무기가 없습니다. 검색어를 바꿔보세요.
      </div>
    );
  }

  return (
    <div className="collection-grid">
      {weapons.map((weapon) => {
        const meta = getWeaponMeta(weapon.weaponId);

        return (
          <article
            className="collection-card"
            key={weapon.weaponId}
            onClick={() => onSelect(weapon.weaponId)}
          >
            <div className="collection-image-area">
              <img
                referrerPolicy="no-referrer"
                className="collection-image contain"
                src={meta.iconUrl || WEAPON_PLACEHOLDER_IMAGE}
                alt={meta.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = WEAPON_PLACEHOLDER_IMAGE;
                }}
              />

              <div className="collection-top-badge">
                {WEAPON_RARITY_LABEL[meta.rarity]}
              </div>
            </div>

            <div className="collection-bottom-gradient" />

            <div className="collection-info">
              <div className="collection-name">{meta.name}</div>
              <div className="collection-detail">
                {WEAPON_RARITY_LABEL[meta.rarity]} ·{" "}
                {WEAPON_TYPE_LABEL[meta.weaponType]}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default EndfieldMyDataPage;
