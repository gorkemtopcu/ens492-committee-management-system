package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.Repositories.MemberTrackingSystem.RetirementRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RetirementRequestService {

    @Autowired
    private RetirementRequestRepository repository;

    public List<RetirementRequest> getAll() {
        return repository.findAll();
    }

    public RetirementRequest getById(int requestId) {
        return repository.findById(requestId).orElse(null);
    }

    public RetirementRequest save(RetirementRequest request) {
        return repository.save(request);
    }

    public void deleteById(int requestId) {
        repository.deleteById(requestId);
    }
}