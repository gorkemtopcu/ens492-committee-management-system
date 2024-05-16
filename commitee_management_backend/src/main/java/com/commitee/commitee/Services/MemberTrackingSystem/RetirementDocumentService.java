package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementDocument;
import com.commitee.commitee.Repositories.MemberTrackingSystem.RetirementDocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RetirementDocumentService {

    @Autowired
    private RetirementDocumentRepository repository;

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
}