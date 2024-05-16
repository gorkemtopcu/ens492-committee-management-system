package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Meeting;
import com.commitee.commitee.Repositories.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;

    @Autowired
    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public List<Meeting> getAll() {
        return meetingRepository.findAll();
    }

    public Meeting save(Meeting meeting) {
        return meetingRepository.save(meeting);
    }

    public List<Meeting> findByTerm(String term) {
        return meetingRepository.findByTerm(term);
    }

}