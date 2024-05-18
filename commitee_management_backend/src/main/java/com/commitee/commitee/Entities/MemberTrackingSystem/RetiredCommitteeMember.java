package com.commitee.commitee.Entities.MemberTrackingSystem;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "retired_committee_members")
public class RetiredCommitteeMember {
    @Id
    private int suid;

    private Integer duration;

    @Column(name = "retired_at", columnDefinition = "DATETIME")
    private LocalDateTime retiredAt;

    @Column(name = "created_at", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(columnDefinition = "BIT(1)")
    private Boolean earlyRetirement;

    @Column(columnDefinition = "BIT(1)")
    private Boolean retired;

}