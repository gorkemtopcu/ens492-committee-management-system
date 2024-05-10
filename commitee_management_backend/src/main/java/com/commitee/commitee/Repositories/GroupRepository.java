package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    // You can add custom query methods here if needed
}

