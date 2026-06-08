package com.ef_data.back.controller;

import com.ef_data.back.dto.EndfieldUserGameDataImportRequest;
import com.ef_data.back.service.EndfieldImportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/endfield/import")
public class EndfieldImportController {

    private final EndfieldImportService endfieldImportService;

    @PostMapping("/user-game-data")
    public void importUserGameData(@RequestBody EndfieldUserGameDataImportRequest request) {
        log.info("roleId = {}", request.getRoleId());
        log.info("characters = {}", request.getUserChars() == null ? 0 : request.getUserChars().size());
        log.info("weapons = {}", request.getUserWeapons() == null ? 0 : request.getUserWeapons().size());
        log.info("detectedAt = {}", request.getDetectedAt());

        endfieldImportService.importUserGameData(request);
    }
}