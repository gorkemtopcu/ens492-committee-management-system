package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Exception.CommitteeNotFoundException;
import com.commitee.commitee.Repositories.CommitteeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommitteeService {
    private final CommitteeRepository committeeRepository;

    @Autowired
    public CommitteeService(CommitteeRepository committeeRepository) {
        this.committeeRepository = committeeRepository;
    }

    public List<Committee> getAll() {
        return committeeRepository.findAll();
    }
    public Committee save(Committee committee) {
        return committeeRepository.save(committee);
    }
    public Optional<Committee> findById(Long id) {
        return committeeRepository.findById(id);
    }

    public Committee getById(Long id) {
        Optional<Committee> userOptional = committeeRepository.findById(id);

        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new CommitteeNotFoundException("Committee not found with ID: " + id);
        }
    }
    public Committee delete(Long id) {
        Committee committee = getById(id);
        committeeRepository.deleteById(id);
        return committee;

    }

    public Committee update(Committee committee) {
        if (committee.getId() == null) {
            throw new IllegalArgumentException("Committee ID cannot be null");
        }
        Optional<Committee> existingCommitteeOptional = committeeRepository.findById(committee.getId());
        if (existingCommitteeOptional.isPresent()) {
            Committee existingCommittee = existingCommitteeOptional.get();
            // Update the fields of the existing committee with the new values
            existingCommittee.setCommittee(committee.getCommittee());
            existingCommittee.setCategory(committee.getCategory());
            existingCommittee.setAbout(committee.getAbout());
            existingCommittee.setEmailListAddress(committee.getEmailListAddress());
            existingCommittee.setCreatedAt(committee.getCreatedAt());
            // Save the updated committee
            return committeeRepository.save(existingCommittee);
        } else {
            throw new CommitteeNotFoundException("Committee not found with ID: " + committee.getId());
        }
    }



    // Other methods for updating and deleting committees can be added here
}
