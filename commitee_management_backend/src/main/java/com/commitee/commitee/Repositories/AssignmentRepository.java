package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCommitteeInAndTermIn(Collection<Integer> term, Collection<Integer> committee);
    List<Assignment> findByTermIn(Collection<Integer> term);
    List<Assignment> findByCommitteeIn(Collection<Integer> committee);
}