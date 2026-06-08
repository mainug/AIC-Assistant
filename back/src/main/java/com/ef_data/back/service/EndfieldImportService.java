package com.ef_data.back.service;

import com.ef_data.back.dto.EndfieldUserGameDataImportRequest;
import com.ef_data.back.entity.EndfieldUserCharacter;
import com.ef_data.back.entity.EndfieldUserProfile;
import com.ef_data.back.entity.EndfieldUserWeapon;
import com.ef_data.back.repository.EndfieldUserCharacterRepository;
import com.ef_data.back.repository.EndfieldUserProfileRepository;
import com.ef_data.back.repository.EndfieldUserWeaponRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class EndfieldImportService {

    private final EndfieldUserProfileRepository profileRepository;
    private final EndfieldUserCharacterRepository characterRepository;
    private final EndfieldUserWeaponRepository weaponRepository;

    @Transactional
    public void importUserGameData(EndfieldUserGameDataImportRequest request) {
        String roleId = request.getRoleId();

        if (roleId == null || roleId.isBlank()) {
            throw new IllegalArgumentException("roleId가 없습니다.");
        }

        saveOrUpdateProfile(roleId, request.getDetectedAt());

        saveOrUpdateCharacters(roleId, request.getUserChars());

        saveOrUpdateWeapons(roleId, request.getUserWeapons());
    }

    private void saveOrUpdateProfile(String roleId, String detectedAt) {
        EndfieldUserProfile profile = profileRepository.findByRoleId(roleId)
                .orElseGet(EndfieldUserProfile::new);

        profile.setRoleId(roleId);
        profile.setLastSyncedAt(parseDetectedAt(detectedAt));

        profileRepository.save(profile);
    }

    private void saveOrUpdateCharacters(String roleId, Map<String, JsonNode> userChars) {
        if (userChars == null || userChars.isEmpty()) {
            return;
        }

        for (Map.Entry<String, JsonNode> entry : userChars.entrySet()) {
            String charKey = entry.getKey();
            JsonNode charNode = entry.getValue();

            String charId = getText(charNode, "charId", charKey);

            EndfieldUserCharacter character = characterRepository
                    .findByRoleIdAndCharId(roleId, charId)
                    .orElseGet(EndfieldUserCharacter::new);

            character.setRoleId(roleId);
            character.setCharId(charId);
            character.setLevel(getInt(charNode, "level", 0));
            character.setEvolvePhase(getInt(charNode, "evolvePhase", 0));
            character.setOwned(getBoolean(charNode, "owned", false));

            characterRepository.save(character);
        }
    }

    private void saveOrUpdateWeapons(String roleId, Map<String, JsonNode> userWeapons) {
        if (userWeapons == null || userWeapons.isEmpty()) {
            return;
        }

        for (Map.Entry<String, JsonNode> entry : userWeapons.entrySet()) {
            String weaponKey = entry.getKey();
            JsonNode weaponNode = entry.getValue();

            String weaponId = getText(weaponNode, "weaponId", weaponKey);

            EndfieldUserWeapon weapon = weaponRepository
                    .findByRoleIdAndWeaponId(roleId, weaponId)
                    .orElseGet(EndfieldUserWeapon::new);

            weapon.setRoleId(roleId);
            weapon.setWeaponId(weaponId);
            weapon.setOwned(getBoolean(weaponNode, "owned", false));

            weaponRepository.save(weapon);
        }
    }

    private String getText(JsonNode node, String fieldName, String defaultValue) {
        if (node == null || node.path(fieldName).isMissingNode() || node.path(fieldName).isNull()) {
            return defaultValue;
        }

        return node.path(fieldName).asText(defaultValue);
    }

    private int getInt(JsonNode node, String fieldName, int defaultValue) {
        if (node == null || node.path(fieldName).isMissingNode() || node.path(fieldName).isNull()) {
            return defaultValue;
        }

        return node.path(fieldName).asInt(defaultValue);
    }

    private boolean getBoolean(JsonNode node, String fieldName, boolean defaultValue) {
        if (node == null || node.path(fieldName).isMissingNode() || node.path(fieldName).isNull()) {
            return defaultValue;
        }

        return node.path(fieldName).asBoolean(defaultValue);
    }

    private LocalDateTime parseDetectedAt(String detectedAt) {
        if (detectedAt == null || detectedAt.isBlank()) {
            return LocalDateTime.now();
        }

        try {
            return OffsetDateTime.parse(detectedAt).toLocalDateTime();
        } catch (Exception e) {
            return LocalDateTime.now();
        }
    }
}