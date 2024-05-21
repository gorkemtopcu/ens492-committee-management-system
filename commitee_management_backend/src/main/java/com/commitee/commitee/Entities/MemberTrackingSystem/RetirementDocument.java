package com.commitee.commitee.Entities.MemberTrackingSystem;

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
@Table(name = "retirement_documents")
public class RetirementDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int documentId;

    private int requestId;

    @Column(length = 50)
    private String documentType;

    @Column(length = 255)
    private String filePath;

    private LocalDateTime uploadedDate;
}