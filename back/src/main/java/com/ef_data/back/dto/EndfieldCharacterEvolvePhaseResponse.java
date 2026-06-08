package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EndfieldCharacterEvolvePhaseResponse {

    private Integer evolvePhase;

    private long count;
}