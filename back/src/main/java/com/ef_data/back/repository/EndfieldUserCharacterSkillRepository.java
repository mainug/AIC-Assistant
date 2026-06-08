package com.ef_data.back.repository;

import com.ef_data.back.entity.EndfieldUserCharacterSkill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EndfieldUserCharacterSkillRepository extends JpaRepository<EndfieldUserCharacterSkill, Long> {

    Optional<EndfieldUserCharacterSkill> findByRoleIdAndCharIdAndSkillId(
            String roleId,
            String charId,
            String skillId
    );

    List<EndfieldUserCharacterSkill> findAllByRoleIdAndCharIdOrderBySkillIdAsc(
            String roleId,
            String charId
    );
}