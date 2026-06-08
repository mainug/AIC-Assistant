package com.ef_data.back.controller;

import com.ef_data.back.dto.EndfieldUserCharacterResponse;
import com.ef_data.back.dto.EndfieldUserProfileResponse;
import com.ef_data.back.dto.EndfieldUserWeaponResponse;
import com.ef_data.back.service.EndfieldUserDataQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/endfield/users")
@RequiredArgsConstructor
public class EndfieldUserDataController {

    private final EndfieldUserDataQueryService queryService;

    @GetMapping("/{roleId}/profile")
    public EndfieldUserProfileResponse getProfile(
            @PathVariable("roleId") String roleId
    ) {
        return queryService.getProfile(roleId);
    }

    @GetMapping("/{roleId}/characters")
    public List<EndfieldUserCharacterResponse> getCharacters(
            @PathVariable("roleId") String roleId
    ) {
        return queryService.getCharacters(roleId);
    }

    @GetMapping("/{roleId}/weapons")
    public List<EndfieldUserWeaponResponse> getWeapons(
            @PathVariable("roleId") String roleId
    ) {
        return queryService.getWeapons(roleId);
    }
}