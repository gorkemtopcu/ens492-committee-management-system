package com.commitee.commitee.Repositories;
import com.commitee.commitee.Entities.Program;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProgramRepository extends JpaRepository<Program, String> {
    // You can add custom query methods here if needed
}
