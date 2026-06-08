package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EndfieldUserCharacterSkillResponse {

    private String skillId;

    private Integer level;
}