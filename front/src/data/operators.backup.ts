export const CHARACTER_MAP: Record<string, string> = {
  c2fa8a588cab489795166bed5161fefc: "장방이",
  ee3bf7197a05580397b45ba2fb1de28e: "탕탕",
  "395d6ad94f5b166d78c1831263262386": "로시",
  "05047b063867199b953b30ac8df9a853": "이본",
  "0295282ff895bd1b7242d137da99dc94": "질베르타",
  "0b199a0eaae5a9b37a5d3c990b6c8bca": "레바테인",
  "12ccf3692d76c7bddd3ef84eddd3f3c1": "라스트 라이트",
  bfb4ba13f819568c69c2ae46d8f5b869: "아델리아",
  ce97268e7469e004a3e7a81e4b09a025: "엠버",
  d00440e32deaec195361d4fe6b011cda: "여풍",
  "9c4a116d4dba884c3db9b7f46ea7ea20": "포그라니치니크",
  "06ba43ff26befc881fd106eaa5ef1b81": "스노우샤인",
  e7b91cae9108d01f550922498747a45e: "아비웨나",
  "00ff4c582aeeafc237695f81e36969b4": "아크라이트",
  "7e6df1575604cc5872590f22af757e40": "알레쉬",
  "26e3cc73ac23deb8f6a875038d2243ff": "울프가드",
  "3839d35948216cc09368cd62167c7368": "자이히",
  ad1607a2d5a203b1e95762ff0d911bcd: "진천우",
  "55ab3b3d98fa76a045347d29da1abbca": "판",
  c4cf7541c23c93f991e2e464ee18bb18: "펠리카",
  a0591d65311b190e7d5e09faa0ed1cdd: "아케쿠리",
  "1b441436fd73326614cfcd14c640e068": "안탈",
  "50515754ef6085bb6a8ddc21ab18a825": "에스텔라",
  e6c2a3e9f0b1917eb0b1fe29a4b94b3d: "카치르",
  bcb564ed05eb0912d4b0f86d1e193c9f: "플루라이트",
  bf32d11ce71874e62c2bc58d053e4bec: "관리자 (남)",
  db6d086bf664455a86eedf67d9439953: "관리자 (여)",
};

export type CharacterRarity = 4 | 5 | 6 | "unknown";

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

export const getCharacterProfileImage = (charId: string) => {
  return `/images/characters/profile/${charId}.png`;
};

export const getCharacterStandingImage = (charId: string) => {
  return `/images/characters/standing/${charId}.png`;
};

export const CHARACTER_PLACEHOLDER_IMAGE = "/images/placeholder.svg";

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

type CharacterExtra = {
  rarity: CharacterRarity;
  element: CharacterElement;
  weaponType: CharacterWeaponType;
  classType: CharacterClass;
};

