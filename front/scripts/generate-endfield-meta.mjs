import fs from "fs";

const CHAR_RAW_PATH = "src/data/raw/search-chars.json";
const WEAPON_RAW_PATH = "src/data/raw/search-weapons.json";

const OPERATORS_OUTPUT_PATH = "src/data/operators.generated.ts";
const WEAPONS_OUTPUT_PATH = "src/data/weapons.generated.ts";

const charsRaw = JSON.parse(fs.readFileSync(CHAR_RAW_PATH, "utf-8"));
const weaponsRaw = JSON.parse(fs.readFileSync(WEAPON_RAW_PATH, "utf-8"));

const chars = charsRaw.data?.chars ?? [];
const elementKeys = [...new Set(chars.map((char) => char.property?.key))];
console.log("element keys:", elementKeys);
const weapons = weaponsRaw.data?.weapons ?? [];

const q = (value) => JSON.stringify(value ?? "");

const mapElement = (key) => {
  switch (key) {
    case "char_property_physical":
      return "physical";
    case "char_property_cryst":
      return "cryst";
    case "char_property_fire":
      return "fire";
    case "char_property_natural":
      return "natural";
    case "char_property_pulse":
      return "pulse";
    default:
      return "unknown";
  }
};

const mapProfession = (key) => {
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
      return "assault";
    default:
      return "unknown";
  }
};

const mapCharacterWeaponType = (key) => {
  switch (key) {
    case "weapon_type_sword":
      return "sword";
    case "weapon_type_claymores":
      return "claymores";
    case "weapon_type_lance":
      return "lance";
    case "weapon_type_pistol":
      return "pistol";
    case "weapon_type_wand":
      return "wand";
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
    profession: ${q(mapProfession(char.profession?.key))},
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
  | "cryst"
  | "fire"
  | "natural"
  | "pulse"
  | "unknown";

export type CharacterWeaponType =
  | "sword"
  | "claymores"
  | "lance"
  | "pistol"
  | "wand"
  | "unknown";

export type CharacterProfession =
  | "vanguard"
  | "guard"
  | "defender"
  | "supporter"
  | "caster"
  | "assault"
  | "unknown";

export type CharacterMeta = {
  charId: string;
  name: string;
  rarity: CharacterRarity;
  element: CharacterElement;
  weaponType: CharacterWeaponType;
  profession: CharacterProfession;
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
      profession: "unknown",
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
  cryst: "냉기",
  fire: "열기",
  natural: "자연",
  pulse: "전기",
  unknown: "미분류",
};

export const CHARACTER_WEAPON_TYPE_LABEL: Record<CharacterWeaponType, string> = {
  sword: "한손검",
  claymores: "양손검",
  lance: "장병기",
  pistol: "권총",
  wand: "아츠 유닛",
  unknown: "미분류",
};

export const CHARACTER_PROFESSION_LABEL: Record<CharacterProfession, string> = {
  vanguard: "뱅가드",
  guard: "가드",
  defender: "디펜더",
  supporter: "서포터",
  caster: "캐스터",
  assault: "스트라이커",
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
  | "claymores"
  | "lance"
  | "pistol"
  | "wand"
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
  claymores: "양손검",
  lance: "장병기",
  pistol: "권총",
  wand: "아츠 유닛",
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
