package com.ef_data.back.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
        name = "endfield_user_characters",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"role_id", "char_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
public class EndfieldUserCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "endfield_user_characters_seq_gen")
    @SequenceGenerator(
            name = "endfield_user_characters_seq_gen",
            sequenceName = "endfield_user_characters_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "role_id", nullable = false)
    private String roleId;

    @Column(name = "char_id", nullable = false)
    private String charId;

    @Column(name = "char_level")
    private Integer level;

    @Column(name = "evolve_phase")
    private Integer evolvePhase;

    private Boolean owned;
}
