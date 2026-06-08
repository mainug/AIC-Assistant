package com.ef_data.back.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "endfield_user_profiles")
@Getter
@Setter
@NoArgsConstructor
public class EndfieldUserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "endfield_user_profiles_seq_gen")
    @SequenceGenerator(
            name = "endfield_user_profiles_seq_gen",
            sequenceName = "endfield_user_profiles_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(nullable = false, unique = true)
    private String roleId;

    private LocalDateTime lastSyncedAt;
}