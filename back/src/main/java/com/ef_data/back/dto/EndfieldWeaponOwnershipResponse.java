package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EndfieldWeaponOwnershipResponse {
    private String weaponId;
    private long ownedCount;
    private long totalUsers;
    private double ownershipRate;
}