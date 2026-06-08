package com.ef_data.back.service;

import com.ef_data.back.dto.EndfieldUserCharacterResponse;
import com.ef_data.back.dto.EndfieldUserProfileResponse;
import com.ef_data.back.dto.EndfieldUserWeaponResponse;
import com.ef_data.back.entity.EndfieldUserProfile;
import com.ef_data.back.repository.EndfieldUserCharacterRepository;
import com.ef_data.back.repository.EndfieldUserProfileRepository;
import com.ef_data.back.repository.EndfieldUserWeaponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EndfieldUserDataQueryService {

    private final EndfieldUserProfileRepository profileRepository;
    private final EndfieldUserCharacterRepository characterRepository;
    private final EndfieldUserWeaponRepository weaponRepository;

    public EndfieldUserProfileResponse getProfile(String roleId) {
        EndfieldUserProfile profile = profileRepository.findByRoleId(roleId)
                .orElseThrow(() -> new IllegalArgumentException("해당 roleId의 프로필이 없습니다: " + roleId));

        return EndfieldUserProfileResponse.builder()
                .roleId(profile.getRoleId())
                .lastSyncedAt(profile.getLastSyncedAt())
                .build();
    }

    public List<EndfieldUserCharacterResponse> getCharacters(String roleId) {
        return characterRepository.findAllByRoleIdOrderByCharIdAsc(roleId)
                .stream()
                .map(character -> EndfieldUserCharacterResponse.builder()
                        .charId(character.getCharId())
                        .level(character.getLevel())
                        .evolvePhase(character.getEvolvePhase())
                        .owned(character.getOwned())
                        .build())
                .toList();
    }

    public List<EndfieldUserWeaponResponse> getWeapons(String roleId) {
        return weaponRepository.findAllByRoleIdOrderByWeaponIdAsc(roleId)
                .stream()
                .map(weapon -> EndfieldUserWeaponResponse.builder()
                        .weaponId(weapon.getWeaponId())
                        .owned(weapon.getOwned())
                        .build())
                .toList();
    }
}