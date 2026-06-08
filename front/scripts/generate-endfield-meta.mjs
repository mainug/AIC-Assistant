import fs from "fs";

const CHAR_RAW_PATH = "src/data/raw/search-chars.json";
const WEAPON_RAW_PATH = "src/data/raw/search-weapons.json";

const OPERATORS_OUTPUT_PATH = "src/data/operators.generated.ts";
const WEAPONS_OUTPUT_PATH = "src/data/weapons.generated.ts";

const charsRaw = JSON.parse(fs.readFileSync(CHAR_RAW_PATH, "utf-8"));
const weaponsRaw = JSON.parse(fs.readFileSync(WEAPON_RAW_PATH, "utf-8"));

const chars = charsRaw.data?.chars ?? [];
const weapons = weaponsRaw.data?.weapons ?? [];

const q = (value) => JSON.stringify(value ?? "");

const mapElement = (key) => {
  switch (key) {
    case "char_property_physical":
      return "physical";
    case "char_property_cryst":
      return "cryo";
    case "char_property_fire":
      return "heat";
    case "char_property_natural":
      return "nature";
    case "char_property_electric":
      return "electric";
    default:
      return "unknown";
  }
};

const mapClassType = (key) => {
  switch (key) {
    case "profession_vanguard":
      return "vanguard";
    case "profession_guard":
      return "guard";
    case "profession_defender":
      return "defender";
    case "profession_supporter":
      return "supporter";
    case "profession_caster":
      return "caster";
    case "profession_assault":
      return "striker";
    default:
      return "unknown";
  }
};

const mapCharacterWeaponType = (key) => {
  switch (key) {
    case "weapon_type_sword":
      return "sword";
    case "weapon_type_claymores":
      return "great_sword";
    case "weapon_type_lance":
      return "polearm";
    case "weapon_type_pistol":
      return "handcannon";
    case "weapon_type_wand":
      return "arts_unit";
    default:
      return "unknown";
  }
};

const mapRarity = (value) => {
  const rarity = Number(value);

  if (rarity === 4 || rarity === 5 || rarity === 6) {
    return rarity;
  }

  return "unknown";
};

const generateOperatorsTs = () => {
  const entries = chars.map((char) => {
    const charId = char.id;

    return `  ${q(charId)}: {
    charId: ${q(charId)},
    name: ${q(char.name)},
    rarity: ${q(mapRarity(char.rarity?.value))},
    element: ${q(mapElement(char.property?.key))},
    weaponType: ${q(mapCharacterWeaponType(char.weaponType?.key))},
    classType: ${q(mapClassType(char.profession?.key))},
    profileImage: ${q(char.avatarSqUrl)},
    standingImage: ${q(char.illustrationUrl)},
    avatarSqUrl: ${q(char.avatarSqUrl)},
    avatarRtUrl: ${q(char.avatarRtUrl)},
    illustrationUrl: ${q(char.illustrationUrl)},
    tags: ${JSON.stringify(char.tags ?? [])},
  }`;
  });

  return `export type CharacterRarity = 4 | 5 | 6 | "unknown";

export type CharacterElement =
  | "physical"
  | "cryo"
  | "heat"
  | "nature"
  | "electric"
  | "unknown";

export type CharacterWeaponType =
  | "sword"
  | "great_sword"
  | "polearm"
  | "handcannon"
  | "arts_unit"
  | "unknown";

export type CharacterClass =
  | "vanguard"
  | "guard"
  | "defender"
  | "supporter"
  | "caster"
  | "striker"
  | "unknown";

export type CharacterMeta = {
  charId: string;
  name: string;
  rarity: CharacterRarity;
  element: CharacterElement;
  weaponType: CharacterWeaponType;
  classType: CharacterClass;
  profileImage: string;
  standingImage: string;
  avatarSqUrl: string;
  avatarRtUrl: string;
  illustrationUrl: string;
  tags: string[];
};

export const CHARACTER_META_MAP: Record<string, CharacterMeta> = {
${entries.join(",\n")}
};

export const CHARACTER_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(CHARACTER_META_MAP).map(([charId, meta]) => [
    charId,
    meta.name,
  ]),
);

export const getCharacterMeta = (charId: string): CharacterMeta => {
  return (
    CHARACTER_META_MAP[charId] ?? {
      charId,
      name: charId,
      rarity: "unknown",
      element: "unknown",
      weaponType: "unknown",
      classType: "unknown",
      profileImage: CHARACTER_PLACEHOLDER_IMAGE,
      standingImage: CHARACTER_PLACEHOLDER_IMAGE,
      avatarSqUrl: "",
      avatarRtUrl: "",
      illustrationUrl: "",
      tags: [],
    }
  );
};

export const getCharacterProfileImage = (charId: string) => {
  return CHARACTER_META_MAP[charId]?.profileImage || CHARACTER_PLACEHOLDER_IMAGE;
};

export const getCharacterStandingImage = (charId: string) => {
  return CHARACTER_META_MAP[charId]?.standingImage || CHARACTER_PLACEHOLDER_IMAGE;
};

export const CHARACTER_PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export const CHARACTER_ELEMENT_LABEL: Record<CharacterElement, string> = {
  physical: "물리",
  cryo: "냉기",
  heat: "열기",
  nature: "자연",
  electric: "전기",
  unknown: "미분류",
};

export const CHARACTER_WEAPON_TYPE_LABEL: Record<CharacterWeaponType, string> = {
  sword: "한손검",
  great_sword: "양손검",
  polearm: "장병기",
  handcannon: "권총",
  arts_unit: "아츠 유닛",
  unknown: "미분류",
};

export const CHARACTER_CLASS_LABEL: Record<CharacterClass, string> = {
  vanguard: "뱅가드",
  guard: "가드",
  defender: "디펜더",
  supporter: "서포터",
  caster: "캐스터",
  striker: "스트라이커",
  unknown: "미분류",
};

export const CHARACTER_RARITY_LABEL: Record<CharacterRarity, string> = {
  4: "4성",
  5: "5성",
  6: "6성",
  unknown: "미분류",
};
`;
};

