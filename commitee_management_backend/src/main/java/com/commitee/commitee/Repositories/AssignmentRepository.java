package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Assignment;
import com.commitee.commitee.Payload.CommitteesReportPayload;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    @Query(value = "SELECT a.committee AS committee_id, m.full_name AS faculty_member, m.program AS program, GROUP_CONCAT(a.term) AS terms " +
            "FROM assigment a " +
            "JOIN member m ON a.member = m.suid " +
            "WHERE a.term IN ?1 AND a.committee IN ?2 " +
            "GROUP BY a.committee, m.full_name, m.program", nativeQuery = true)
    List<CommitteesReportPayload> findCommitteesWithMembersAndTerms(List<Integer> terms, List<Integer> committees);
}