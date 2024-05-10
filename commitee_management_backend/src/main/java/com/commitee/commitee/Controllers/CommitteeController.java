package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Services.CommitteeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/committees")
public class CommitteeController {
    private final CommitteeService committeeService;

    @Autowired
    public CommitteeController(CommitteeService committeeService) {
        this.committeeService = committeeService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Committee>> getAllCommittees() {
        List<Committee> committees = committeeService.getAllCommittees();
        return new ResponseEntity<>(committees, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Committee> createCommittee(@RequestBody Committee committee) {
        Committee savedCommittee = committeeService.saveCommittee(committee);
        return new ResponseEntity<>(savedCommittee, HttpStatus.CREATED);
    }

    // Other controller methods for updating and deleting committees can be added here
}
