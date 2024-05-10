package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Payload.TermsCommitteesPayload;
import com.commitee.commitee.Services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/assignments")
public class AssignmentController {
    private final AssignmentService assignmentService;

    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Assignment>> getAllAssignments() {
        List<Assignment> assignments = assignmentService.getAllAssignments();
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@RequestBody Assignment assignment) {
        Assignment savedAssignment = assignmentService.saveAssignment(assignment);
        return new ResponseEntity<>(savedAssignment, HttpStatus.CREATED);
    }

    @PostMapping("/search")
    public ResponseEntity<List<Assignment>> searchAssignmentsByTermsAndCommittees(@RequestBody TermsCommitteesPayload termsCommitteesPayload) {
        List<Assignment> assignments = assignmentService.searchAssignmentsByTermsAndCommittees(
                termsCommitteesPayload.getTerms().stream().map(Integer::parseInt).toList(),
                termsCommitteesPayload.getCommittees().stream().map(Integer::parseInt).toList());
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }
}