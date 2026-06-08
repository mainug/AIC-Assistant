package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EndfieldCharacterLevelDistributionResponse {

    private String levelRange;

    private long count;
}