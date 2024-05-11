package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Entities.Member;
import com.commitee.commitee.Payload.CommitteesReportPayload;
import com.commitee.commitee.Services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/getCommitteesWithMembersAndTerms")
    public ResponseEntity<Map<Integer, CommitteesReportPayload>> getCommitteesWithMembersAndTerms(
            @RequestParam(value = "committees", required = false) List<Integer> committees,
            @RequestParam(value = "terms", required = false) List<Integer> terms) {
        Map<String, List<CommitteesReportPayload>> committeesWithMembersAndTerms = assignmentService.getCommitteesWithMembersAndTerms(committees, terms);
        return null;
    }
}