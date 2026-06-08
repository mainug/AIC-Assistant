package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EndfieldStatisticsSummaryResponse {
    private long totalUsers;
    private long totalCharacters;
    private long totalWeapons;
}
