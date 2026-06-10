import type {
  CharacterElement,
  CharacterProfession,
  CharacterRarity,
  CharacterWeaponType,
} from "../../data/operators";

import type { WeaponRarity, WeaponType } from "../../data/weapons";

type StatisticsViewMode = "characters" | "weapons";
type OwnershipFilter = "all" | "ownedOnly";

type CharacterRarityFilter = "all" | CharacterRarity;
type CharacterElementFilter = "all" | CharacterElement;
type CharacterClassFilter = "all" | CharacterProfession;
type CharacterWeaponTypeFilter = "all" | CharacterWeaponType;

type WeaponRarityFilter = "all" | WeaponRarity;
type WeaponTypeFilter = "all" | WeaponType;

type SortMode = "ownershipDesc" | "ownershipAsc" | "nameAsc" | "rarityDesc";

type StatisticsToolbarProps = {
  viewMode: StatisticsViewMode;
  setViewMode: (value: StatisticsViewMode) => void;

  ownershipFilter: OwnershipFilter;
  setOwnershipFilter: (value: OwnershipFilter) => void;

  searchKeyword: string;
  setSearchKeyword: (value: string) => void;

  sortMode: SortMode;
  setSortMode: (value: SortMode) => void;

  filterOpen: boolean;
  setFilterOpen: (value: boolean | ((prev: boolean) => boolean)) => void;

  characterRarityFilter: CharacterRarityFilter;
  setCharacterRarityFilter: (value: CharacterRarityFilter) => void;

  elementFilter: CharacterElementFilter;
  setElementFilter: (value: CharacterElementFilter) => void;

  classFilter: CharacterClassFilter;
  setClassFilter: (value: CharacterClassFilter) => void;

  characterWeaponTypeFilter: CharacterWeaponTypeFilter;
  setCharacterWeaponTypeFilter: (value: CharacterWeaponTypeFilter) => void;

  weaponRarityFilter: WeaponRarityFilter;
  setWeaponRarityFilter: (value: WeaponRarityFilter) => void;

  weaponTypeFilter: WeaponTypeFilter;
  setWeaponTypeFilter: (value: WeaponTypeFilter) => void;

  characterCount: number;
  weaponCount: number;

  currentRoleId?: string | null;
};

