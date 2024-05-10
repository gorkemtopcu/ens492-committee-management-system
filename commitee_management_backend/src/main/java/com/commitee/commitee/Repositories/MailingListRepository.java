package com.commitee.commitee.Repositories;

import com.commitee.commitee.Entities.MailingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MailingListRepository extends JpaRepository<MailingList, Long> {
    List<MailingList> findByTerm(String term);
}