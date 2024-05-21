package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.dto.CommitteesDTO;
import com.commitee.commitee.dto.ProgramInstructorDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByTerm(Integer term);

    List<Assignment> findByCommitteeInAndTermIn(List<Integer> committees, List<Integer> terms);

    List<Assignment> findByTermIn(List<Integer> terms);

    @Query("SELECT new com.commitee.commitee.dto.ProgramInstructorDTO(m.fullName, m.program, c.committee, a.term) " +
            "FROM Assignment a " +
            "JOIN Member m ON a.member = m.suid " +
            "JOIN Committee c ON a.committee = c.id " +
            "WHERE a.term IN :terms AND m.program IN :programs")
    List<ProgramInstructorDTO> getInstructorByProgramAndTerm(@Param("programs") List<String> programs, @Param("terms") List<Integer> terms);


    @Query("SELECT new com.commitee.commitee.dto.CommitteesDTO(m.fullName, m.program, c.committee, a.term) " +
            "FROM Assignment a " +
            "JOIN Member m ON a.member = m.suid " +
            "JOIN Committee c ON a.committee = c.id " +
            "WHERE c.committee IN :committees AND a.term IN :terms")
    List<CommitteesDTO> getCommitteeByProgramAndTerm(@Param("committees") List<String> committees, @Param("terms") List<Integer> terms);

}

