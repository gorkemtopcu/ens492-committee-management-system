package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.CommitteeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommitteeCategoryRepository extends JpaRepository<CommitteeCategory, Long> {
    // You can add custom query methods here if needed
}