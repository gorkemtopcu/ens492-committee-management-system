package com.commitee.commitee.Controllers.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementRequest;
import com.commitee.commitee.Services.MemberTrackingSystem.RetirementRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/retirement-requests")
public class RetirementRequestController {

    @Autowired
    private RetirementRequestService service;

    @GetMapping
    public List<RetirementRequest> getAll() {
        return service.getAllRetirementRequests();
    }

    @GetMapping("/{requestId}")
    public RetirementRequest getRetirementRequestById(@PathVariable int requestId) {
        return service.getRetirementRequestById(requestId);
    }

    @PostMapping
    public RetirementRequest createRetirementRequest(@RequestBody RetirementRequest request) {
        return service.saveRetirementRequest(request);
    }

    @DeleteMapping("/{requestId}")
    public void deleteRetirementRequest(@PathVariable int requestId) {
        service.deleteRetirementRequest(requestId);
    }
}
