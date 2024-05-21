package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Payload.CommitteeAssignmentPayload;
import com.commitee.commitee.Payload.CommitteeTermPayload;
import com.commitee.commitee.Payload.CommitteesReportPayload;
import com.commitee.commitee.Payload.ProgramInstructorPayload;
import com.commitee.commitee.Services.AssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        List<Assignment> assignments = assignmentService.getAll();
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
        Map<Integer, Map<Integer, CommitteesReportPayload>> groupedAssignments = assignmentService
                .getCommitteesWithMembersAndTerms(committees, terms);
        return new ResponseEntity<>(groupedAssignments, HttpStatus.OK);
    }

    @GetMapping("/getAllCommitteesWithMembersAndTerms")
    public ResponseEntity<?> getCommitteesWithMembersAndTerms(@RequestParam(value = "terms") List<Integer> terms) {
        Map<Integer, Map<Integer, CommitteesReportPayload>> groupedAssignments = assignmentService
                .getAllCommitteesWithMembersAndTerms(terms);
        return new ResponseEntity<>(groupedAssignments, HttpStatus.OK);
    }

    @GetMapping("/getInstructorByProgramAndTerm")
    public ResponseEntity<List<ProgramInstructorPayload>> getInstructorByProgramAndTerm(
            @RequestParam(value = "programs") List<String> program, @RequestParam(value = "terms") List<Integer> terms) {
        List<ProgramInstructorPayload> result = assignmentService.getInstructorByProgramAndTerm(program, terms);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("/getByCommitteeAndTerm")
    public ResponseEntity<List<CommitteeTermPayload>> getByCommitteeAndTerm(
            @RequestParam(value = "committees") List<String> committees, @RequestParam(value = "terms")  List<Integer> terms) {
        List<CommitteeTermPayload> result = assignmentService.getByCommitteeAndTerm(committees, terms);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("/getCommitteeAssignment")
    public ResponseEntity<List<CommitteeAssignmentPayload>> getCommitteeAssignment(
            @RequestParam(value = "programs") List<String> program, @RequestParam(value = "terms") List<Integer> terms) {
        List<CommitteeAssignmentPayload> result = assignmentService.getCommitteeAssignment(program, terms);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }




}