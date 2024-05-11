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
@Table(name = "FENSCommitteeMembers")
public class FENSCommitteeMembers {
    @Id
    private int suid;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "reason_for_retirement", columnDefinition = "text")
    private String reasonForRetirement;

    @Column(name = "retirement_date", nullable = false)
    private int retirementDate;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
