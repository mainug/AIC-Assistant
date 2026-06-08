package com.ef_data.back.repository;

import com.ef_data.back.entity.EndfieldUserWeapon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EndfieldUserWeaponRepository extends JpaRepository<EndfieldUserWeapon, Long> {

    Optional<EndfieldUserWeapon> findByRoleIdAndWeaponId(String roleId, String weaponId);

    List<EndfieldUserWeapon> findAllByRoleIdOrderByWeaponIdAsc(String roleId);

    long countBy();

    @Query("""
        select w.weaponId, count(w)
        from EndfieldUserWeapon w
        where w.owned = true
        group by w.weaponId
        order by count(w) desc
    """)
    List<Object[]> countOwnedWeaponsGroupByWeaponId();
}