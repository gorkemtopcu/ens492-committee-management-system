package com.commitee.commitee.Controllers.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementDocument;
import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.Requests.DocumentRequest;
import com.commitee.commitee.Requests.RetirementReasonPutRequest;
import com.commitee.commitee.Services.MemberTrackingSystem.RetirementRequestService;
import com.commitee.commitee.dto.RetiredCommitteeMemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/retirement-requests")
public class RetirementRequestController {

    @Autowired
    private RetirementRequestService retirementRequestService;

    @GetMapping("/getAll")
    public List<RetirementRequest> getAllRequests() {
        return retirementRequestService.getAll();
    }

    @GetMapping("/getAllInRetirementProcess")
    public List<RetirementRequest> getAllActiveRequests() {
        return retirementRequestService.getAllActive();
    }

    @GetMapping("/getAllRetiredInfo")
    public List<RetiredCommitteeMemberDTO> getAllRetiredInfo() {
        return retirementRequestService.getAllRetiredInfo();
    }

    @GetMapping("/getById/{requestId}")
    public RetirementRequest getRetirementRequestById(@PathVariable int requestId) {
        return retirementRequestService.getById(requestId);
    }

    @GetMapping("/getBySuid/{suid}")
    public RetirementRequest getRetirementRequestBySuid(@PathVariable int suid) {
        return retirementRequestService.getActiveRequestsBySuid(suid);
    }

    @PutMapping("/changeRetirementReason")
    public ResponseEntity<RetirementRequest> changeRetirementReason(@RequestBody RetirementReasonPutRequest request) {
        RetirementRequest retirementRequest = retirementRequestService.getById(request.getRequestId());
        if(retirementRequest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        retirementRequest.setRetirementReason(request.getRetirementReason());
        return ResponseEntity.status(HttpStatus.OK).body(retirementRequestService.save(retirementRequest));
    }

    @PostMapping("/addDocument")
    public ResponseEntity<RetirementDocument> addDocument(@RequestBody DocumentRequest documentRequest) {
        RetirementRequest retirementRequest = retirementRequestService.getActiveRequestsBySuid(documentRequest.getSuid());
        if (retirementRequest == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        // If the request is not pending, we can't add a document
        if (retirementRequest.getStatus().equals("pending")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        RetirementDocument savedDocument = retirementRequestService.addDocument(retirementRequest.getRequestId(), documentRequest);
        if (savedDocument != null) {
            return ResponseEntity.status(HttpStatus.OK).body(savedDocument);
        } else {
            // Failed to add document
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/add")
    public RetirementRequest createRetirementRequest(@RequestBody RetirementRequest request) {
        return retirementRequestService.save(request);
    }

    @DeleteMapping("/endRetirementProcess/{requestId}")
    public ResponseEntity<RetirementRequest> endRetirementProcess(@PathVariable int requestId) {
        return  retirementRequestService.retireByRequestId(requestId);
    }


    @DeleteMapping("/deleteById/{requestId}")
    public void deleteRetirementRequest(@PathVariable int requestId) {
        retirementRequestService.deleteById(requestId);
    }
}
