package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Assignment;
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

    @Autowired
    public AssignmentService(AssignmentRepository assignmentRepository) {
        this.assignmentRepository = assignmentRepository;
    }

    public List<Assignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public Assignment saveAssignment(Assignment assignment) {
        assignment.setCreatedAt(LocalDateTime.now());
        return assignmentRepository.save(assignment);
    }

    public Map<Integer, Map<Integer, List<Assignment>>> getCommitteesWithMembersAndTerms(List<Integer> committees, List<Integer> terms) {
        List<Assignment> assignments = assignmentRepository.findByCommitteeInAndTermIn(committees, terms);
        Map<Integer, Map<Integer, List<Assignment>>> groupedAssignments = new HashMap<>();

        for (Assignment assignment : assignments) {
            int committeeId = assignment.getCommittee();
            int memberId = assignment.getMember(); // Assuming you have a method to get the member ID

            groupedAssignments.computeIfAbsent(committeeId, k -> new HashMap<>())
                    .computeIfAbsent(memberId, k -> new ArrayList<>())
                    .add(assignment);
        }

        return groupedAssignments;
    }
}