package com.ef_data.back.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ef_data.back.dto.EndfieldCharacterEvolvePhaseResponse;
import com.ef_data.back.dto.EndfieldCharacterLevelDistributionResponse;
import com.ef_data.back.dto.EndfieldCharacterOwnershipResponse;
import com.ef_data.back.dto.EndfieldStatisticsSummaryResponse;
import com.ef_data.back.dto.EndfieldWeaponOwnershipResponse;
import com.ef_data.back.service.EndfieldStatisticsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/endfield/statistics")
@RequiredArgsConstructor
public class EndfieldStatisticsController {

    private final EndfieldStatisticsService statisticsService;

    @GetMapping("/summary")
    public EndfieldStatisticsSummaryResponse getSummary() {
        return statisticsService.getSummary();
    }

    @GetMapping("/characters/ownership")
    public List<EndfieldCharacterOwnershipResponse> getCharacterOwnership() {
        return statisticsService.getCharacterOwnership();
    }

    @GetMapping("/characters/{charId}/evolve-phase")
    public List<EndfieldCharacterEvolvePhaseResponse> getCharacterEvolvePhaseStats(
            @PathVariable("charId") String charId
    ) {
        return statisticsService.getCharacterEvolvePhaseStats(charId);
    }

    @GetMapping("/characters/{charId}/level-distribution")
    public List<EndfieldCharacterLevelDistributionResponse> getCharacterLevelDistribution(
            @PathVariable("charId") String charId
    ) {
        return statisticsService.getCharacterLevelDistribution(charId);
    }

    @GetMapping("/weapons/ownership")
    public List<EndfieldWeaponOwnershipResponse> getWeaponOwnership() {
        return statisticsService.getWeaponOwnership();
    }
}