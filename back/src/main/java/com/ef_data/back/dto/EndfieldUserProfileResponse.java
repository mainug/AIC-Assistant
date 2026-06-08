package com.ef_data.back.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class EndfieldUserProfileResponse {

    private String roleId;

    private LocalDateTime lastSyncedAt;
}