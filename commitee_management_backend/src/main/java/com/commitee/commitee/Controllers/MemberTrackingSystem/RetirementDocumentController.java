package com.commitee.commitee.Controllers.MemberTrackingSystem;

import com.commitee.commitee.Entities.MemberTrackingSystem.RetirementDocument;
import com.commitee.commitee.Services.MemberTrackingSystem.RetirementDocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/retirement-documents")
public class RetirementDocumentController {

    @Autowired
    private RetirementDocumentService retirementDocumentService;

    @GetMapping("/getAll")
    public List<RetirementDocument> getAllRetirementDocuments() {
        return retirementDocumentService.getAll();
    }

    @GetMapping("/getById/{documentId}")
    public RetirementDocument getRetirementDocumentById(@PathVariable int documentId) {
        return retirementDocumentService.getById(documentId);
    }

    @PostMapping("/add")
    public RetirementDocument createRetirementDocument(@RequestBody RetirementDocument document) {
        return retirementDocumentService.save(document);
    }

    @DeleteMapping("/deleteById/{documentId}")
    public void deleteRetirementDocument(@PathVariable int documentId) {
        retirementDocumentService.deleteById(documentId);
    }
}