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
    private RetirementRequestService retirementRequestService;

    @GetMapping("/getAll")
    public List<RetirementRequest> getAllRequests() {
        return retirementRequestService.getAll();
    }

    @GetMapping("/getById/{requestId}")
    public RetirementRequest getRetirementRequestById(@PathVariable int requestId) {
        return retirementRequestService.getById(requestId);
    }

    @PostMapping("/add")
    public RetirementRequest createRetirementRequest(@RequestBody RetirementRequest request) {
        return retirementRequestService.save(request);
    }

    @DeleteMapping("/deleteById/{requestId}")
    public void deleteRetirementRequest(@PathVariable int requestId) {
        retirementRequestService.deleteById(requestId);
    }
}
