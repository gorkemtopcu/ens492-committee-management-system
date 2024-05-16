package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.dto.ActiveCommitteeMemberDTO;
import com.commitee.commitee.Entities.MemberTrackingSystem.ActiveCommitteeMember;
import com.commitee.commitee.Entities.MemberTrackingSystem.RetiredCommitteeMember;
import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.Repositories.MemberTrackingSystem.ActiveCommitteeMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActiveCommitteeMemberService {

    @Autowired
    private ActiveCommitteeMemberRepository repository;

    @Autowired
    private RetiredCommitteeMemberService retiredCommitteeMemberService;

    @Autowired
    private RetirementRequestService retirementRequestService;

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

    @Transactional
    public void retirementRequestById(int suid) {
        try {
            ActiveCommitteeMember member = repository.findById(suid).orElse(null);
            if (member == null) {
                return;
            }

            // Create RetiredCommitteeMember
            RetiredCommitteeMember retiredMember = new RetiredCommitteeMember();
            retiredMember.setSuid(member.getSuid());
            retiredMember.setCreatedAt(member.getCreatedAt());
            retiredMember.setDuration(member.getDuration());
            retiredMember.setRetiredAt(LocalDateTime.now());
            retiredMember.setEarlyRetirement(false);
            retiredMember.setRetired(false);
            retiredCommitteeMemberService.save(retiredMember);

            // Create RetirementRequest
            RetirementRequest request = new RetirementRequest();
            request.setSuid(member.getSuid());
            request.setRequestDate(LocalDateTime.now());
            request.setClosedDate(null);
            request.setClosed(false);
            request.setStatus("Pending");
            retirementRequestService.save(request);

            // delete ActiveCommitteeMember
            repository.deleteById(suid);
        } catch (Exception e) {
            throw new RuntimeException("Error processing retirement request", e);
        }
    }

    public List<ActiveCommitteeMemberDTO> getAllActiveCommitteeMembersWithDetails() {
        return repository.findAllActiveCommitteeMembersWithDetails();
    }
}