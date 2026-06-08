package com.ef_data.back.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ef_data.back.dto.EndfieldCharacterEvolvePhaseResponse;
import com.ef_data.back.dto.EndfieldCharacterLevelDistributionResponse;
import com.ef_data.back.dto.EndfieldCharacterOwnershipResponse;
import com.ef_data.back.dto.EndfieldStatisticsSummaryResponse;
import com.ef_data.back.dto.EndfieldWeaponOwnershipResponse;
import com.ef_data.back.repository.EndfieldUserCharacterRepository;
import com.ef_data.back.repository.EndfieldUserProfileRepository;
import com.ef_data.back.repository.EndfieldUserWeaponRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EndfieldStatisticsService {

    private final EndfieldUserProfileRepository profileRepository;
    private final EndfieldUserCharacterRepository characterRepository;
    private final EndfieldUserWeaponRepository weaponRepository;

    public EndfieldStatisticsSummaryResponse getSummary() {
        return EndfieldStatisticsSummaryResponse.builder()
                .totalUsers(profileRepository.count())
                .totalCharacters(characterRepository.count())
                .totalWeapons(weaponRepository.count())
                .build();
    }

    public List<EndfieldCharacterOwnershipResponse> getCharacterOwnership() {
        long totalUsers = profileRepository.count();

        return characterRepository.countOwnedCharactersGroupByCharId()
                .stream()
                .map(row -> {
                    String charId = (String) row[0];
                    long ownedCount = (Long) row[1];

                    double rate = totalUsers == 0
                            ? 0.0
                            : ownedCount * 100.0 / totalUsers;

                    return EndfieldCharacterOwnershipResponse.builder()
                            .charId(charId)
                            .ownedCount(ownedCount)
                            .totalUsers(totalUsers)
                            .ownershipRate(Math.round(rate * 10.0) / 10.0)
                            .build();
                })
                .toList();
    }

    public List<EndfieldCharacterEvolvePhaseResponse> getCharacterEvolvePhaseStats(String charId) {
        Map<Integer, Long> resultMap = characterRepository.countEvolvePhaseByCharId(charId)
                .stream()
                .collect(Collectors.toMap(
                        row -> ((Number) row[0]).intValue(),
                        row -> ((Number) row[1]).longValue()
                ));

        return List.of(0, 1, 2, 3, 4)
                .stream()
                .map(phase -> EndfieldCharacterEvolvePhaseResponse.builder()
                        .evolvePhase(phase)
                        .count(resultMap.getOrDefault(phase, 0L))
                        .build())
                .toList();
    }

    public List<EndfieldCharacterLevelDistributionResponse> getCharacterLevelDistribution(String charId) {
        Map<String, Long> resultMap = characterRepository.countLevelRangesByCharId(charId)
                .stream()
                .collect(Collectors.toMap(
                        row -> (String) row[0],
                        row -> ((Number) row[1]).longValue()
                ));

        return List.of("60+", "80+", "90")
                .stream()
                .map(levelRange -> EndfieldCharacterLevelDistributionResponse.builder()
                        .levelRange(levelRange)
                        .count(resultMap.getOrDefault(levelRange, 0L))
                        .build())
                .toList();
        }

    public List<EndfieldWeaponOwnershipResponse> getWeaponOwnership() {
        long totalUsers = profileRepository.count();

        return weaponRepository.countOwnedWeaponsGroupByWeaponId()
                .stream()
                .map(row -> {
                    String weaponId = (String) row[0];
                    long ownedCount = (Long) row[1];

                    double rate = totalUsers == 0
                            ? 0.0
                            : ownedCount * 100.0 / totalUsers;

                    return EndfieldWeaponOwnershipResponse.builder()
                            .weaponId(weaponId)
                            .ownedCount(ownedCount)
                            .totalUsers(totalUsers)
                            .ownershipRate(Math.round(rate * 10.0) / 10.0)
                            .build();
                })
                .toList();
    }
}
