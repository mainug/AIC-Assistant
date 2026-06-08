package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EndfieldUserWeaponResponse {

    private String weaponId;

    private Boolean owned;
}