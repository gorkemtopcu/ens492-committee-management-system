package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Entities.Member;
import com.commitee.commitee.Payload.CommitteeAssignmentPayload;
import com.commitee.commitee.Payload.CommitteeTermPayload;
import com.commitee.commitee.Payload.CommitteesReportPayload;
import com.commitee.commitee.Payload.ProgramInstructorPayload;
import com.commitee.commitee.Repositories.AssignmentRepository;
import com.commitee.commitee.Repositories.CommitteeRepository;
import com.commitee.commitee.Repositories.MemberRepository;
import com.commitee.commitee.dto.CommitteesDTO;
import com.commitee.commitee.dto.ProgramInstructorDTO;
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
    public AssignmentService(AssignmentRepository assignmentRepository, CommitteeRepository committeeRepository,
            MemberRepository memberRepository) {
        this.assignmentRepository = assignmentRepository;
        this.committeeRepository = committeeRepository;
        this.memberRepository = memberRepository;
    }

    public List<Assignment> getAll() {
        return assignmentRepository.findAll();
    }

    public Assignment saveAssignment(Assignment assignment) {
        assignment.setCreatedAt(LocalDateTime.now());
        return assignmentRepository.save(assignment);
    }

    public List<Assignment> findByTerm(Integer term) {
        return assignmentRepository.findByTerm(term);
    }

    public Map<Integer, Map<Integer, CommitteesReportPayload>> getCommitteesWithMembersAndTerms(
            List<Integer> committees, List<Integer> terms) {
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

    public Map<Integer, Map<Integer, CommitteesReportPayload>> getAllCommitteesWithMembersAndTerms(
            List<Integer> terms) {
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


    public List<ProgramInstructorPayload> getInstructorByProgramAndTerm(List<String> programs, List<Integer> terms) {
        List<ProgramInstructorDTO> instructors = assignmentRepository.getInstructorByProgramAndTerm(programs, terms);
        Map<String, ProgramInstructorPayload> groupedInstructors = new HashMap<>();

        for (ProgramInstructorDTO instructor : instructors) {
            String program = instructor.getProgram();
            String fullName = instructor.getFullName();
            String committee = instructor.getCommittee();
            int term = instructor.getTerm();

            // Group by program
            groupedInstructors.computeIfAbsent(program, k -> new ProgramInstructorPayload(program, new ArrayList<>()));

            ProgramInstructorPayload programInstructorPayload = groupedInstructors.get(program);

            // Group by instructor within the program
            ProgramInstructorPayload.Instructor instructorPayload = programInstructorPayload.getInstructors().stream()
                    .filter(i -> i.getFullName().equals(fullName))
                    .findFirst()
                    .orElseGet(() -> {
                        ProgramInstructorPayload.Instructor newInstructor = new ProgramInstructorPayload.Instructor(fullName, new ArrayList<>());
                        programInstructorPayload.getInstructors().add(newInstructor);
                        return newInstructor;
                    });

            // Group by committee within the instructor
            ProgramInstructorPayload.Instructor.CommitteeTerm committeeTerm = instructorPayload.getCommittees().stream()
                    .filter(c -> c.getCommittee().equals(committee))
                    .findFirst()
                    .orElseGet(() -> {
                        ProgramInstructorPayload.Instructor.CommitteeTerm newCommittee = new ProgramInstructorPayload.Instructor.CommitteeTerm(committee, new ArrayList<>());
                        instructorPayload.getCommittees().add(newCommittee);
                        return newCommittee;
                    });

            // Add term to the committee
            if (!committeeTerm.getTerms().contains(term)) {
                committeeTerm.getTerms().add(term);
            }
        }

        return new ArrayList<>(groupedInstructors.values());
    }


    public List<CommitteeTermPayload> getCommitteeByProgramAndTerm(List<String> committee, List<Integer> terms) {
        List<CommitteesDTO> committeesDTOS = assignmentRepository.getCommitteeByProgramAndTerm(committee, terms);
        Map<String, CommitteeTermPayload> groupedCommittees = new HashMap<>();

        // Group by committee
        for (CommitteesDTO dto : committeesDTOS) {
            String committeeName = dto.getCommittee();
            String fullName = dto.getFullName();
            int term = dto.getTerm();

            // If the committee does not exist in the map, add it
            groupedCommittees.putIfAbsent(committeeName, new CommitteeTermPayload(committeeName, new ArrayList<>()));

            // Get the committee payload
            CommitteeTermPayload committeePayload = groupedCommittees.get(committeeName);

            // Find the instructor in the committee payload
            CommitteeTermPayload.Instructor instructorPayload = committeePayload.getInstructors()
                    .stream()
                    .filter(i -> i.getFullName().equals(fullName))
                    .findFirst()
                    .orElse(null);

            // If the instructor does not exist, create and add them
            if (instructorPayload == null) {
                instructorPayload = new CommitteeTermPayload.Instructor(fullName, new ArrayList<>());
                committeePayload.getInstructors().add(instructorPayload);
            }

            // Add the term to the instructor's list of terms
            instructorPayload.getTerms().add(String.valueOf(term));
        }

        return new ArrayList<>(groupedCommittees.values());
    }

    public List<CommitteeAssignmentPayload> getCommitteeAssignment(List<String> programs, List<Integer> terms) {
        List<ProgramInstructorDTO> instructors = assignmentRepository.getInstructorByProgramAndTerm(programs, terms);
        Map<String, CommitteeAssignmentPayload> groupedPrograms = new HashMap<>();

        // Group by program
        for (ProgramInstructorDTO instructor : instructors) {
            String program = instructor.getProgram();
            String fullName = instructor.getFullName();
            String committee = instructor.getCommittee();

            // If the program does not exist in the map, add it
            groupedPrograms.putIfAbsent(program, new CommitteeAssignmentPayload(program, new ArrayList<>()));

            // Get the program payload
            CommitteeAssignmentPayload programPayload = groupedPrograms.get(program);

            // Find the instructor in the program payload
            CommitteeAssignmentPayload.Instructor instructorPayload = programPayload.getInstructors()
                    .stream()
                    .filter(i -> i.getFullName().equals(fullName))
                    .findFirst()
                    .orElse(null);

            // If the instructor does not exist, create and add them
            if (instructorPayload == null) {
                instructorPayload = new CommitteeAssignmentPayload.Instructor(fullName, new ArrayList<>());
                programPayload.getInstructors().add(instructorPayload);
            }

            // Add the committee to the instructor's list of committees if not already present
            if (!instructorPayload.getCommittees().contains(committee)) {
                instructorPayload.getCommittees().add(committee);
            }
        }

        return new ArrayList<>(groupedPrograms.values());
    }
}



