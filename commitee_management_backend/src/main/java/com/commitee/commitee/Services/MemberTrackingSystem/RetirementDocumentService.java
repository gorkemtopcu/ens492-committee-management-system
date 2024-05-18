package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementDocument;
import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.Repositories.MemberTrackingSystem.RetirementDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class RetirementDocumentService {

    @Autowired
    private RetirementDocumentRepository repository;
    @Lazy //To avoid circular dependency
    @Autowired
    private RetirementRequestService retirementRequestService;

    public List<RetirementDocument> getAll() {
        return repository.findAll();
    }

    public RetirementDocument getById(int documentId) {
        return repository.findById(documentId).orElse(null);
    }

    public RetirementDocument save(RetirementDocument document) {
        return repository.save(document);
    }

    public void deleteById(int documentId) {
        repository.deleteById(documentId);
    }

    public List<RetirementDocument> getBySuid(int suid) {
        RetirementRequest request =  retirementRequestService.getActiveRequestsBySuid(suid);
        if (request != null) {
            return repository.findByRequestId(request.getRequestId());
        }
        return Collections.emptyList();
    }
}