package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.dto.CommitteeAnnouncementDTO;
import com.commitee.commitee.dto.CommitteesDTO;
import com.commitee.commitee.dto.ProgramInstructorDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCommitteeInAndTermIn(List<Integer> committees, List<Integer> terms);

    @Query("SELECT new com.commitee.commitee.dto.ProgramInstructorDTO(m.fullName, m.program, c.committee, a.term) " +
            "FROM Assignment a " +
            "JOIN Member m ON a.member = m.suid " +
            "JOIN Committee c ON a.committee = c.id " +
            "WHERE a.term = :term")
    List<ProgramInstructorDTO> getInstructorByTerm(@Param("term") Integer term);


    @Query("SELECT new com.commitee.commitee.dto.CommitteeAnnouncementDTO(m.fullName, m.program, c.committee, a.term, r.role, r.order) " +
            "FROM Assignment a " +
            "JOIN Member m ON a.member = m.suid " +
            "JOIN Committee c ON a.committee = c.id " +
            "JOIN Role r ON a.role = r.id " +
            "WHERE a.term = :term")
    List<CommitteeAnnouncementDTO> getInstructorWithInfoByTerm(@Param("term") Integer term);


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
    List<CommitteesDTO> getByCommitteeAndTerm(@Param("committees") List<String> committees, @Param("terms") List<Integer> terms);

    @Query("SELECT new com.commitee.commitee.dto.CommitteesDTO(m.fullName, m.program, c.committee, a.term) " +
            "FROM Assignment a " +
            "JOIN Member m ON a.member = m.suid " +
            "JOIN Committee c ON a.committee = c.id " +
            "WHERE c.committee = :committee AND a.term = :term")
    List<Assignment> findByCommitteeAndTerm(String committee, String term);

    @Query("SELECT new com.commitee.commitee.Entities.Committee(c.id, c.committee, c.category, c.about, c.emailListAddress, c.createdAt)" +
            "FROM Assignment a " +
            "JOIN Member m ON a.member = m.suid " +
            "JOIN Committee c ON a.committee = c.id " +
            "WHERE m.suid = :member")
    List<Committee> getCommitteesByMember(@Param("member") Integer member);

    Assignment findByCommitteeAndMemberAndTerm(int committee, Integer member, Integer term);

    List<Assignment> findByTerm(Integer fromTerm);
}

