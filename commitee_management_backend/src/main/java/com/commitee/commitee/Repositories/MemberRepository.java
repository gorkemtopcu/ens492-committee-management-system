package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    // You can add custom query methods here if needed
    Member findBySuid(Integer suid);

    Member findByFullName(String fullName);
}
