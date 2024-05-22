package com.commitee.commitee.Controllers;

import com.commitee.commitee.Entities.Meeting;
import com.commitee.commitee.Payload.CommitteeTermPayload;
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

    @PostMapping("/add")
    public ResponseEntity<Meeting> createMeeting(@RequestBody Meeting meeting) {
        Meeting savedMeeting = meetingService.save(meeting);
        return new ResponseEntity<>(savedMeeting, HttpStatus.CREATED);
    }

    @GetMapping("/findByTerm/{term}")
    public ResponseEntity<List<Meeting>> findByTerm(@PathVariable String term) {
        List<Meeting> meetings = meetingService.findByTerm(term);
        return new ResponseEntity<>(meetings, HttpStatus.OK);
    }
    @GetMapping("/getMeetingByMemberAndTerm")
    public ResponseEntity<List<?>> getMeetingByMemberAndTerm(
            @RequestParam(value = "members") List<Integer> members, @RequestParam(value = "terms")  List<Integer> terms) {
        List<?> result = meetingService.getMeetingByMemberAndTerm(members, terms);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    @GetMapping("/getMeetingByCommitteeAndTerm")
    public ResponseEntity<List<?>> getMeetingByCommitteeAndTerm(
            @RequestParam(value = "committees") List<String> committee, @RequestParam(value = "terms")  List<Integer> terms) {
        List<?> result = meetingService.getMeetingByCommitteeAndTerm(committee, terms);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
