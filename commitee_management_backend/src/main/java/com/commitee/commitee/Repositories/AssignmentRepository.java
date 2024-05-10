package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    // You can add custom query methods here if needed
}