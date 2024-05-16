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
    private ActiveCommitteeMemberService activeCommitteeMemberService;

    @GetMapping("/getAll")
    public List<ActiveCommitteeMember> getAllActiveCommitteeMembers() {
        return activeCommitteeMemberService.getAll();
    }

    @GetMapping("/getById/{suid}")
    public ActiveCommitteeMember getActiveCommitteeMemberById(@PathVariable int suid) {
        return activeCommitteeMemberService.getById(suid);
    }

    @PostMapping("/add")
    public ActiveCommitteeMember createActiveCommitteeMember(@RequestBody ActiveCommitteeMember member) {
        return activeCommitteeMemberService.save(member);
    }

    @DeleteMapping("/{suid}")
    public void deleteActiveCommitteeMember(@PathVariable int suid) {
        activeCommitteeMemberService.deleteById(suid);
    }
}