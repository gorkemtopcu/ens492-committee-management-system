package com.commitee.commitee.Repositories.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.dto.InRetirementProcessMemberDTO;
import com.commitee.commitee.dto.RetiredCommitteeMemberDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RetirementRequestRepository extends JpaRepository<RetirementRequest, Integer> {
    List<RetirementRequest> findBySuid(int suid);

    @Query("SELECT new com.commitee.commitee.dto.RetiredCommitteeMemberDTO(r.requestId, r.suid, m.fullName, m.email, m.program, rm.retiredAt, r.requestDate, rm.duration, rm.createdAt, rm.earlyRetirement, rm.retired) " +
            "FROM RetirementRequest r " +
            "JOIN Member m ON r.suid = m.suid " +
            "LEFT JOIN RetiredCommitteeMember rm ON r.suid = rm.suid " +
            "WHERE r.status = 'PENDING'")
    List<RetiredCommitteeMemberDTO> findAllActiveRequests();

    @Query("SELECT new com.commitee.commitee.dto.RetiredCommitteeMemberDTO(r.requestId, r.suid, m.fullName, m.email, m.program, rm.retiredAt, r.requestDate,rm.duration, rm.createdAt, rm.earlyRetirement, rm.retired) " +
            "FROM RetirementRequest r " +
            "JOIN Member m ON r.suid = m.suid " +
            "LEFT JOIN RetiredCommitteeMember rm ON r.suid = rm.suid " +
            "WHERE rm.retired = true"
           )
    List<RetiredCommitteeMemberDTO> findAllRetiredInfo();
}