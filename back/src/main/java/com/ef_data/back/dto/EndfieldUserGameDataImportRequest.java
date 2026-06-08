package com.ef_data.back.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class EndfieldUserGameDataImportRequest {

    private String roleId;

    private Map<String, JsonNode> userChars;

    private Map<String, JsonNode> userWeapons;

    private String detectedAt;
}