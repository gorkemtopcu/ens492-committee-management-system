package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Member;
import com.commitee.commitee.Services.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> members = memberService.getAll();
        return new ResponseEntity<>(members, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Member> createMember(@RequestBody Member member) {
        Member savedMember = memberService.save(member);
        return new ResponseEntity<>(savedMember, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Member> updateMember(@RequestBody Member updatedMember) {
        Member member = memberService.getById(updatedMember.getSuid());
        if (member == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        member = member.copyWith(updatedMember);
        memberService.save(member);
        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
    }
}