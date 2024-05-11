package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByCommitteeInAndTermIn(List<Integer> committees,List<Integer> terms);
}