package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Entities.Member;
import com.commitee.commitee.Payload.CommitteesReportPayload;
import com.commitee.commitee.Repositories.AssignmentRepository;
import com.commitee.commitee.Repositories.CommitteeRepository;
import com.commitee.commitee.Repositories.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final MemberRepository memberRepository;
    private final CommitteeRepository committeeRepository;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository, MemberRepository memberRepository, CommitteeRepository committeeRepository) {
        this.assignmentRepository = assignmentRepository;
        this.memberRepository = memberRepository;
        this.committeeRepository = committeeRepository;
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment saveAssignment(Assignment assignment) {
        assignment.setCreatedAt(LocalDateTime.now());
        return assignmentRepository.save(assignment);
    }

    public List<CommitteesReportPayload> getCommitteesWithMembersAndTerms(List<Integer> terms, List<Integer> committees) {
        return assignmentRepository.findCommitteesWithMembersAndTerms(terms, committees);
    }
}