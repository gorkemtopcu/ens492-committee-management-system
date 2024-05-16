package com.commitee.commitee.Entities.MemberTrackingSystem;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "retirement_requests")
public class RetirementRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    private int suid;

    private LocalDateTime requestDate;

    @Column(columnDefinition = "BIT(1)")
    private Boolean closed;

    @Column(length = 20)
    private String status;

}