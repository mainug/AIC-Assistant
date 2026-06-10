import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  fetchCharacterOwnership,
  fetchEndfieldStatisticsSummary,
  fetchUserCharacters,
  fetchUserWeapons,
  fetchWeaponOwnership,
} from "../api/endfield";

import type {
  CharacterOwnership,
  EndfieldStatisticsSummary,
  UserCharacter,
  UserWeapon,
  WeaponOwnership,
} from "../types/endfield";

import {
  CHARACTER_PROFESSION_LABEL,
  CHARACTER_ELEMENT_LABEL,
  CHARACTER_META_MAP,
  CHARACTER_PLACEHOLDER_IMAGE,
  CHARACTER_RARITY_LABEL,
  getCharacterMeta,
  type CharacterProfession,
  type CharacterElement,
  type CharacterRarity,
  type CharacterWeaponType,
} from "../data/operators";
import {
  WEAPON_META_MAP,
  WEAPON_PLACEHOLDER_IMAGE,
  WEAPON_RARITY_LABEL,
  WEAPON_TYPE_LABEL,
  getWeaponMeta,
  type WeaponRarity,
  type WeaponType,
} from "../data/weapons";

import { formatRate, getRarityRank } from "../utils/endfieldFormat";

import CharacterIconStack from "../components/endfield/CharacterIconStack";
import EmptyState from "../components/endfield/EmptyState";
import StatCard from "../components/endfield/StatCard";
import StatisticsToolbar from "../components/endfield/StatisticsToolbar";

import "../styles/endfield.css";

type StatisticsViewMode = "characters" | "weapons";
type OwnershipFilter = "all" | "ownedOnly";

type CharacterRarityFilter = "all" | CharacterRarity;
type CharacterElementFilter = "all" | CharacterElement;
type CharacterClassFilter = "all" | CharacterProfession;
type CharacterWeaponTypeFilter = "all" | CharacterWeaponType;

type WeaponRarityFilter = "all" | WeaponRarity;
type WeaponTypeFilter = "all" | WeaponType;

type SortMode = "ownershipDesc" | "ownershipAsc" | "nameAsc" | "rarityDesc";

