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
  "e2b6290e50c9228f30a180ce1d73cc7c": {
    charId: "e2b6290e50c9228f30a180ce1d73cc7c",
    name: "미브",
    rarity: 6,
    element: "physical",
    weaponType: "great_sword",
    classType: "guard",
    profileImage: "https://static.skport.com/image/common/20260604/7567b291d218b12c661e48ea571e92d3.png",
    standingImage: "https://static.skport.com/image/common/20260604/40bdf0da178469d8adac54e743c3a9b5.png",
    avatarSqUrl: "https://static.skport.com/image/common/20260604/7567b291d218b12c661e48ea571e92d3.png",
    avatarRtUrl: "https://static.skport.com/image/common/20260604/36fcb08f4bd85d6457298f1ef53f3eeb.png",
    illustrationUrl: "https://static.skport.com/image/common/20260604/40bdf0da178469d8adac54e743c3a9b5.png",
    tags: ["강타","물리 취약"],
  },
  "db6d086bf664455a86eedf67d9439953": {
    charId: "db6d086bf664455a86eedf67d9439953",
    name: "관리자",
    rarity: 6,
    element: "physical",
    weaponType: "sword",
    classType: "guard",
    profileImage: "https://static.skport.com/image/common/20251112/399568dc6c8b6e0331947f58ab7a19ad.png",
    standingImage: "https://static.skport.com/image/common/20260121/19b91c03694f373e11a8dbe77dd7ea0a.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/399568dc6c8b6e0331947f58ab7a19ad.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/2f61fccb562d9616a2eb057a349e0be6.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/19b91c03694f373e11a8dbe77dd7ea0a.png",
    tags: ["강타","제어"],
  },
  "bf32d11ce71874e62c2bc58d053e4bec": {
    charId: "bf32d11ce71874e62c2bc58d053e4bec",
    name: "관리자",
    rarity: 6,
    element: "physical",
    weaponType: "sword",
    classType: "guard",
    profileImage: "https://static.skport.com/image/common/20251112/a1d3ed03165785526b442aee65f0ef52.png",
    standingImage: "https://static.skport.com/image/common/20260121/6a3ca2766446af7dfc82c367193bbe57.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/a1d3ed03165785526b442aee65f0ef52.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/9a2719366fc4f8689e91f124fce7aacc.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/6a3ca2766446af7dfc82c367193bbe57.png",
    tags: ["강타","제어"],
  },
  "12ccf3692d76c7bddd3ef84eddd3f3c1": {
    charId: "12ccf3692d76c7bddd3ef84eddd3f3c1",
    name: "라스트 라이트",
    rarity: 6,
    element: "cryo",
    weaponType: "great_sword",
    classType: "striker",
    profileImage: "https://static.skport.com/image/common/20251112/07fa83e5634097332d5b1f6b229b3ea2.png",
    standingImage: "https://static.skport.com/image/common/20260121/07edf13c95aca20b18a2b4f6b295729d.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/07fa83e5634097332d5b1f6b229b3ea2.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/d8edc43d9e840d0a259f4fe30580ba08.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/07edf13c95aca20b18a2b4f6b295729d.png",
    tags: ["대량 피해","냉기 부착"],
  },
  "0b199a0eaae5a9b37a5d3c990b6c8bca": {
    charId: "0b199a0eaae5a9b37a5d3c990b6c8bca",
    name: "레바테인",
    rarity: 6,
    element: "heat",
    weaponType: "sword",
    classType: "striker",
    profileImage: "https://static.skport.com/image/common/20251112/15a984eaecaf0d7c47d871175ae38937.png",
    standingImage: "https://static.skport.com/image/common/20260121/9f814a300f4ae15f620690c839cad5ee.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/15a984eaecaf0d7c47d871175ae38937.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/102edad59937fe1a15131904729c03d2.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/9f814a300f4ae15f620690c839cad5ee.png",
    tags: ["대량 피해","연소"],
  },
  "395d6ad94f5b166d78c1831263262386": {
    charId: "395d6ad94f5b166d78c1831263262386",
    name: "로시",
    rarity: 6,
    element: "physical",
    weaponType: "sword",
    classType: "guard",
    profileImage: "https://static.skport.com/image/common/20260311/bb6cca7221225af1ce18c1850d1abb7e.png",
    standingImage: "https://static.skport.com/image/common/20260310/739e92ed14b5c8858cb135289716b5a1.png",
    avatarSqUrl: "https://static.skport.com/image/common/20260311/bb6cca7221225af1ce18c1850d1abb7e.png",
    avatarRtUrl: "https://static.skport.com/image/common/20260310/bb34ef8c9d89e7dd777f65e61be10627.png",
    illustrationUrl: "https://static.skport.com/image/common/20260310/739e92ed14b5c8858cb135289716b5a1.png",
    tags: ["띄우기","치명타","대량 피해"],
  },
  "bfb4ba13f819568c69c2ae46d8f5b869": {
    charId: "bfb4ba13f819568c69c2ae46d8f5b869",
    name: "아델리아",
    rarity: 6,
    element: "nature",
    weaponType: "arts_unit",
    classType: "supporter",
    profileImage: "https://static.skport.com/image/common/20251112/8acdcdaa6c69979a9b01f77281465a0a.png",
    standingImage: "https://static.skport.com/image/common/20260121/27f2020cefdd9599d56f4a0f6ce3cf70.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/8acdcdaa6c69979a9b01f77281465a0a.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/f5b4e596f14fb77efeae82a9c15598f8.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/27f2020cefdd9599d56f4a0f6ce3cf70.png",
    tags: ["치유","부식","취약"],
  },
  "ce97268e7469e004a3e7a81e4b09a025": {
    charId: "ce97268e7469e004a3e7a81e4b09a025",
    name: "엠버",
    rarity: 6,
    element: "heat",
    weaponType: "great_sword",
    classType: "defender",
    profileImage: "https://static.skport.com/image/common/20251112/92856e21b01c0e622b3a110c1345bf9a.png",
    standingImage: "https://static.skport.com/image/common/20260121/1b34ba6b013819bab4bb210c413c8cfd.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/92856e21b01c0e622b3a110c1345bf9a.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/99836de9ac6d9e38ece8031b92931376.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/1b34ba6b013819bab4bb210c413c8cfd.png",
    tags: ["넘어뜨리기","치유","보호"],
  },
  "d00440e32deaec195361d4fe6b011cda": {
    charId: "d00440e32deaec195361d4fe6b011cda",
    name: "여풍",
    rarity: 6,
    element: "physical",
    weaponType: "polearm",
    classType: "guard",
    profileImage: "https://static.skport.com/image/common/20251112/e1ffee22e9f4a4df2562cbfce21108e1.png",
    standingImage: "https://static.skport.com/image/common/20260121/5971fc5a79537a001be900e2a50fcf23.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/e1ffee22e9f4a4df2562cbfce21108e1.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/1c5367c90e589ad6a7a9f9364e56a3ac.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/5971fc5a79537a001be900e2a50fcf23.png",
    tags: ["넘어뜨리기","물리 취약","연타"],
  },
  "05047b063867199b953b30ac8df9a853": {
    charId: "05047b063867199b953b30ac8df9a853",
    name: "이본",
    rarity: 6,
    element: "cryo",
    weaponType: "handcannon",
    classType: "striker",
    profileImage: "https://static.skport.com/image/common/20251112/bacd477f99daf106e4995acef6c85456.png",
    standingImage: "https://static.skport.com/image/common/20260121/9c451bd9f63956ce51b63f3f1d22bf9c.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/bacd477f99daf106e4995acef6c85456.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/e63ce05be5614dd6df32eff18bb279c7.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/9c451bd9f63956ce51b63f3f1d22bf9c.png",
    tags: ["대량 피해","동결","치명타"],
  },
  "c2fa8a588cab489795166bed5161fefc": {
    charId: "c2fa8a588cab489795166bed5161fefc",
    name: "장방이",
    rarity: 6,
    element: "unknown",
    weaponType: "arts_unit",
    classType: "striker",
    profileImage: "https://static.skport.com/image/common/20260416/e6c38b8d6240eaa77a5763f4e855b888.png",
    standingImage: "https://static.skport.com/image/common/20260416/60030f4c50f89328686d731a2d066145.png",
    avatarSqUrl: "https://static.skport.com/image/common/20260416/e6c38b8d6240eaa77a5763f4e855b888.png",
    avatarRtUrl: "https://static.skport.com/image/common/20260416/85ab92dda70186799065d5a8b541f281.png",
    illustrationUrl: "https://static.skport.com/image/common/20260416/60030f4c50f89328686d731a2d066145.png",
    tags: ["대량 피해","감전"],
  },
  "0295282ff895bd1b7242d137da99dc94": {
    charId: "0295282ff895bd1b7242d137da99dc94",
    name: "질베르타",
    rarity: 6,
    element: "nature",
    weaponType: "arts_unit",
    classType: "supporter",
    profileImage: "https://static.skport.com/image/common/20251112/f64cf02eebd4b85c59754383588073de.png",
    standingImage: "https://static.skport.com/image/common/20260121/a68a8896577282da553b518eff292c86.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/f64cf02eebd4b85c59754383588073de.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/c03becda4d4bf38b384383c93f87f188.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/a68a8896577282da553b518eff292c86.png",
    tags: ["아츠 취약","자연 부착","띄우기"],
  },
  "ee3bf7197a05580397b45ba2fb1de28e": {
    charId: "ee3bf7197a05580397b45ba2fb1de28e",
    name: "탕탕",
    rarity: 6,
    element: "cryo",
    weaponType: "handcannon",
    classType: "caster",
    profileImage: "https://static.skport.com/image/common/20260311/ee017b6ab7f20b54c0effcf522518d2b.png",
    standingImage: "https://static.skport.com/image/common/20260310/5fe61cc1dd6e4c81a67b6cde1c5b0e5e.png",
    avatarSqUrl: "https://static.skport.com/image/common/20260311/ee017b6ab7f20b54c0effcf522518d2b.png",
    avatarRtUrl: "https://static.skport.com/image/common/20260310/5fc829e77627ca99d7f8b052ce000261.png",
    illustrationUrl: "https://static.skport.com/image/common/20260310/5fe61cc1dd6e4c81a67b6cde1c5b0e5e.png",
    tags: ["냉기 부착","아츠 취약"],
  },
  "9c4a116d4dba884c3db9b7f46ea7ea20": {
    charId: "9c4a116d4dba884c3db9b7f46ea7ea20",
    name: "포그라니치니크",
    rarity: 6,
    element: "physical",
    weaponType: "sword",
    classType: "vanguard",
    profileImage: "https://static.skport.com/image/common/20251112/9c14933aa23b96d01658caed5a3b9907.png",
    standingImage: "https://static.skport.com/image/common/20260121/94d22dc9e13378a0538b4bd281abc7ff.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/9c14933aa23b96d01658caed5a3b9907.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/97288bb4a82ef1bab8a573b5fec9183c.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/94d22dc9e13378a0538b4bd281abc7ff.png",
    tags: ["스킬 게이지 회복","갑옷 파괴"],
  },
  "06ba43ff26befc881fd106eaa5ef1b81": {
    charId: "06ba43ff26befc881fd106eaa5ef1b81",
    name: "스노우샤인",
    rarity: 5,
    element: "cryo",
    weaponType: "great_sword",
    classType: "defender",
    profileImage: "https://static.skport.com/image/common/20251112/b6dca12b51b4bd83b33e5fdce281a024.png",
    standingImage: "https://static.skport.com/image/common/20260121/659668dca9ee59c61b69782d8a352716.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/b6dca12b51b4bd83b33e5fdce281a024.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/3c480d899dd09d56dfb4d95b1014da16.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/659668dca9ee59c61b69782d8a352716.png",
    tags: ["비호","치유","냉기 부착"],
  },
  "e7b91cae9108d01f550922498747a45e": {
    charId: "e7b91cae9108d01f550922498747a45e",
    name: "아비웨나",
    rarity: 5,
    element: "unknown",
    weaponType: "polearm",
    classType: "striker",
    profileImage: "https://static.skport.com/image/common/20251112/ad690ee34b0fe54fc21e82f04489894f.png",
    standingImage: "https://static.skport.com/image/common/20260121/374dcefff9721fb423a8e57de6d47806.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/ad690ee34b0fe54fc21e82f04489894f.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/5c50587cfbeeb5f95893194a1f89ee5b.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/374dcefff9721fb423a8e57de6d47806.png",
    tags: ["대량 피해","아츠 취약"],
  },
  "00ff4c582aeeafc237695f81e36969b4": {
    charId: "00ff4c582aeeafc237695f81e36969b4",
    name: "아크라이트",
    rarity: 5,
    element: "unknown",
    weaponType: "sword",
    classType: "vanguard",
    profileImage: "https://static.skport.com/image/common/20251112/068394e39831e767a19d447579a97b1d.png",
    standingImage: "https://static.skport.com/image/common/20260121/aa54ecaadb81edf3673946207e6bd10a.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/068394e39831e767a19d447579a97b1d.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/8e9d9fec2c20f52b562fa2bd9dd42827.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/aa54ecaadb81edf3673946207e6bd10a.png",
    tags: ["스킬 게이지 회복","전기 부착"],
  },
  "7e6df1575604cc5872590f22af757e40": {
    charId: "7e6df1575604cc5872590f22af757e40",
    name: "알레쉬",
    rarity: 5,
    element: "cryo",
    weaponType: "sword",
    classType: "vanguard",
    profileImage: "https://static.skport.com/image/common/20251112/cd332677f9e7fb1f297a7c85c34d8c42.png",
    standingImage: "https://static.skport.com/image/common/20260121/c3ce52e98c9f94ebb9174e4a9aa0b1e9.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/cd332677f9e7fb1f297a7c85c34d8c42.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/528f99442362fa88fd494fc51ceaa422.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/c3ce52e98c9f94ebb9174e4a9aa0b1e9.png",
    tags: ["스킬 게이지 회복","동결"],
  },
  "26e3cc73ac23deb8f6a875038d2243ff": {
    charId: "26e3cc73ac23deb8f6a875038d2243ff",
    name: "울프가드",
    rarity: 5,
    element: "heat",
    weaponType: "handcannon",
    classType: "caster",
    profileImage: "https://static.skport.com/image/common/20251112/7ddb3b88ce6f0029e143000cfece7b65.png",
    standingImage: "https://static.skport.com/image/common/20260121/91b1957b1fff9e1087e5045fda6793e5.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/7ddb3b88ce6f0029e143000cfece7b65.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/3ee6ebfa0ae5f2a7f5f06ee9fe3b4261.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/91b1957b1fff9e1087e5045fda6793e5.png",
    tags: ["열기 부착","연소"],
  },
  "3839d35948216cc09368cd62167c7368": {
    charId: "3839d35948216cc09368cd62167c7368",
    name: "자이히",
    rarity: 5,
    element: "cryo",
    weaponType: "arts_unit",
    classType: "supporter",
    profileImage: "https://static.skport.com/image/common/20251112/b57fb03447e70561cd497b60af8b69e3.png",
    standingImage: "https://static.skport.com/image/common/20260121/ee225e0ec7ac4d07c3cdfb2298f337ad.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/b57fb03447e70561cd497b60af8b69e3.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/d2f6d7a22ba267e07d6ff5302e25921e.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/ee225e0ec7ac4d07c3cdfb2298f337ad.png",
    tags: ["치유","냉기 부착","증폭"],
  },
  "ad1607a2d5a203b1e95762ff0d911bcd": {
    charId: "ad1607a2d5a203b1e95762ff0d911bcd",
    name: "진천우",
    rarity: 5,
    element: "physical",
    weaponType: "sword",
    classType: "guard",
    profileImage: "https://static.skport.com/image/common/20251112/a9166c16be2bd4de3a768f55f9521cd9.png",
    standingImage: "https://static.skport.com/image/common/20260121/abb0c426315652d951137db6628ab0f6.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/a9166c16be2bd4de3a768f55f9521cd9.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/d17880af41523ee5487499b12299e25d.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/abb0c426315652d951137db6628ab0f6.png",
    tags: ["띄우기","불균형"],
  },
  "55ab3b3d98fa76a045347d29da1abbca": {
    charId: "55ab3b3d98fa76a045347d29da1abbca",
    name: "판",
    rarity: 5,
    element: "physical",
    weaponType: "great_sword",
    classType: "striker",
    profileImage: "https://static.skport.com/image/common/20251112/56ead5c066fd0657518c009d12d67d75.png",
    standingImage: "https://static.skport.com/image/common/20260121/95224a9c1c31f7cc1c9e725fa9c72e95.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/56ead5c066fd0657518c009d12d67d75.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/0322708963462a1db846bbb11e7e74ad.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/95224a9c1c31f7cc1c9e725fa9c72e95.png",
    tags: ["대량 피해","띄우기","강타"],
  },
  "c4cf7541c23c93f991e2e464ee18bb18": {
    charId: "c4cf7541c23c93f991e2e464ee18bb18",
    name: "펠리카",
    rarity: 5,
    element: "unknown",
    weaponType: "arts_unit",
    classType: "caster",
    profileImage: "https://static.skport.com/image/common/20251112/c7d4eaff6c2336b0e9d217e32d208e28.png",
    standingImage: "https://static.skport.com/image/common/20260121/8375ec9c68ff22f0c564f4becb66e7b9.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/c7d4eaff6c2336b0e9d217e32d208e28.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/0eaf2403c33d26c729778702ac919650.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/8375ec9c68ff22f0c564f4becb66e7b9.png",
    tags: ["전기 부착","감전"],
  },
  "a0591d65311b190e7d5e09faa0ed1cdd": {
    charId: "a0591d65311b190e7d5e09faa0ed1cdd",
    name: "아케쿠리",
    rarity: 4,
    element: "heat",
    weaponType: "sword",
    classType: "vanguard",
    profileImage: "https://static.skport.com/image/common/20251112/e230eb3f6a0fb635f8efaae2dae05c31.png",
    standingImage: "https://static.skport.com/image/common/20260121/d69814e0e4c65de7e1654cb5a892283a.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/e230eb3f6a0fb635f8efaae2dae05c31.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/6a00d32145893ead4d20af708c6465a6.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/d69814e0e4c65de7e1654cb5a892283a.png",
    tags: ["스킬 게이지 회복","열기 부착","연타"],
  },
  "1b441436fd73326614cfcd14c640e068": {
    charId: "1b441436fd73326614cfcd14c640e068",
    name: "안탈",
    rarity: 4,
    element: "unknown",
    weaponType: "arts_unit",
    classType: "supporter",
    profileImage: "https://static.skport.com/image/common/20251112/aca43ca0538ead35c4ff7442a6a2a724.png",
    standingImage: "https://static.skport.com/image/common/20260121/c2912de2d597a53ff0908329fcaa1d34.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/aca43ca0538ead35c4ff7442a6a2a724.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/f0b5e7d2b7f1e14ad30c3a9fc47f7ea8.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/c2912de2d597a53ff0908329fcaa1d34.png",
    tags: ["아츠 취약","증폭"],
  },
  "50515754ef6085bb6a8ddc21ab18a825": {
    charId: "50515754ef6085bb6a8ddc21ab18a825",
    name: "에스텔라",
    rarity: 4,
    element: "cryo",
    weaponType: "polearm",
    classType: "guard",
    profileImage: "https://static.skport.com/image/common/20251112/cc496a068b34e2d8df6b331f55e9ee8e.png",
    standingImage: "https://static.skport.com/image/common/20260121/1895efa3e37a23a43e30deb11d7e7730.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/cc496a068b34e2d8df6b331f55e9ee8e.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/83e08da1cfdb16b0756ccda18d203990.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/1895efa3e37a23a43e30deb11d7e7730.png",
    tags: ["냉기 부착","띄우기","물리 취약"],
  },
  "e6c2a3e9f0b1917eb0b1fe29a4b94b3d": {
    charId: "e6c2a3e9f0b1917eb0b1fe29a4b94b3d",
    name: "카치르",
    rarity: 4,
    element: "physical",
    weaponType: "great_sword",
    classType: "defender",
    profileImage: "https://static.skport.com/image/common/20251112/3b87a2f7f90dd9e6aee2d351df43e409.png",
    standingImage: "https://static.skport.com/image/common/20260121/3b693aae4e90a6a4be735321ec819f73.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/3b87a2f7f90dd9e6aee2d351df43e409.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/d60aafa113fa8275f11bb2217e92da7d.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/3b693aae4e90a6a4be735321ec819f73.png",
    tags: ["비호","보호","허약"],
  },
  "bcb564ed05eb0912d4b0f86d1e193c9f": {
    charId: "bcb564ed05eb0912d4b0f86d1e193c9f",
    name: "플루라이트",
    rarity: 4,
    element: "nature",
    weaponType: "handcannon",
    classType: "caster",
    profileImage: "https://static.skport.com/image/common/20251112/e50b9cf1b565dc2d31d4b6a2659ada39.png",
    standingImage: "https://static.skport.com/image/common/20260121/a348ee4b5a07a74b2737bcca65afda00.png",
    avatarSqUrl: "https://static.skport.com/image/common/20251112/e50b9cf1b565dc2d31d4b6a2659ada39.png",
    avatarRtUrl: "https://static.skport.com/image/common/20251121/2c964e2323e12447b624dd0ee0d594a6.png",
    illustrationUrl: "https://static.skport.com/image/common/20260121/a348ee4b5a07a74b2737bcca65afda00.png",
    tags: ["자연 부착","냉기 부착"],
  }
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
