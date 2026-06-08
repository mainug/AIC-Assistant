package com.ef_data.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ef_data.back.entity.EndfieldUserProfile;

public interface EndfieldUserProfileRepository extends JpaRepository<EndfieldUserProfile, Long> {
    
    Optional<EndfieldUserProfile> findByRoleId(String roleId);

    long countBy();
}