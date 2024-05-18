package com.commitee.commitee.Repositories.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RetirementRequestRepository extends JpaRepository<RetirementRequest, Integer> {
    List<RetirementRequest> findBySuid(int suid);
}