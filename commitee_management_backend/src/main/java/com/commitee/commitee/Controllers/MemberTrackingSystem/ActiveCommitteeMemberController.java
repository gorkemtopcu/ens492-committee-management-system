package com.commitee.commitee.Controllers.MemberTrackingSystem;

import com.commitee.commitee.dto.ActiveCommitteeMemberDTO;
import com.commitee.commitee.Entities.MemberTrackingSystem.ActiveCommitteeMember;
import com.commitee.commitee.Requests.ActiveMemberRequest;
import com.commitee.commitee.Services.MemberService;
import com.commitee.commitee.Services.MemberTrackingSystem.ActiveCommitteeMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/active-committee-members")
public class ActiveCommitteeMemberController {

    @Autowired
    private ActiveCommitteeMemberService activeCommitteeMemberService;
    @Autowired
    private MemberService memberService;

    @GetMapping("/getAll")
    public List<ActiveCommitteeMemberDTO> getAllActiveCommitteeMembers() {
        return activeCommitteeMemberService.getAllActiveCommitteeMembersWithDetails();
    }

    @GetMapping("/getById/{suid}")
    public ActiveCommitteeMember getActiveCommitteeMemberById(@PathVariable int suid) {
        return activeCommitteeMemberService.getById(suid);
    }

    @PostMapping("/add")
    public ResponseEntity<ActiveCommitteeMember> createActiveCommitteeMember(@RequestBody ActiveMemberRequest request) {
        if (memberService.getById(request.getSuid()) == null) {
            return ResponseEntity.notFound().build();
        }

        ActiveCommitteeMember newMember = new ActiveCommitteeMember();
        newMember.setSuid(request.getSuid());
        newMember.setDuration(request.getDuration());
        newMember.setCreatedAt(LocalDateTime.now());

        ActiveCommitteeMember savedMember = activeCommitteeMemberService.save(newMember);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }

    @DeleteMapping("/deleteById/{suid}")
    public ResponseEntity<Optional<ActiveCommitteeMember>> deleteActiveCommitteeMember(@PathVariable int suid) {
        Optional<ActiveCommitteeMember> member = Optional.ofNullable(activeCommitteeMemberService.getById(suid));
        if (member.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        activeCommitteeMemberService.deleteById(suid);
        return ResponseEntity.ok(member);
    }

    @DeleteMapping("/retirementRequestById/{suid}")
    public ResponseEntity<Optional<ActiveCommitteeMember>> retirementRequestById(@PathVariable int suid) {
        Optional<ActiveCommitteeMember> member = Optional.ofNullable(activeCommitteeMemberService.getById(suid));
        if (member.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        activeCommitteeMemberService.retirementRequestById(suid);
        return ResponseEntity.ok(member);
    }

}