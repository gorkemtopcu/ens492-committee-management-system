package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Entities.MailingList;
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

    @GetMapping("/findByTerm/{term}")
    public ResponseEntity<List<Assignment>> findByTerm(@PathVariable Integer term) {
        List<Assignment> assignments = assignmentService.findByTerm(term);
        return new ResponseEntity<>(assignments, HttpStatus.OK);
    }

    @GetMapping("/getCommitteesWithMembersAndTerms")
    public ResponseEntity<?> getCommitteesWithMembersAndTerms(
            @RequestParam(value = "committees", required = false) List<Integer> committees,
            @RequestParam(value = "terms", required = false) List<Integer> terms) {
        Map<Integer, Map<Integer, CommitteesReportPayload>> groupedAssignments = assignmentService.getCommitteesWithMembersAndTerms(committees, terms);
        return new ResponseEntity<>(groupedAssignments, HttpStatus.OK);
    }

    @GetMapping("/getAllCommitteesWithMembersAndTerms")
    public ResponseEntity<?> getCommitteesWithMembersAndTerms(@RequestParam(value = "terms") List<Integer> terms) {
        Map<Integer, Map<Integer, CommitteesReportPayload>> groupedAssignments = assignmentService.getAllCommitteesWithMembersAndTerms(terms);
        return new ResponseEntity<>(groupedAssignments, HttpStatus.OK);
    }




}