package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetiredCommitteeMember;
import com.commitee.commitee.Repositories.MemberTrackingSystem.RetiredCommitteeMemberRepository;
import com.commitee.commitee.dto.RetiredCommitteeMemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RetiredCommitteeMemberService {

    @Autowired
    private RetiredCommitteeMemberRepository repository;

    public List<RetiredCommitteeMember> getAll() {
        return repository.findAll();
    }

    public RetiredCommitteeMember getById(int suid) {
        return repository.findById(suid).orElse(null);
    }

    public RetiredCommitteeMember save(RetiredCommitteeMember member) {
        return repository.save(member);
    }

    public void deleteById(int suid) {
        repository.deleteById(suid);
    }

    public List<RetiredCommitteeMemberDTO> getAllRetiredCommitteeMembers() {
        return repository.findAllRetiredCommitteeMembersWithDetails();
    }

    public List<RetiredCommitteeMemberDTO> getAllInRetirementProcessCommitteeMembers() {
        return repository.findAllNonRetiredCommitteeMembers();
    }
}