package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.ActiveCommitteeMember;
import com.commitee.commitee.Repositories.MemberTrackingSystem.ActiveCommitteeMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActiveCommitteeMemberService {

    @Autowired
    private ActiveCommitteeMemberRepository repository;

    public List<ActiveCommitteeMember> getAllActiveCommitteeMembers() {
        return repository.findAll();
    }

    public ActiveCommitteeMember getActiveCommitteeMemberById(int suid) {
        return repository.findById(suid).orElse(null);
    }

    public ActiveCommitteeMember saveActiveCommitteeMember(ActiveCommitteeMember member) {
        return repository.save(member);
    }

    public void deleteActiveCommitteeMember(int suid) {
        repository.deleteById(suid);
    }
}