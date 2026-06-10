import { API_BASE_URL } from "./config";
import type {
  CharacterOwnership,
  EndfieldStatisticsSummary,
  UserCharacter,
  UserProfile,
  UserWeapon,
  WeaponOwnership,
} from "../types/endfield";

async function requestJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchEndfieldStatisticsSummary() {
  return requestJson<EndfieldStatisticsSummary>(
    `${API_BASE_URL}/api/endfield/statistics/summary`,
  );
}

export function fetchCharacterOwnership() {
  return requestJson<CharacterOwnership[]>(
    `${API_BASE_URL}/api/endfield/statistics/characters/ownership`,
  );
}

export function fetchWeaponOwnership() {
  return requestJson<WeaponOwnership[]>(
    `${API_BASE_URL}/api/endfield/statistics/weapons/ownership`,
  );
}

export function fetchUserProfile(roleId: string) {
  return requestJson<UserProfile>(
    `${API_BASE_URL}/api/endfield/users/${encodeURIComponent(roleId)}/profile`,
  );
}

export function fetchUserCharacters(roleId: string) {
  return requestJson<UserCharacter[]>(
    `${API_BASE_URL}/api/endfield/users/${encodeURIComponent(roleId)}/characters`,
  );
}

export function fetchUserWeapons(roleId: string) {
  return requestJson<UserWeapon[]>(
    `${API_BASE_URL}/api/endfield/users/${encodeURIComponent(roleId)}/weapons`,
  );
}
