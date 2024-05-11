package com.commitee.commitee.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "RetirementHistory")
public class RetirementHistory {
    @Id
    private int suid;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "role", columnDefinition = "text")
    private String role;

    @Column(name = "program", columnDefinition = "text")
    private String program;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime started_at;

    @Column(name = "expected_retirement", nullable = false)
    private LocalDateTime expected_retirement;

    @Column(name = "isActive", nullable = false)
    private boolean isActive;
}
