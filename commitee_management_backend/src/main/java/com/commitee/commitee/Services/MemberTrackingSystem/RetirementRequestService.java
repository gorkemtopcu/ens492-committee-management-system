package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementDocument;
import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.Repositories.MemberTrackingSystem.RetirementRequestRepository;
import com.commitee.commitee.Requests.DocumentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.commitee.commitee.Constants.PENDING;

@Service
public class RetirementRequestService {

    @Autowired
    private RetirementRequestRepository repository;

    @Autowired
    private RetirementDocumentService retirementDocumentService;

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

    public RetirementDocument addDocument(int requestId, DocumentRequest documentRequest) {
        RetirementRequest request = repository.findById(requestId).orElse(null);
        if (request != null) {
            RetirementDocument document = new RetirementDocument();
            document.setDocumentType(documentRequest.getDocumentType());
            document.setFilePath(documentRequest.getFilePath());
            document.setRequestId(requestId);
            document.setUploadedDate(LocalDateTime.now());
            return retirementDocumentService.save(document);
        }
        return null;
    }

    public RetirementRequest getActiveRequestsBySuid(int suid) {
        List<RetirementRequest> retirementRequests = repository.findBySuid(suid);
        //Can't be more than 1 pending request by a suid as per our design, so we can return the first pending request
        for (RetirementRequest request : retirementRequests) {
            if (request.getStatus().equals(PENDING)) {
                return request;
            }
        }
        return null;
    }
}