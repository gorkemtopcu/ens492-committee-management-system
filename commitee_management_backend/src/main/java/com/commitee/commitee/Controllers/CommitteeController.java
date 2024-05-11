package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Exception.CommitteeNotFoundException;
import com.commitee.commitee.Payload.CommitteePayload;
import com.commitee.commitee.Services.CommitteeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDateTime;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @PostMapping("/add")
    public Committee addCommittee(@RequestBody CommitteePayload payload) {
        Committee committee = new Committee();
        committee.setCommittee(payload.getCommittee());
        committee.setCategory(payload.getCategory());
        committee.setAbout(payload.getAbout());
        committee.setEmailListAddress(payload.getEmailListAddress());
        committee.setCreatedAt(LocalDateTime.now());

        return committeeService.save(committee);
    }

    @DeleteMapping("/deleteById/{id}")
    public ResponseEntity<?> deleteById(@PathVariable("id") Long id) {
        try{
            Committee deletedCommittee = committeeService.delete(id);
            return new ResponseEntity<>(deletedCommittee, HttpStatus.OK);
        }
        catch (CommitteeNotFoundException e) {
            String errorMessage = e.getMessage();
            return new ResponseEntity<>(errorMessage, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Committee> createCommittee(@RequestBody Committee committee) {
        Committee savedCommittee = committeeService.save(committee);
        return new ResponseEntity<>(savedCommittee, HttpStatus.CREATED);
    }

    // Other controller methods for updating and deleting committees can be added here
}
