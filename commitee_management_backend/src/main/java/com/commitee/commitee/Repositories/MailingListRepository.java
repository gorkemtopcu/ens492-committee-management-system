package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.MailingList;
import com.commitee.commitee.Entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MailingListRepository extends JpaRepository<MailingList, Long> {
    // You can add custom query methods here if needed

    List<MailingList> findByTerm(String term);
}