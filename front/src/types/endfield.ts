export type EndfieldStatisticsSummary = {
  totalUsers: number;
  totalCharacters: number;
  totalWeapons: number;
};

export type CharacterOwnership = {
  charId: string;
  ownedCount: number;
  totalUsers: number;
  ownershipRate: number;
};

export type WeaponOwnership = {
  weaponId: string;
  ownedCount: number;
  totalUsers: number;
  ownershipRate: number;
};

export type UserProfile = {
  roleId: string;
  lastSyncedAt: string;
};

export type UserCharacter = {
  charId: string;
  level: number;
  evolvePhase: number;
  owned: boolean;
};

export type UserWeapon = {
  weaponId: string;
  owned: boolean;
};
