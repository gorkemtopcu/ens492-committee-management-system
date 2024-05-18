package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Meeting;
import com.commitee.commitee.Services.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/meetings")
public class MeetingController {
    private final MeetingService meetingService;

    @Autowired
    public MeetingController(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        List<Meeting> meetings = meetingService.getAll();
        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        Meeting savedMeeting = meetingService.save(meeting);
        return new ResponseEntity<>(savedMeeting, HttpStatus.CREATED);
    }

    @GetMapping("/findByTerm/{term}")
    public ResponseEntity<List<Meeting>> findByTerm(@PathVariable String term) {
        List<Meeting> meetings = meetingService.findByTerm(term);
        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }



    // Other controller methods for updating and deleting meetings can be added here
}
