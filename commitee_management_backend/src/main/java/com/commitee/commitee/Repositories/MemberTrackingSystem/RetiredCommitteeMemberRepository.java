package com.commitee.commitee.Repositories.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetiredCommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RetiredCommitteeMemberRepository extends JpaRepository<RetiredCommitteeMember, Integer> {
}