function EndfieldStatisticsPage() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState<EndfieldStatisticsSummary | null>(
    null,
  );
  const [characters, setCharacters] = useState<CharacterOwnership[]>([]);
  const [weapons, setWeapons] = useState<WeaponOwnership[]>([]);

  const [viewMode, setViewMode] = useState<StatisticsViewMode>("characters");
  const [keyword, setKeyword] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("ownershipDesc");

  const [ownershipFilter, setOwnershipFilter] =
    useState<OwnershipFilter>("all");

  const [characterRarityFilter, setCharacterRarityFilter] =
    useState<CharacterRarityFilter>("all");
  const [elementFilter, setElementFilter] =
    useState<CharacterElementFilter>("all");
  const [classFilter, setClassFilter] = useState<CharacterClassFilter>("all");
  const [characterWeaponTypeFilter, setCharacterWeaponTypeFilter] =
    useState<CharacterWeaponTypeFilter>("all");

  const [weaponRarityFilter, setWeaponRarityFilter] =
    useState<WeaponRarityFilter>("all");
  const [weaponTypeFilter, setWeaponTypeFilter] =
    useState<WeaponTypeFilter>("all");

  const [searchParams] = useSearchParams();
  const roleIdFromUrl = searchParams.get("roleId");

  const [storedRoleId, setStoredRoleId] = useState(() => {
    return localStorage.getItem("aic:lastRoleId");
  });

  const currentRoleId = roleIdFromUrl ?? storedRoleId;

  useEffect(() => {
    if (!roleIdFromUrl) return;

    localStorage.setItem("aic:lastRoleId", roleIdFromUrl);
    setStoredRoleId(roleIdFromUrl);
  }, [roleIdFromUrl]);

  const [myCharacters, setMyCharacters] = useState<UserCharacter[]>([]);
  const [myWeapons, setMyWeapons] = useState<UserWeapon[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          summaryData,
          charactersData,
          weaponsData,
          myCharactersData,
          myWeaponsData,
        ] = await Promise.all([
          fetchEndfieldStatisticsSummary(),
          fetchCharacterOwnership(),
          fetchWeaponOwnership(),
          currentRoleId
            ? fetchUserCharacters(currentRoleId)
            : Promise.resolve([]),
          currentRoleId ? fetchUserWeapons(currentRoleId) : Promise.resolve([]),
        ]);

        setSummary(summaryData);
        setCharacters(charactersData);
        setWeapons(weaponsData);
        setMyCharacters(myCharactersData);
        setMyWeapons(myWeaponsData);
      } catch (err) {
        console.error(err);
        setError("통계 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [currentRoleId]);

  const characterOwnershipMap = useMemo(() => {
    return new Map(
      characters.map((character) => [character.charId, character]),
    );
  }, [characters]);

  const allCharacters = useMemo<CharacterOwnership[]>(() => {
    const totalUsers = summary?.totalUsers ?? 0;

    return Object.keys(CHARACTER_META_MAP).map((charId) => {
      const stat = characterOwnershipMap.get(charId);

      return {
        charId,
        ownedCount: stat?.ownedCount ?? 0,
        totalUsers,
        ownershipRate: stat?.ownershipRate ?? 0,
      };
    });
  }, [characterOwnershipMap, summary?.totalUsers]);

  const weaponOwnershipMap = useMemo(() => {
    return new Map(weapons.map((weapon) => [weapon.weaponId, weapon]));
  }, [weapons]);

  const allWeapons = useMemo<WeaponOwnership[]>(() => {
    const totalUsers = summary?.totalUsers ?? 0;

    return Object.keys(WEAPON_META_MAP).map((weaponId) => {
      const stat = weaponOwnershipMap.get(weaponId);

      return {
        weaponId,
        ownedCount: stat?.ownedCount ?? 0,
        totalUsers,
        ownershipRate: stat?.ownershipRate ?? 0,
      };
    });
  }, [weaponOwnershipMap, summary?.totalUsers]);

  const myOwnedCharacterIdSet = useMemo(() => {
    return new Set(
      myCharacters
        .filter((character) => character.owned)
        .map((character) => character.charId),
    );
  }, [myCharacters]);

  const myOwnedWeaponIdSet = useMemo(() => {
    return new Set(
      myWeapons
        .filter((weapon) => weapon.owned)
        .map((weapon) => weapon.weaponId),
    );
  }, [myWeapons]);

  const filteredCharacters = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    const source =
      ownershipFilter === "ownedOnly"
        ? allCharacters.filter((character) =>
            myOwnedCharacterIdSet.has(character.charId),
          )
        : allCharacters;

    return source
      .filter((character) => {
        const meta = getCharacterMeta(character.charId);

        if (trimmed && !meta.name.toLowerCase().includes(trimmed)) {
          return false;
        }

        if (
          characterRarityFilter !== "all" &&
          meta.rarity !== characterRarityFilter
        ) {
          return false;
        }

        if (elementFilter !== "all" && meta.element !== elementFilter) {
          return false;
        }

        if (classFilter !== "all" && meta.profession !== classFilter) {
          return false;
        }

        if (
          characterWeaponTypeFilter !== "all" &&
          meta.weaponType !== characterWeaponTypeFilter
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const aMeta = getCharacterMeta(a.charId);
        const bMeta = getCharacterMeta(b.charId);

        switch (sortMode) {
          case "ownershipAsc":
            if (a.ownershipRate !== b.ownershipRate) {
              return a.ownershipRate - b.ownershipRate;
            }
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "nameAsc":
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "rarityDesc":
            if (getRarityRank(bMeta.rarity) !== getRarityRank(aMeta.rarity)) {
              return getRarityRank(bMeta.rarity) - getRarityRank(aMeta.rarity);
            }

            if (b.ownershipRate !== a.ownershipRate) {
              return b.ownershipRate - a.ownershipRate;
            }

            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "ownershipDesc":
          default:
            if (b.ownershipRate !== a.ownershipRate) {
              return b.ownershipRate - a.ownershipRate;
            }

            if (b.ownedCount !== a.ownedCount) {
              return b.ownedCount - a.ownedCount;
            }

            return aMeta.name.localeCompare(bMeta.name, "ko-KR");
        }
      });
  }, [
    allCharacters,
    keyword,
    ownershipFilter,
    myOwnedCharacterIdSet,
    characterRarityFilter,
    elementFilter,
    classFilter,
    characterWeaponTypeFilter,
    sortMode,
  ]);

  const filteredWeapons = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    const source =
      ownershipFilter === "ownedOnly"
        ? allWeapons.filter((weapon) => myOwnedWeaponIdSet.has(weapon.weaponId))
        : allWeapons;

    return source
      .filter((weapon) => {
        const meta = getWeaponMeta(weapon.weaponId);

        if (trimmed && !meta.name.toLowerCase().includes(trimmed)) {
          return false;
        }

        if (
          weaponRarityFilter !== "all" &&
          meta.rarity !== weaponRarityFilter
        ) {
          return false;
        }

        if (
          weaponTypeFilter !== "all" &&
          meta.weaponType !== weaponTypeFilter
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const aMeta = getWeaponMeta(a.weaponId);
        const bMeta = getWeaponMeta(b.weaponId);

        switch (sortMode) {
          case "ownershipAsc":
            if (a.ownershipRate !== b.ownershipRate) {
              return a.ownershipRate - b.ownershipRate;
            }
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "nameAsc":
            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "rarityDesc":
            if (getRarityRank(bMeta.rarity) !== getRarityRank(aMeta.rarity)) {
              return getRarityRank(bMeta.rarity) - getRarityRank(aMeta.rarity);
            }

            if (b.ownershipRate !== a.ownershipRate) {
              return b.ownershipRate - a.ownershipRate;
            }

            return aMeta.name.localeCompare(bMeta.name, "ko-KR");

          case "ownershipDesc":
          default:
            if (b.ownershipRate !== a.ownershipRate) {
              return b.ownershipRate - a.ownershipRate;
            }

            if (b.ownedCount !== a.ownedCount) {
              return b.ownedCount - a.ownedCount;
            }

            return aMeta.name.localeCompare(bMeta.name, "ko-KR");
        }
      });
  }, [
    allWeapons,
    keyword,
    ownershipFilter,
    myOwnedWeaponIdSet,
    weaponRarityFilter,
    weaponTypeFilter,
    sortMode,
  ]);

  if (loading) {
    return (
      <div className="page">
        <main className="page-inner">
          <EmptyState
            eyebrow="LOADING"
            title="통계 데이터를 불러오는 중입니다."
            description="공유된 Endfield 데이터를 기준으로 통계를 계산하고 있습니다."
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
            title="통계 데이터를 불러오지 못했습니다."
            description="백엔드 서버가 실행 중인지 확인한 뒤 다시 시도해 주세요."
            actionLabel="홈으로 이동"
            actionHref="/"
          />
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="page-inner">
        <header className="page-header">
          <h1 className="page-title">Endfield 통계</h1>
          <p className="page-description">
            이 통계는 AIC Assistant에 데이터를 공유한 유저 기준입니다. 전체 유저
            통계가 아닙니다.
          </p>
        </header>

        <section className="card-grid">
          <StatCard title="등록 유저" value={`${summary?.totalUsers ?? 0}명`} />
          <StatCard
            title="캐릭터 데이터"
            value={`${summary?.totalCharacters ?? 0}개`}
          />
          <StatCard
            title="무기 데이터"
            value={`${summary?.totalWeapons ?? 0}개`}
          />
        </section>

        <section className="section">
          <div className="section-heading-row">
            <div>
              <h2 className="section-title">보유율 통계</h2>
              <p className="section-subtitle">
                {viewMode === "characters"
                  ? `캐릭터 ${filteredCharacters.length}개 표시 중`
                  : `무기 ${filteredWeapons.length}개 표시 중`}
              </p>
            </div>
          </div>

          <StatisticsToolbar
            viewMode={viewMode}
            setViewMode={setViewMode}
            ownershipFilter={ownershipFilter}
            setOwnershipFilter={setOwnershipFilter}
            searchKeyword={keyword}
            setSearchKeyword={setKeyword}
            sortMode={sortMode}
            setSortMode={setSortMode}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            characterRarityFilter={characterRarityFilter}
            setCharacterRarityFilter={setCharacterRarityFilter}
            elementFilter={elementFilter}
            setElementFilter={setElementFilter}
            classFilter={classFilter}
            setClassFilter={setClassFilter}
            characterWeaponTypeFilter={characterWeaponTypeFilter}
            setCharacterWeaponTypeFilter={setCharacterWeaponTypeFilter}
            weaponRarityFilter={weaponRarityFilter}
            setWeaponRarityFilter={setWeaponRarityFilter}
            weaponTypeFilter={weaponTypeFilter}
            setWeaponTypeFilter={setWeaponTypeFilter}
            characterCount={characters.length}
            weaponCount={weapons.length}
            currentRoleId={currentRoleId}
          />

          <div style={{ marginTop: 18 }}>
            {viewMode === "characters" ? (
              <CharacterStatisticsGrid
                characters={filteredCharacters}
                onSelect={(charId) =>
                  navigate(`/endfield/statistics/characters/${charId}`, {
                    state: {
                      from: "/endfield/statistics",
                      fromLabel: "통계로 돌아가기",
                    },
                  })
                }
              />
            ) : (
              <WeaponStatisticsGrid
                weapons={filteredWeapons}
                onSelect={(weaponId) =>
                  navigate(`/endfield/statistics/weapons/${weaponId}`, {
                    state: {
                      from: "/endfield/statistics",
                      fromLabel: "통계로 돌아가기",
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

function CharacterStatisticsGrid({
  characters,
  onSelect,
}: {
  characters: CharacterOwnership[];
  onSelect: (charId: string) => void;
}) {
  if (characters.length === 0) {
    return (
      <div className="empty-text">
        조건에 맞는 캐릭터 통계가 없습니다. 필터를 초기화하거나 검색어를
        바꿔보세요.
      </div>
    );
  }

  return (
    <div className="collection-grid">
      {characters.map((character, index) => {
        const meta = getCharacterMeta(character.charId);
        const rate = Math.min(character.ownershipRate, 100);

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
                #{index + 1} · {character.ownedCount}/{character.totalUsers}명
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

            <div
              className="collection-rate-ring"
              style={
                {
                  "--rate": `${rate}%`,
                } as CSSProperties
              }
            >
              {formatRate(character.ownershipRate)}%
            </div>
          </article>
        );
      })}
    </div>
  );
}

function WeaponStatisticsGrid({
  weapons,
  onSelect,
}: {
  weapons: WeaponOwnership[];
  onSelect: (weaponId: string) => void;
}) {
  if (weapons.length === 0) {
    return (
      <div className="empty-text">
        조건에 맞는 무기 통계가 없습니다. 필터를 초기화하거나 검색어를
        바꿔보세요.
      </div>
    );
  }

  return (
    <div className="collection-grid">
      {weapons.map((weapon, index) => {
        const meta = getWeaponMeta(weapon.weaponId);
        const rate = Math.min(weapon.ownershipRate, 100);

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
                #{index + 1} · {weapon.ownedCount}/{weapon.totalUsers}명
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

            <div
              className="collection-rate-ring"
              style={
                {
                  "--rate": `${rate}%`,
                } as CSSProperties
              }
            >
              {formatRate(weapon.ownershipRate)}%
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default EndfieldStatisticsPage;
