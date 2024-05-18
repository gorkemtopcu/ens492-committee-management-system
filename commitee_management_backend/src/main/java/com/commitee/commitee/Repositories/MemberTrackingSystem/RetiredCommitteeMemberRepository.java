package com.commitee.commitee.Repositories.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetiredCommitteeMember;
import com.commitee.commitee.dto.RetiredCommitteeMemberDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RetiredCommitteeMemberRepository extends JpaRepository<RetiredCommitteeMember, Integer> {

    @Query("SELECT new com.commitee.commitee.dto.RetiredCommitteeMemberDTO(rcm.suid, m.fullName, m.email, m.program, " +
            "rcm.retiredAt, rcm.duration, rcm.createdAt, rcm.earlyRetirement, rcm.retired) " +
            "FROM RetiredCommitteeMember rcm " +
            "JOIN Member m ON rcm.suid = m.suid "
            )
    List<RetiredCommitteeMemberDTO> findAllRetiredCommitteeMembersWithDetails();

    @Query("SELECT new com.commitee.commitee.dto.RetiredCommitteeMemberDTO(rcm.suid, m.fullName, m.email, m.program, " +
            "rcm.retiredAt, rcm.duration, rcm.createdAt, rcm.earlyRetirement, rcm.retired) " +
            "FROM RetiredCommitteeMember rcm " +
            "JOIN Member m ON rcm.suid = m.suid " +
            "WHERE rcm.retired = false")
    List<RetiredCommitteeMemberDTO> findAllNonRetiredCommitteeMembers();
}