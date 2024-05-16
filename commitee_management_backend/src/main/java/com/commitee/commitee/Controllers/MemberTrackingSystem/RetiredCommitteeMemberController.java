package com.commitee.commitee.Controllers.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetiredCommitteeMember;
import com.commitee.commitee.Services.MemberTrackingSystem.RetiredCommitteeMemberService;
import com.commitee.commitee.dto.RetiredCommitteeMemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/retired-committee-members")
public class RetiredCommitteeMemberController {

    @Autowired
    private RetiredCommitteeMemberService retiredCommitteeMemberService;

    @GetMapping("/getAllRetired")
    public List<RetiredCommitteeMemberDTO> getAllRetiredCommitteeMembers() {
        return retiredCommitteeMemberService.getAllRetiredCommitteeMembers();
    }

    @GetMapping("/getAllInRetirementProcess")
    public List<RetiredCommitteeMemberDTO> getAllInRetirementProcessCommitteeMembers() {
        return retiredCommitteeMemberService.getAllInRetirementProcessCommitteeMembers();
    }

    @GetMapping("/getById/{suid}")
    public RetiredCommitteeMember getRetiredCommitteeMemberById(@PathVariable int suid) {
        return retiredCommitteeMemberService.getById(suid);
    }

    @PostMapping("/add")
    public RetiredCommitteeMember createRetiredCommitteeMember(@RequestBody RetiredCommitteeMember member) {
        return retiredCommitteeMemberService.save(member);
    }

    @DeleteMapping("/deleteById/{suid}")
    public void deleteRetiredCommitteeMember(@PathVariable int suid) {
        retiredCommitteeMemberService.deleteById(suid);
    }
}