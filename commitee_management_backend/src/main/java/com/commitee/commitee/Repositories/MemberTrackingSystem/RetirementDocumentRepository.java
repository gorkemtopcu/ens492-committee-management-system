package com.commitee.commitee.Repositories.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RetirementDocumentRepository extends JpaRepository<RetirementDocument, Integer> {
    List<RetirementDocument> findByRequestId(int requestId);
}