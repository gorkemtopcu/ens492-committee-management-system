package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Config;
import com.commitee.commitee.Entities.Meeting;
import com.commitee.commitee.Repositories.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;
    private final ConfigService configService;

    @Autowired
    public MeetingService(MeetingRepository meetingRepository, ConfigService configService) {
        this.meetingRepository = meetingRepository;
        this.configService = configService;
    }

    public List<Meeting> getAll() {
        return meetingRepository.findAll();
    }

    public Meeting save(Meeting meeting) {
        List<Config> configs = configService.getAll();
        if (configs == null || configs.isEmpty()) return null;
        meeting.setTerm(configs.get(0).getData());
        return meetingRepository.save(meeting);
    }

    public List<Meeting> findByTerm(String term) {
        return meetingRepository.findByTerm(term);
    }

}