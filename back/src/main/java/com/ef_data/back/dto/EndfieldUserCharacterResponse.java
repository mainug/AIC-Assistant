package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EndfieldUserCharacterResponse {

    private String charId;

    private Integer level;

    private Integer evolvePhase;

    private Boolean owned;
}