package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Repositories.CommitteeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommitteeService {
    private final CommitteeRepository committeeRepository;

    @Autowired
    public CommitteeService(CommitteeRepository committeeRepository) {
        this.committeeRepository = committeeRepository;
    }

    public List<Committee> getAllCommittees() {
        return committeeRepository.findAll();
    }

    public Committee saveCommittee(Committee committee) {
        return committeeRepository.save(committee);
    }

    // Other methods for updating and deleting committees can be added here
}
