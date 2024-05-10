package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Config;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfigRepository extends JpaRepository<Config, Long> {
    // You can add custom query methods here if needed
}
