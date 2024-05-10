package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    // You can add custom query methods here if needed
}