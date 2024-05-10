package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Repositories.AssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

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

    public List<Assignment> searchAssignmentsByTermsAndCommittees(Collection<Integer> terms, Collection<Integer> committees) {
        if (terms == null && committees == null) {
            return Collections.emptyList();
        }

        if (terms != null && committees != null) {
            // Search by both terms and committees
            return assignmentRepository.findByTermInAndCommitteeIn(terms, committees);
        } else if (terms != null) {
            // Search only by terms
            return assignmentRepository.findByTermIn(terms);
        } else {
            // Search only by committees
            return assignmentRepository.findByCommitteeIn(committees);
        }
    }
}