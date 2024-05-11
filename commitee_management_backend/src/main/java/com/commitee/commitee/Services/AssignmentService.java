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

    public Map<String, List<CommitteesReportPayload>> getCommitteesWithMembersAndTerms(List<Integer> committees, List<Integer> terms) {
        List<Assignment> assignments = filterAssignments(committees, terms);
        Map<String, List<CommitteesReportPayload>> committeeMembersAndTermsMap = new HashMap<>();

        for (Assignment assignment : assignments) {
            String committee = committeeRepository.findById(assignment.getCommittee()).getCommittee();
            Member member = getMemberDetails(assignment.getMember());
            int term = assignment.getTerm();

            if (!committeeMembersAndTermsMap.containsKey(committee)) {
                committeeMembersAndTermsMap.put(committee, new ArrayList<CommitteesReportPayload>());
            }

            CommitteesReportPayload payload = (CommitteesReportPayload) committeeMembersAndTermsMap.get(committee);
            payload.setFacultyMember(member.getFullName());
            payload.setProgram(member.getProgram());

            if (payload.getTerms() == null) {
                payload.setTerms(new ArrayList<>());
            }
            payload.getTerms().add(term);
        }

        return committeeMembersAndTermsMap;
    }

    private List<Assignment> filterAssignments(List<Integer> committees, List<Integer> terms) {
        if (committees != null && terms != null) {
            return assignmentRepository.findByCommitteeInAndTermIn(committees, terms);
        } else if (committees != null) {
            return assignmentRepository.findByCommitteeIn(committees);
        } else if (terms != null) {
            return assignmentRepository.findByTermIn(terms);
        } else {
            return assignmentRepository.findAll();
        }
    }

    private Member getMemberDetails(Integer memberId) {
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        return optionalMember.orElse(null);
    }
}