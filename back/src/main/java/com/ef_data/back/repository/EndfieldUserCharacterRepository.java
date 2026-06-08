package com.ef_data.back.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ef_data.back.entity.EndfieldUserCharacter;

public interface EndfieldUserCharacterRepository extends JpaRepository<EndfieldUserCharacter, Long> {

    Optional<EndfieldUserCharacter> findByRoleIdAndCharId(String roleId, String charId);

    List<EndfieldUserCharacter> findAllByRoleIdOrderByCharIdAsc(String roleId);

    long countBy();

    @Query("""
        select c.charId, count(c)
        from EndfieldUserCharacter c
        where c.owned = true
        group by c.charId
        order by count(c) desc
    """)
    List<Object[]> countOwnedCharactersGroupByCharId();

    @Query("""
        select c.evolvePhase, count(c)
        from EndfieldUserCharacter c
        where c.owned = true
        and c.charId = :charId
        group by c.evolvePhase
        order by c.evolvePhase asc
    """)
    List<Object[]> countEvolvePhaseByCharId(@Param("charId") String charId);

    @Query("""
        select
            case
                when c.level >= 60 and c.level < 80 then '60+'
                when c.level >= 80 and c.level < 90 then '80+'
                when c.level = 90 then '90'
                else 'OTHER'
            end,
            count(c)
        from EndfieldUserCharacter c
        where c.owned = true
        and c.charId = :charId
        and c.level >= 60
        group by
            case
                when c.level >= 60 and c.level < 80 then '60+'
                when c.level >= 80 and c.level < 90 then '80+'
                when c.level = 90 then '90'
                else 'OTHER'
            end
    """)
    List<Object[]> countLevelRangesByCharId(@Param("charId") String charId);
}