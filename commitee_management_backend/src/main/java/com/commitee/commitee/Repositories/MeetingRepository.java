package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Meeting;
import com.commitee.commitee.dto.MeetingDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    // You can add custom query methods here if needed
    List<Meeting> findByTerm(String term);

    @Query("SELECT new com.commitee.commitee.dto.MeetingDTO(m.id, c.committee, m.date, m.place, m.participants, " +
            "       m.guests, m.subject, m.decisions, m.attachment, m.term, m.nextMeetingDate, " +
            "       mem.fullName, m.createdAt) " +
            "FROM Meeting m " +
            "JOIN Committee c ON m.committee = c.id " +
            "JOIN Member mem ON m.createdBy = mem.suid " +
            "WHERE c.committee IN :committees AND m.term IN :terms")
    List<MeetingDTO> getMeetingByCommitteeAndTerm(@Param("committees") List<String> committees, @Param("terms") List<Integer> terms);
}