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

    public List<RetirementRequest> getAllRetirementRequests() {
        return repository.findAll();
    }

    public RetirementRequest getRetirementRequestById(int requestId) {
        return repository.findById(requestId).orElse(null);
    }

    public RetirementRequest saveRetirementRequest(RetirementRequest request) {
        return repository.save(request);
    }

    public void deleteRetirementRequest(int requestId) {
        repository.deleteById(requestId);
    }
}