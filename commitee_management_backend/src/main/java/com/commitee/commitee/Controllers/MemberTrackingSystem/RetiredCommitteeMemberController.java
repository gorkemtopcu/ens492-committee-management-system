package com.commitee.commitee.Controllers.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetiredCommitteeMember;
import com.commitee.commitee.Services.MemberTrackingSystem.RetiredCommitteeMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/retired-committee-members")
public class RetiredCommitteeMemberController {

    @Autowired
    private RetiredCommitteeMemberService service;

    @GetMapping
    public List<RetiredCommitteeMember> getAllRetiredCommitteeMembers() {
        return service.getAllRetiredCommitteeMembers();
    }

    @GetMapping("/{suid}")
    public RetiredCommitteeMember getRetiredCommitteeMemberById(@PathVariable int suid) {
        return service.getRetiredCommitteeMemberById(suid);
    }

    @PostMapping
    public RetiredCommitteeMember createRetiredCommitteeMember(@RequestBody RetiredCommitteeMember member) {
        return service.saveRetiredCommitteeMember(member);
    }

    @DeleteMapping("/{suid}")
    public void deleteRetiredCommitteeMember(@PathVariable int suid) {
        service.deleteRetiredCommitteeMember(suid);
    }
}