const generateWeaponsTs = () => {
  const entries = weapons.map((weapon) => {
    const weaponId = weapon.id;

    return `  ${q(weaponId)}: {
    weaponId: ${q(weaponId)},
    name: ${q(weapon.name)},
    rarity: ${q(mapRarity(weapon.rarity?.value))},
    weaponType: ${q(mapCharacterWeaponType(weapon.type?.key))},
    iconUrl: ${q(weapon.iconUrl)},
    description: ${q(weapon.description)},
    functionText: ${q(weapon.function)},
    skills: ${JSON.stringify(weapon.skills ?? [])},
  }`;
  });

  return `export type WeaponRarity = 4 | 5 | 6 | "unknown";

export type WeaponType =
  | "sword"
  | "great_sword"
  | "polearm"
  | "handcannon"
  | "arts_unit"
  | "unknown";

export type WeaponSkill = {
  key: string;
  value: string;
};

export type WeaponMeta = {
  weaponId: string;
  name: string;
  rarity: WeaponRarity;
  weaponType: WeaponType;
  iconUrl: string;
  description: string;
  functionText: string;
  skills: WeaponSkill[];
};

export const WEAPON_META_MAP: Record<string, WeaponMeta> = {
${entries.join(",\n")}
};

export const WEAPON_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(WEAPON_META_MAP).map(([weaponId, meta]) => [
    weaponId,
    meta.name,
  ]),
);

export const getWeaponMeta = (weaponId: string): WeaponMeta => {
  return (
    WEAPON_META_MAP[weaponId] ?? {
      weaponId,
      name: weaponId,
      rarity: "unknown",
      weaponType: "unknown",
      iconUrl: WEAPON_PLACEHOLDER_IMAGE,
      description: "",
      functionText: "",
      skills: [],
    }
  );
};

export const getWeaponImage = (weaponId: string) => {
  return WEAPON_META_MAP[weaponId]?.iconUrl || WEAPON_PLACEHOLDER_IMAGE;
};

export const WEAPON_PLACEHOLDER_IMAGE = "/images/placeholder.svg";

export const WEAPON_RARITY_LABEL: Record<WeaponRarity, string> = {
  4: "4성",
  5: "5성",
  6: "6성",
  unknown: "미분류",
};

export const WEAPON_TYPE_LABEL: Record<WeaponType, string> = {
  sword: "한손검",
  great_sword: "양손검",
  polearm: "장병기",
  handcannon: "권총",
  arts_unit: "아츠 유닛",
  unknown: "미분류",
};
`;
};

fs.writeFileSync(OPERATORS_OUTPUT_PATH, generateOperatorsTs());
fs.writeFileSync(WEAPONS_OUTPUT_PATH, generateWeaponsTs());

console.log(`Generated ${OPERATORS_OUTPUT_PATH}`);
console.log(`Generated ${WEAPONS_OUTPUT_PATH}`);
console.log(`Characters: ${chars.length}`);
console.log(`Weapons: ${weapons.length}`);
