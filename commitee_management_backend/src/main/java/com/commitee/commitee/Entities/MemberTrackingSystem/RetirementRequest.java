package com.commitee.commitee.Entities.MemberTrackingSystem;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "retirement_requests")
public class RetirementRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @Column(name = "suid", nullable = false)
    private int suid;

    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate;

    @Column(name = "closed", columnDefinition = "BIT(1)")
    private Boolean closed;

    @Column(name = "status", length = 20)
    private String status;

}