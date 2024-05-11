package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Committee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommitteeRepository extends JpaRepository<Committee, Long> {
    // You can add custom query methods here if needed
    Committee findById(Integer id);
}
