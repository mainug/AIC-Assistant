import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../api/config";
import {
  CHARACTER_CLASS_LABEL,
  CHARACTER_ELEMENT_LABEL,
  CHARACTER_META_MAP,
  CHARACTER_PLACEHOLDER_IMAGE,
  CHARACTER_RARITY_LABEL,
  CHARACTER_WEAPON_TYPE_LABEL,
  getCharacterMeta,
  type CharacterClass,
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
import "../styles/endfield.css";

type Summary = {
  totalUsers: number;
  totalCharacters: number;
  totalWeapons: number;
};

type CharacterOwnership = {
  charId: string;
  ownedCount: number;
  totalUsers: number;
  ownershipRate: number;
};

type WeaponOwnership = {
  weaponId: string;
  ownedCount: number;
  totalUsers: number;
  ownershipRate: number;
};

type StatisticsViewMode = "characters" | "weapons";
type OwnershipFilter = "ownedOnly" | "all";

type CharacterRarityFilter = "all" | CharacterRarity;
type CharacterElementFilter = "all" | CharacterElement;
type CharacterClassFilter = "all" | CharacterClass;
type CharacterWeaponTypeFilter = "all" | CharacterWeaponType;

type WeaponRarityFilter = "all" | WeaponRarity;
type WeaponTypeFilter = "all" | WeaponType;

type SortMode = "ownershipDesc" | "ownershipAsc" | "nameAsc" | "rarityDesc";

type EmptyStateProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

function EndfieldStatisticsPage() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState<Summary | null>(null);
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        setError("");

        const [summaryRes, charactersRes, weaponsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/endfield/statistics/summary`),
          fetch(`${API_BASE_URL}/api/endfield/statistics/characters/ownership`),
          fetch(`${API_BASE_URL}/api/endfield/statistics/weapons/ownership`),
        ]);

        if (!summaryRes.ok) throw new Error("요약 통계 조회 실패");
        if (!charactersRes.ok) throw new Error("캐릭터 보유율 조회 실패");
        if (!weaponsRes.ok) throw new Error("무기 보유율 조회 실패");

        setSummary(await summaryRes.json());
        setCharacters(await charactersRes.json());
        setWeapons(await weaponsRes.json());
      } catch (err) {
        console.error(err);
        setError("통계 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

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

  const filteredCharacters = useMemo(() => {
    const trimmed = keyword.trim().toLowerCase();

    const source =
      ownershipFilter === "ownedOnly"
        ? allCharacters.filter((character) => character.ownedCount > 0)
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

        if (classFilter !== "all" && meta.classType !== classFilter) {
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
        ? allWeapons.filter((weapon) => weapon.ownedCount > 0)
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
    weaponRarityFilter,
    weaponTypeFilter,
    sortMode,
  ]);

  const resetFilters = () => {
    setKeyword("");
    setOwnershipFilter("all");
    setSortMode("ownershipDesc");

    setCharacterRarityFilter("all");
    setElementFilter("all");
    setClassFilter("all");
    setCharacterWeaponTypeFilter("all");

    setWeaponRarityFilter("all");
    setWeaponTypeFilter("all");
  };

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

          <div className="toolbar">
            <div className="toolbar-left">
              <div className="entity-tabs">
                <button
                  className={`entity-tab ${
                    viewMode === "characters" ? "active" : ""
                  }`}
                  onClick={() => {
                    resetFilters();
                    setViewMode("characters");
                    setFilterOpen(false);
                  }}
                >
                  캐릭터 {allCharacters.length}
                </button>

                <button
                  className={`entity-tab ${
                    viewMode === "weapons" ? "active" : ""
                  }`}
                  onClick={() => {
                    resetFilters();
                    setViewMode("weapons");
                    setFilterOpen(false);
                  }}
                >
                  무기 {allWeapons.length}
                </button>
              </div>
            </div>

            <div className="toolbar-right">
              <div className="entity-tabs">
                <button
                  className={`entity-tab ${
                    ownershipFilter === "all" ? "active" : ""
                  }`}
                  onClick={() => setOwnershipFilter("all")}
                >
                  전체
                </button>

                <button
                  className={`entity-tab ${
                    ownershipFilter === "ownedOnly" ? "active" : ""
                  }`}
                  onClick={() => setOwnershipFilter("ownedOnly")}
                >
                  {viewMode === "characters" ? "보유 캐릭터만" : "보유 무기만"}
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

              <select
                className="sort-select"
                value={sortMode}
                onChange={(event) =>
                  setSortMode(event.target.value as SortMode)
                }
              >
                <option value="ownershipDesc">보유율 높은 순</option>
                <option value="ownershipAsc">보유율 낮은 순</option>
                <option value="nameAsc">이름순</option>
                <option value="rarityDesc">성급 높은 순</option>
              </select>

              <div className="filter-dropdown-wrap">
                <button
                  className={`filter-toggle-button ${filterOpen ? "active" : ""}`}
                  onClick={() => setFilterOpen((prev) => !prev)}
                >
                  필터
                </button>

                {filterOpen && (
                  <div className="filter-dropdown">
                    <div className="filter-dropdown-header">
                      <h3>필터</h3>

                      <button
                        className="filter-reset-button"
                        onClick={() => {
                          resetFilters();
                          if (viewMode === "weapons") {
                            setOwnershipFilter("all");
                          }
                          setFilterOpen(true);
                        }}
                        title="필터 초기화"
                      >
                        ↻
                      </button>
                    </div>

                    {viewMode === "characters" ? (
                      <CharacterFilters
                        rarityFilter={characterRarityFilter}
                        elementFilter={elementFilter}
                        classFilter={classFilter}
                        weaponTypeFilter={characterWeaponTypeFilter}
                        onRarityChange={setCharacterRarityFilter}
                        onElementChange={setElementFilter}
                        onClassChange={setClassFilter}
                        onWeaponTypeChange={setCharacterWeaponTypeFilter}
                      />
                    ) : (
                      <WeaponFilters
                        rarityFilter={weaponRarityFilter}
                        weaponTypeFilter={weaponTypeFilter}
                        onRarityChange={setWeaponRarityFilter}
                        onWeaponTypeChange={setWeaponTypeFilter}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

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

function CharacterFilters({
  rarityFilter,
  elementFilter,
  classFilter,
  weaponTypeFilter,
  onRarityChange,
  onElementChange,
  onClassChange,
  onWeaponTypeChange,
}: {
  rarityFilter: CharacterRarityFilter;
  elementFilter: CharacterElementFilter;
  classFilter: CharacterClassFilter;
  weaponTypeFilter: CharacterWeaponTypeFilter;
  onRarityChange: (value: CharacterRarityFilter) => void;
  onElementChange: (value: CharacterElementFilter) => void;
  onClassChange: (value: CharacterClassFilter) => void;
  onWeaponTypeChange: (value: CharacterWeaponTypeFilter) => void;
}) {
  return (
    <div className="filter-panel">
      <FilterGroup title="성급">
        <FilterButton
          active={rarityFilter === "all"}
          onClick={() => onRarityChange("all")}
        >
          전체
        </FilterButton>
        {[6, 5, 4, "unknown"].map((rarity) => (
          <FilterButton
            key={String(rarity)}
            active={rarityFilter === rarity}
            onClick={() => onRarityChange(rarity as CharacterRarityFilter)}
          >
            {CHARACTER_RARITY_LABEL[rarity as CharacterRarity]}
          </FilterButton>
        ))}
      </FilterGroup>

      <FilterGroup title="속성">
        <FilterButton
          active={elementFilter === "all"}
          onClick={() => onElementChange("all")}
        >
          전체
        </FilterButton>
        {Object.entries(CHARACTER_ELEMENT_LABEL).map(([key, label]) => (
          <FilterButton
            key={key}
            active={elementFilter === key}
            onClick={() => onElementChange(key as CharacterElementFilter)}
          >
            {label}
          </FilterButton>
        ))}
      </FilterGroup>

      <FilterGroup title="직업군">
        <FilterButton
          active={classFilter === "all"}
          onClick={() => onClassChange("all")}
        >
          전체
        </FilterButton>
        {Object.entries(CHARACTER_CLASS_LABEL).map(([key, label]) => (
          <FilterButton
            key={key}
            active={classFilter === key}
            onClick={() => onClassChange(key as CharacterClassFilter)}
          >
            {label}
          </FilterButton>
        ))}
      </FilterGroup>

      <FilterGroup title="사용 무기">
        <FilterButton
          active={weaponTypeFilter === "all"}
          onClick={() => onWeaponTypeChange("all")}
        >
          전체
        </FilterButton>
        {Object.entries(CHARACTER_WEAPON_TYPE_LABEL).map(([key, label]) => (
          <FilterButton
            key={key}
            active={weaponTypeFilter === key}
            onClick={() => onWeaponTypeChange(key as CharacterWeaponTypeFilter)}
          >
            {label}
          </FilterButton>
        ))}
      </FilterGroup>
    </div>
  );
}

function WeaponFilters({
  rarityFilter,
  weaponTypeFilter,
  onRarityChange,
  onWeaponTypeChange,
}: {
  rarityFilter: WeaponRarityFilter;
  weaponTypeFilter: WeaponTypeFilter;
  onRarityChange: (value: WeaponRarityFilter) => void;
  onWeaponTypeChange: (value: WeaponTypeFilter) => void;
}) {
  return (
    <div className="filter-panel">
      <FilterGroup title="성급">
        <FilterButton
          active={rarityFilter === "all"}
          onClick={() => onRarityChange("all")}
        >
          전체
        </FilterButton>
        {[6, 5, 4, "unknown"].map((rarity) => (
          <FilterButton
            key={String(rarity)}
            active={rarityFilter === rarity}
            onClick={() => onRarityChange(rarity as WeaponRarityFilter)}
          >
            {WEAPON_RARITY_LABEL[rarity as WeaponRarity]}
          </FilterButton>
        ))}
      </FilterGroup>

      <FilterGroup title="무기 타입">
        <FilterButton
          active={weaponTypeFilter === "all"}
          onClick={() => onWeaponTypeChange("all")}
        >
          전체
        </FilterButton>
        {Object.entries(WEAPON_TYPE_LABEL).map(([key, label]) => (
          <FilterButton
            key={key}
            active={weaponTypeFilter === key}
            onClick={() => onWeaponTypeChange(key as WeaponTypeFilter)}
          >
            {label}
          </FilterButton>
        ))}
      </FilterGroup>
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

        return (
          <article
            className="collection-card"
            key={character.charId}
            onClick={() => onSelect(character.charId)}
          >
            <div className="collection-image-area">
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
                {CHARACTER_CLASS_LABEL[meta.classType]}
              </div>
            </div>

            <RateRing rate={character.ownershipRate} />
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

            <RateRing rate={weapon.ownershipRate} />
          </article>
        );
      })}
    </div>
  );
}

function RateRing({ rate }: { rate: number }) {
  const safeRate = Math.max(0, Math.min(rate, 100));

  return (
    <div
      className="collection-rate-ring"
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

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="filter-group">
      <div className="filter-title">{title}</div>
      <div className="entity-tabs">{children}</div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`entity-tab ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
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

function getRarityRank(rarity: number | string) {
  if (rarity === 6) return 6;
  if (rarity === 5) return 5;
  if (rarity === 4) return 4;
  return 0;
}

function EmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <section className="empty-state">
      {eyebrow && <div className="empty-state-eyebrow">{eyebrow}</div>}
      <h2 className="empty-state-title">{title}</h2>
      <p className="empty-state-description">{description}</p>

      {actionLabel && actionHref && (
        <Link className="empty-state-action" to={actionHref}>
          {actionLabel}
        </Link>
      )}
    </section>
  );
}

export default EndfieldStatisticsPage;
