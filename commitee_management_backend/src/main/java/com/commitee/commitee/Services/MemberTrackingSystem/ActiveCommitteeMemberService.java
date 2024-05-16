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

    public List<ActiveCommitteeMember> getAll() {
        return repository.findAll();
    }

    public ActiveCommitteeMember getById(int suid) {
        return repository.findById(suid).orElse(null);
    }

    public ActiveCommitteeMember save(ActiveCommitteeMember member) {
        return repository.save(member);
    }

    public void deleteById(int suid) {
        repository.deleteById(suid);
    }
}