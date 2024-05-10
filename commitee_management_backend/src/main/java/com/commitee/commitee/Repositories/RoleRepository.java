package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    // You can add custom query methods here if needed
}
