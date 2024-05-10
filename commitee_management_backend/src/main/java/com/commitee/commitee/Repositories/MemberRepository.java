package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    // You can add custom query methods here if needed
}
