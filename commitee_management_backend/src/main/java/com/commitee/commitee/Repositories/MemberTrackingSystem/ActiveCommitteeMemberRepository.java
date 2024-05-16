package com.commitee.commitee.Repositories.MemberTrackingSystem;

import com.commitee.commitee.dto.ActiveCommitteeMemberDTO;
import com.commitee.commitee.Entities.MemberTrackingSystem.ActiveCommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ActiveCommitteeMemberRepository extends JpaRepository<ActiveCommitteeMember, Integer> {
    @Query("SELECT new com.commitee.commitee.dto.ActiveCommitteeMemberDTO(acm.suid, m.fullName, m.email, m.program, acm.duration) " +
            "FROM ActiveCommitteeMember acm " +
            "JOIN Member m ON acm.suid = m.suid " +
            "WHERE m.active = true")
    List<ActiveCommitteeMemberDTO> findAllActiveCommitteeMembersWithDetails();}