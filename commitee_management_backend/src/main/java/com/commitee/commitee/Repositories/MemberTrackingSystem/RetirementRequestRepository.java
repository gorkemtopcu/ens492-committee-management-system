package com.commitee.commitee.Repositories.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.dto.InRetirementProcessMemberDTO;
import com.commitee.commitee.dto.RetiredCommitteeMemberDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RetirementRequestRepository extends JpaRepository<RetirementRequest, Integer> {
    List<RetirementRequest> findBySuid(int suid);

    @Query("SELECT r FROM RetirementRequest r WHERE r.status = 'PENDING'")
    List<RetirementRequest> findAllActiveRequests();

    @Query("SELECT new com.commitee.commitee.dto.RetiredCommitteeMemberDTO(r.suid, m.fullName, m.email, m.program, rm.retiredAt, rm.duration, rm.createdAt, rm.earlyRetirement, rm.retired) " +
            "FROM RetirementRequest r " +
            "JOIN Member m ON r.suid = m.suid " +
            "LEFT JOIN RetiredCommitteeMember rm ON r.suid = rm.suid "
           )
    List<RetiredCommitteeMemberDTO> findAllRetiredInfo();
}