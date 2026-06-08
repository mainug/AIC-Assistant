package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EndfieldCharacterOwnershipResponse {
    private String charId;
    private long ownedCount;
    private long totalUsers;
    private double ownershipRate;
}
