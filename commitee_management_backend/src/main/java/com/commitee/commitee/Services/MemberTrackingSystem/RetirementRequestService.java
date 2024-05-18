package com.commitee.commitee.Services.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetiredCommitteeMember;
import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementDocument;
import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.Repositories.MemberTrackingSystem.RetirementRequestRepository;
import com.commitee.commitee.Requests.DocumentRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

import static com.commitee.commitee.Constants.ENDED;
import static com.commitee.commitee.Constants.PENDING;

@Service
public class RetirementRequestService {

    @Autowired
    private RetirementRequestRepository repository;

    @Autowired
    private RetirementDocumentService retirementDocumentService;

    @Autowired
    private RetiredCommitteeMemberService retiredCommitteeMemberService;

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
    //Gets only the pending request by suid
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

    @Transactional
    public ResponseEntity<RetirementRequest> retireByRequestId(int requestId) {
        RetirementRequest retirementRequest = getById(requestId);
        if (retirementRequest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if(retirementRequest.getStatus().equals(ENDED)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        RetiredCommitteeMember retiredCommitteeMember = retiredCommitteeMemberService.getById(retirementRequest.getSuid());
        if(retiredCommitteeMember == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        retiredCommitteeMember.setRetired(true);
        retiredCommitteeMemberService.save(retiredCommitteeMember);
        retirementRequest.setStatus(ENDED);
        retirementRequest.setClosedDate(LocalDateTime.now());
        retirementRequest.setClosed(true);
        return ResponseEntity.status(HttpStatus.OK).body(save(retirementRequest));
    }
}