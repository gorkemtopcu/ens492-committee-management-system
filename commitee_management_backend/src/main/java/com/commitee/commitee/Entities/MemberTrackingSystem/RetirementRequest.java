package com.commitee.commitee.Entities.MemberTrackingSystem;

import com.commitee.commitee.Requests.DocumentRequest;
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
@Table(name = "retirement_requests")
public class RetirementRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int requestId;

    @Column(name = "suid", nullable = false)
    private int suid;

    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate;

    @Column(name = "closed_date")
    private LocalDateTime closedDate;

    @Column(name = "closed", columnDefinition = "BIT(1)")
    private Boolean closed;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "retirement_reason", length = 255)
    private String retirementReason;


}