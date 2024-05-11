package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.MailingList;
import com.commitee.commitee.Entities.Meeting;
import com.commitee.commitee.Services.MailingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/mailing-lists")
public class MailingListController {
    private final MailingListService mailingListService;

    @Autowired
    public MailingListController(MailingListService mailingListService) {
        this.mailingListService = mailingListService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<MailingList>> getAllMailingLists() {
        List<MailingList> mailingLists = mailingListService.getAllMailingLists();
        return new ResponseEntity<>(mailingLists, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MailingList> createMailingList(@RequestBody MailingList mailingList) {
        MailingList savedMailingList = mailingListService.saveMailingList(mailingList);
        return new ResponseEntity<>(savedMailingList, HttpStatus.CREATED);
    }

    @GetMapping("/findByTerm/{term}")
    public ResponseEntity<List<MailingList>> findByTerm(@PathVariable String term) {
        List<MailingList> mailinglist = mailingListService.findByTerm(term);
        return new ResponseEntity<>(mailinglist, HttpStatus.OK);
    }
}