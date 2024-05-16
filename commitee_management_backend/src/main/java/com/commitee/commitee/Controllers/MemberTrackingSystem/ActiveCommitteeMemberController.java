package com.commitee.commitee.Controllers.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.ActiveCommitteeMember;
import com.commitee.commitee.Services.MemberTrackingSystem.ActiveCommitteeMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/active-committee-members")
public class ActiveCommitteeMemberController {

    @Autowired
    private ActiveCommitteeMemberService service;

    @GetMapping
    public List<ActiveCommitteeMember> getAllActiveCommitteeMembers() {
        return service.getAllActiveCommitteeMembers();
    }

    @GetMapping("/{suid}")
    public ActiveCommitteeMember getActiveCommitteeMemberById(@PathVariable int suid) {
        return service.getActiveCommitteeMemberById(suid);
    }

    @PostMapping
    public ActiveCommitteeMember createActiveCommitteeMember(@RequestBody ActiveCommitteeMember member) {
        return service.saveActiveCommitteeMember(member);
    }

    @DeleteMapping("/{suid}")
    public void deleteActiveCommitteeMember(@PathVariable int suid) {
        service.deleteActiveCommitteeMember(suid);
    }
}