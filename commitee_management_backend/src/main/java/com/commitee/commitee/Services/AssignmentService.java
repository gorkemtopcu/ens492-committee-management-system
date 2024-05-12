package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Entities.MailingList;
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
    private final CommitteeRepository committeeRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository, CommitteeRepository committeeRepository, MemberRepository memberRepository) {
        this.assignmentRepository = assignmentRepository;
        this.committeeRepository = committeeRepository;
        this.memberRepository = memberRepository;
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment saveAssignment(Assignment assignment) {
        assignment.setCreatedAt(LocalDateTime.now());
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> findByTerm(Integer term) {return assignmentRepository.findByTerm(term);}


    public Map<Integer, Map<Integer, CommitteesReportPayload>> getCommitteesWithMembersAndTerms(List<Integer> committees, List<Integer> terms) {
        List<Assignment> assignments = assignmentRepository.findByCommitteeInAndTermIn(committees, terms);
        Map<Integer, Map<Integer, CommitteesReportPayload>> groupedAssignments = new HashMap<>();

        for (Assignment assignment : assignments) {
            int committeeId = assignment.getCommittee();
            int memberId = assignment.getMember();
            int term = assignment.getTerm();
            Committee committee = committeeRepository.findById(committeeId);
            Member member = memberRepository.findBySuid(memberId);

            // Check if the payload for the committee and member already exists
            if (!groupedAssignments.containsKey(committeeId)) {
                groupedAssignments.put(committeeId, new HashMap<>());
            }
            Map<Integer, CommitteesReportPayload> memberMap = groupedAssignments.get(committeeId);

            if (!memberMap.containsKey(memberId)) {
                // If the payload does not exist, create a new one
                CommitteesReportPayload instance = new CommitteesReportPayload(committee, member, new ArrayList<>());
                memberMap.put(memberId, instance);
            }

            // Add the term to the existing payload's terms list
            CommitteesReportPayload payload = memberMap.get(memberId);
            payload.getTerms().add(term);
        }

        return groupedAssignments;
    }


    public Map<Integer, Map<Integer, CommitteesReportPayload>> getAllCommitteesWithMembersAndTerms(List<Integer> terms) {
        List<Assignment> assignments = assignmentRepository.findByTermIn(terms);
        Map<Integer, Map<Integer, CommitteesReportPayload>> groupedAssignments = new HashMap<>();

        for (Assignment assignment : assignments) {
            int committeeId = assignment.getCommittee();
            int memberId = assignment.getMember();
            int term = assignment.getTerm();
            Committee committee = committeeRepository.findById(committeeId);
            Member member = memberRepository.findBySuid(memberId);

            // Check if the payload for the committee and member already exists
            if (!groupedAssignments.containsKey(committeeId)) {
                groupedAssignments.put(committeeId, new HashMap<>());
            }
            Map<Integer, CommitteesReportPayload> memberMap = groupedAssignments.get(committeeId);

            if (!memberMap.containsKey(memberId)) {
                // If the payload does not exist, create a new one
                CommitteesReportPayload instance = new CommitteesReportPayload(committee, member, new ArrayList<>());
                memberMap.put(memberId, instance);
            }

            // Add the term to the existing payload's terms list
            CommitteesReportPayload payload = memberMap.get(memberId);
            payload.getTerms().add(term);
        }

        return groupedAssignments;
    }




}