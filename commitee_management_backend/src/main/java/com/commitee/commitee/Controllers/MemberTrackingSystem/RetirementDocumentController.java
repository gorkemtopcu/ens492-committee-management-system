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
    private RetirementDocumentService service;

    @GetMapping
    public List<RetirementDocument> getAllRetirementDocuments() {
        return service.getAllRetirementDocuments();
    }

    @GetMapping("/{documentId}")
    public RetirementDocument getRetirementDocumentById(@PathVariable int documentId) {
        return service.getRetirementDocumentById(documentId);
    }

    @PostMapping
    public RetirementDocument createRetirementDocument(@RequestBody RetirementDocument document) {
        return service.saveRetirementDocument(document);
    }

    @DeleteMapping("/{documentId}")
    public void deleteRetirementDocument(@PathVariable int documentId) {
        service.deleteRetirementDocument(documentId);
    }
}