package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.MailingList;
import com.commitee.commitee.Entities.Meeting;
import com.commitee.commitee.Repositories.MailingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MailingListService {
    private final MailingListRepository mailingListRepository;

    @Autowired
    public MailingListService(MailingListRepository mailingListRepository) {
        this.mailingListRepository = mailingListRepository;
    }

    public List<MailingList> getAll() {
        return mailingListRepository.findAll();
    }

    public MailingList save(MailingList mailingList) {
        return mailingListRepository.save(mailingList);
    }

    // Other methods for updating and deleting mailing lists can be added here

    public List<MailingList> findByTerm(String term) {
        return mailingListRepository.findByTerm(term);
    }
}