function StatisticsToolbar({
  viewMode,
  setViewMode,
  ownershipFilter,
  setOwnershipFilter,
  searchKeyword,
  setSearchKeyword,
  sortMode,
  setSortMode,
  filterOpen,
  setFilterOpen,
  characterRarityFilter,
  setCharacterRarityFilter,
  elementFilter,
  setElementFilter,
  classFilter,
  setClassFilter,
  characterWeaponTypeFilter,
  setCharacterWeaponTypeFilter,
  weaponRarityFilter,
  setWeaponRarityFilter,
  weaponTypeFilter,
  setWeaponTypeFilter,
  characterCount,
  weaponCount,
  currentRoleId,
}: StatisticsToolbarProps) {
  return (
    <div className="toolbar statistics-toolbar">
      <div className="toolbar-row toolbar-row-primary">
        <div className="entity-tabs">
          <button
            className={`entity-tab ${
              viewMode === "characters" ? "active" : ""
            }`}
            onClick={() => setViewMode("characters")}
          >
            캐릭터 {characterCount}
          </button>

          <button
            className={`entity-tab ${viewMode === "weapons" ? "active" : ""}`}
            onClick={() => setViewMode("weapons")}
          >
            무기 {weaponCount}
          </button>
        </div>
      </div>

      <div className="toolbar-row toolbar-row-filters">
        <div className="entity-tabs">
          <button
            className={`entity-tab ${ownershipFilter === "all" ? "active" : ""}`}
            onClick={() => setOwnershipFilter("all")}
          >
            전체
          </button>

          <button
            className={`entity-tab ${
              ownershipFilter === "ownedOnly" ? "active" : ""
            }`}
            onClick={() => setOwnershipFilter("ownedOnly")}
            disabled={!currentRoleId}
            title={
              currentRoleId
                ? `저장된 roleId ${currentRoleId} 기준으로 필터링합니다.`
                : "확장 프로그램에서 통계 보기 또는 내 데이터 보기를 한 번 실행하면 사용할 수 있습니다."
            }
          >
            {viewMode === "characters" ? "내 보유 캐릭터만" : "내 보유 무기만"}
          </button>
        </div>

        <input
          className="search-input statistics-search-input"
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder={
            viewMode === "characters" ? "캐릭터 이름 검색" : "무기 이름 검색"
          }
        />

        <select
          className="sort-select statistics-sort-select"
          value={sortMode}
          onChange={(event) => setSortMode(event.target.value as SortMode)}
        >
          <option value="ownershipDesc">보유율 높은 순</option>
          <option value="ownershipAsc">보유율 낮은 순</option>
          <option value="nameAsc">이름순</option>
          <option value="rarityDesc">성급 높은 순</option>
        </select>

        <div className="filter-dropdown-wrap">
          <button
            className={`filter-toggle-button ${filterOpen ? "active" : ""}`}
            type="button"
            onClick={() => setFilterOpen((prev) => !prev)}
          >
            필터
          </button>

          {filterOpen && (
            <div className="filter-dropdown">
              {viewMode === "characters" ? (
                <>
                  <label className="filter-label">성급</label>
                  <select
                    className="sort-select"
                    value={characterRarityFilter}
                    onChange={(event) =>
                      setCharacterRarityFilter(
                        event.target.value as CharacterRarityFilter,
                      )
                    }
                  >
                    <option value="all">전체</option>
                    <option value="6">6성</option>
                    <option value="5">5성</option>
                    <option value="4">4성</option>
                  </select>

                  <label className="filter-label">속성</label>
                  <select
                    className="sort-select"
                    value={elementFilter}
                    onChange={(event) =>
                      setElementFilter(
                        event.target.value as CharacterElementFilter,
                      )
                    }
                  >
                    <option value="all">전체</option>
                    <option value="physical">물리</option>
                    <option value="cryst">결정</option>
                    <option value="fire">화염</option>
                    <option value="natural">자연</option>
                    <option value="pulse">펄스</option>
                  </select>

                  <label className="filter-label">직업</label>
                  <select
                    className="sort-select"
                    value={classFilter}
                    onChange={(event) =>
                      setClassFilter(event.target.value as CharacterClassFilter)
                    }
                  >
                    <option value="all">전체</option>
                    <option value="vanguard">선봉</option>
                    <option value="guard">가드</option>
                    <option value="defender">디펜더</option>
                    <option value="supporter">서포터</option>
                    <option value="caster">캐스터</option>
                    <option value="assault">강습</option>
                  </select>

                  <label className="filter-label">무기 타입</label>
                  <select
                    className="sort-select"
                    value={characterWeaponTypeFilter}
                    onChange={(event) =>
                      setCharacterWeaponTypeFilter(
                        event.target.value as CharacterWeaponTypeFilter,
                      )
                    }
                  >
                    <option value="all">전체</option>
                    <option value="sword">한손검</option>
                    <option value="claymores">대검</option>
                    <option value="lance">창</option>
                    <option value="pistol">권총</option>
                    <option value="wand">지팡이</option>
                  </select>
                </>
              ) : (
                <>
                  <label className="filter-label">성급</label>
                  <select
                    className="sort-select"
                    value={weaponRarityFilter}
                    onChange={(event) =>
                      setWeaponRarityFilter(
                        event.target.value as WeaponRarityFilter,
                      )
                    }
                  >
                    <option value="all">전체</option>
                    <option value="6">6성</option>
                    <option value="5">5성</option>
                    <option value="4">4성</option>
                  </select>

                  <label className="filter-label">무기 타입</label>
                  <select
                    className="sort-select"
                    value={weaponTypeFilter}
                    onChange={(event) =>
                      setWeaponTypeFilter(
                        event.target.value as WeaponTypeFilter,
                      )
                    }
                  >
                    <option value="all">전체</option>
                    <option value="sword">한손검</option>
                    <option value="claymores">대검</option>
                    <option value="lance">창</option>
                    <option value="pistol">권총</option>
                    <option value="wand">지팡이</option>
                  </select>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatisticsToolbar;
