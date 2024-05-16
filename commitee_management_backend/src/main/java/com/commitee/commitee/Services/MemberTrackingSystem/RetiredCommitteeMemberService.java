package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetiredCommitteeMember;
import com.commitee.commitee.Repositories.MemberTrackingSystem.RetiredCommitteeMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RetiredCommitteeMemberService {

    @Autowired
    private RetiredCommitteeMemberRepository repository;

    public List<RetiredCommitteeMember> getAllRetiredCommitteeMembers() {
        return repository.findAll();
    }

    public RetiredCommitteeMember getRetiredCommitteeMemberById(int suid) {
        return repository.findById(suid).orElse(null);
    }

    public RetiredCommitteeMember saveRetiredCommitteeMember(RetiredCommitteeMember member) {
        return repository.save(member);
    }

    public void deleteRetiredCommitteeMember(int suid) {
        repository.deleteById(suid);
    }
}