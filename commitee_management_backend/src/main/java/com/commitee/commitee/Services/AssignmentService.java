package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Entities.Member;
import com.commitee.commitee.Payload.*;
import com.commitee.commitee.Repositories.AssignmentRepository;
import com.commitee.commitee.Repositories.CommitteeRepository;
import com.commitee.commitee.Repositories.MemberRepository;
import com.commitee.commitee.dto.CommitteeAnnouncementDTO;
import com.commitee.commitee.dto.CommitteesDTO;
import com.commitee.commitee.dto.ProgramInstructorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public List<AssignmentPayload> findByTerm(Integer term) {
        List<ProgramInstructorDTO> dto = assignmentRepository.getInstructorByTerm(term);

        //Group by committee
        Map<String, AssignmentPayload> groupedAssignments = new HashMap<>();
        //Instructor with their program

        for (ProgramInstructorDTO instructor : dto) {
            String committee = instructor.getCommittee();
            String fullName = instructor.getFullName();
            String program = instructor.getProgram();

            //If the committee does not exist in the map, add it
            groupedAssignments.putIfAbsent(committee, new AssignmentPayload(committee, new ArrayList<>()));

            //Get the committee payload
            AssignmentPayload committeePayload = groupedAssignments.get(committee);

            //Find the instructor in the committee payload
            AssignmentPayload.Instructor instructorPayload = committeePayload.getInstructors()
                    .stream()
                    .filter(i -> i.getFullName().equals(fullName))
                    .findFirst()
                    .orElse(null);

            //If the instructor does not exist, create and add them
            if (instructorPayload == null) {
                instructorPayload = new AssignmentPayload.Instructor(fullName, program);
                committeePayload.getInstructors().add(instructorPayload);
            }
        }
        return new ArrayList<>(groupedAssignments.values());
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


    public List<CommitteeTermPayload> getByCommitteeAndTerm(List<String> committees, List<Integer> terms) {
        List<CommitteesDTO> committeesDTOS = assignmentRepository.getByCommitteeAndTerm(committees, terms);
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

    public List<CommitteeAnnouncementPayload> getInstructorWithInfoByTerm(Integer term) {
        // Map the committee to their instructors
        List<CommitteeAnnouncementDTO> instructors = assignmentRepository.getInstructorWithInfoByTerm(term);
        Map<String, CommitteeAnnouncementPayload> groupedPrograms = new HashMap<>();

        // Group by committee
        for (CommitteeAnnouncementDTO instructor : instructors) {
            String committee = instructor.getCommittee();
            String fullName = instructor.getFullName();
            String role = instructor.getRole();
            String program = instructor.getProgram();
            int order = instructor.getOrder();

            // If the committee does not exist in the map, add it
            if (!groupedPrograms.containsKey(committee)) {
                groupedPrograms.put(committee, new CommitteeAnnouncementPayload(committee, new ArrayList<>()));
            }

            // Get the committee payload
            CommitteeAnnouncementPayload committeePayload = groupedPrograms.get(committee);

            // Find the instructor in the committee payload
            CommitteeAnnouncementPayload.Instructor instructorPayload = committeePayload.getInstructors()
                    .stream()
                    .filter(i -> i.getFullName().equals(fullName))
                    .findFirst()
                    .orElse(null);

            // If the instructor does not exist, create and add them
            if (instructorPayload == null) {
                instructorPayload = new CommitteeAnnouncementPayload.Instructor(fullName, term, program, role, order);
                committeePayload.getInstructors().add(instructorPayload);
            } else {
                // If the instructor exists, update their information
                instructorPayload.setTerm(term);
                instructorPayload.setRole(role);
                instructorPayload.setOrder(order);
                instructorPayload.setProgram(program);
            }
        }

        return new ArrayList<>(groupedPrograms.values());
    }

    public List<Assignment> findByCommitteeAndTerm(String committee, String term) {
        return assignmentRepository.findByCommitteeAndTerm(committee, term);
    }

    public List<Committee> getCommitteesByMember(Integer member) {
        return assignmentRepository.getCommitteesByMember(member);
    }

    public Assignment deleteAssignment(String committeeName, String instructor, Integer term) {
        Committee committee = committeeRepository.findByCommittee(committeeName);
        if (committee == null) {
            return null;
        }
        Member member = memberRepository.findByFullName(instructor);
        if (member == null) {
            return null;
        }
        Assignment assignment = assignmentRepository.findByCommitteeAndMemberAndTerm(Math.toIntExact(committee.getId()), member.getSuid(), term);
        if (assignment == null) {
            return null;
        }
        assignmentRepository.delete(assignment);
        return assignment;
    }

    public ResponseEntity<Assignment> addAssignment(Integer committeeId, Integer suid, Integer term, Integer role) {
        Committee committee = committeeRepository.findById(committeeId);
        if (committee == null) {
            return ResponseEntity.notFound().build();
        }

        Member member = memberRepository.findBySuid(suid);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }

        Assignment existingAssignment = assignmentRepository.findByCommitteeAndMemberAndTerm(Math.toIntExact(committee.getId()), member.getSuid(), term);
        if (existingAssignment != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        Assignment newAssignment = new Assignment();
        newAssignment.setCommittee(Math.toIntExact(committee.getId()));
        newAssignment.setMember(member.getSuid());
        newAssignment.setTerm(term);
        newAssignment.setCreatedAt(LocalDateTime.now());
        newAssignment.setRole(role);
        newAssignment.setPrograms(null);

        Assignment savedAssignment = assignmentRepository.save(newAssignment);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAssignment);
    }

    public ResponseEntity<?> duplicateTerm(Integer fromTerm, Integer toTerm) {
        if(fromTerm.equals(toTerm)) {
            return ResponseEntity.badRequest().body("Cannot duplicate to the same term");
        }

        if(fromTerm > toTerm) {
            return ResponseEntity.badRequest().body("Cannot duplicate to a term that is greater than the current term");
        }
        List<Assignment> assignments = assignmentRepository.findByTerm(fromTerm);
        List<Assignment> existingAssignments = assignmentRepository.findByTerm(toTerm);

        if(existingAssignments != null && !existingAssignments.isEmpty()) {
            return ResponseEntity.badRequest().body("Cannot duplicate to a term that already has assignments");
        }

        for(Assignment assignment : assignments) {
            Assignment newAssignment = new Assignment();
            newAssignment.setCommittee(assignment.getCommittee());
            newAssignment.setMember(assignment.getMember());
            newAssignment.setTerm(toTerm);
            newAssignment.setCreatedAt(LocalDateTime.now());
            newAssignment.setRole(assignment.getRole());
            newAssignment.setPrograms(assignment.getPrograms());
            assignmentRepository.save(newAssignment);
        }
       return ResponseEntity.ok(assignments);
    }
}