export const CHARACTER_EXTRA_MAP: Partial<Record<string, CharacterExtra>> = {
  "12ccf3692d76c7bddd3ef84eddd3f3c1": {
    rarity: 6,
    element: "cryo",
    weaponType: "great_sword",
    classType: "striker",
  },

  fb4ba13f819568c69c2ae46d8f5b869: {
    rarity: 6,
    element: "nature",
    weaponType: "arts_unit",
    classType: "supporter",
  },

  ce97268e7469e004a3e7a81e4b09a025: {
    rarity: 6,
    element: "heat",
    weaponType: "great_sword",
    classType: "defender",
  },

  d00440e32deaec195361d4fe6b011cda: {
    rarity: 6,
    element: "physical",
    weaponType: "polearm",
    classType: "guard",
  },

  "9c4a116d4dba884c3db9b7f46ea7ea20": {
    rarity: 6,
    element: "physical",
    weaponType: "sword",
    classType: "vanguard",
  },

  "06ba43ff26befc881fd106eaa5ef1b81": {
    rarity: 5,
    element: "cryo",
    weaponType: "great_sword",
    classType: "defender",
  },

  e7b91cae9108d01f550922498747a45e: {
    rarity: 5,
    element: "electric",
    weaponType: "polearm",
    classType: "striker",
  },

  "00ff4c582aeeafc237695f81e36969b4": {
    rarity: 5,
    element: "electric",
    weaponType: "sword",
    classType: "vanguard",
  },

  "7e6df1575604cc5872590f22af757e40": {
    rarity: 5,
    element: "cryo",
    weaponType: "sword",
    classType: "vanguard",
  },

  "26e3cc73ac23deb8f6a875038d2243ff": {
    rarity: 5,
    element: "heat",
    weaponType: "handcannon",
    classType: "caster",
  },

  "3839d35948216cc09368cd62167c7368": {
    rarity: 5,
    element: "cryo",
    weaponType: "arts_unit",
    classType: "supporter",
  },

  ad1607a2d5a203b1e95762ff0d911bcd: {
    rarity: 5,
    element: "physical",
    weaponType: "sword",
    classType: "guard",
  },

  "55ab3b3d98fa76a045347d29da1abbca": {
    rarity: 5,
    element: "physical",
    weaponType: "great_sword",
    classType: "striker",
  },

  c4cf7541c23c93f991e2e464ee18bb18: {
    rarity: 5,
    element: "electric",
    weaponType: "arts_unit",
    classType: "caster",
  },

  a0591d65311b190e7d5e09faa0ed1cdd: {
    rarity: 4,
    element: "heat",
    weaponType: "sword",
    classType: "vanguard",
  },

  "1b441436fd73326614cfcd14c640e068": {
    rarity: 4,
    element: "electric",
    weaponType: "arts_unit",
    classType: "supporter",
  },

  "50515754ef6085bb6a8ddc21ab18a825": {
    rarity: 4,
    element: "cryo",
    weaponType: "polearm",
    classType: "guard",
  },

  e6c2a3e9f0b1917eb0b1fe29a4b94b3d: {
    rarity: 4,
    element: "physical",
    weaponType: "great_sword",
    classType: "defender",
  },

  "05047b063867199b953b30ac8df9a853": {
    rarity: 4,
    element: "electric",
    weaponType: "handcannon",
    classType: "striker",
  },

  bf32d11ce71874e62c2bc58d053e4bec: {
    rarity: 6,
    element: "physical",
    weaponType: "sword",
    classType: "guard",
  },

  db6d086bf664455a86eedf67d9439953: {
    rarity: 6,
    element: "physical",
    weaponType: "sword",
    classType: "guard",
  },
};

export const CHARACTER_META_MAP: Record<string, CharacterMeta> =
  Object.fromEntries(
    Object.entries(CHARACTER_MAP).map(([charId, name]) => {
      const extra = CHARACTER_EXTRA_MAP[charId];

      return [
        charId,
        {
          charId,
          name,
          rarity: extra?.rarity ?? "unknown",
          element: extra?.element ?? "unknown",
          weaponType: extra?.weaponType ?? "unknown",
          classType: extra?.classType ?? "unknown",
          profileImage: getCharacterProfileImage(charId),
          standingImage: getCharacterStandingImage(charId),
        },
      ];
    }),
  );

export const getCharacterMeta = (charId: string): CharacterMeta => {
  return (
    CHARACTER_META_MAP[charId] ?? {
      charId,
      name: CHARACTER_MAP[charId] ?? charId,
      rarity: "unknown",
      element: "unknown",
      weaponType: "unknown",
      classType: "unknown",
      profileImage: getCharacterProfileImage(charId),
      standingImage: getCharacterStandingImage(charId),
    }
  );
};

export const CHARACTER_ELEMENT_LABEL: Record<CharacterElement, string> = {
  physical: "물리",
  cryo: "냉기",
  heat: "열기",
  nature: "자연",
  electric: "전기",
  unknown: "미분류",
};

export const CHARACTER_WEAPON_TYPE_LABEL: Record<CharacterWeaponType, string> =
  {
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
