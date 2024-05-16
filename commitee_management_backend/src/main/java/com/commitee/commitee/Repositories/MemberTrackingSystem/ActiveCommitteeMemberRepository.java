package com.commitee.commitee.Repositories.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.ActiveCommitteeMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActiveCommitteeMemberRepository extends JpaRepository<ActiveCommitteeMember, Integer> {
}