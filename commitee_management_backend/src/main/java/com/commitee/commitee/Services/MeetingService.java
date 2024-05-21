package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.Config;
import com.commitee.commitee.Entities.Meeting;
import com.commitee.commitee.Payload.MeetingsPayload;
import com.commitee.commitee.Repositories.MeetingRepository;
import com.commitee.commitee.Repositories.MemberRepository;
import com.commitee.commitee.dto.MeetingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;
    private final ConfigService configService;
    private final MemberRepository memberRepository;

    @Autowired
    public MeetingService(MeetingRepository meetingRepository, ConfigService configService, MemberRepository memberRepository) {
        this.meetingRepository = meetingRepository;
        this.configService = configService;
        this.memberRepository = memberRepository;
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

    public List<MeetingsPayload> getMeetingByCommitteeAndTerm(List<String> committee, List<Integer> terms) {
        List<MeetingDTO> dtoList = meetingRepository.getMeetingByCommitteeAndTerm(committee, terms);
        List<MeetingsPayload> payloadList = new ArrayList<>();

        for (MeetingDTO meetingDTO : dtoList) {
            try {
                MeetingsPayload payload = MeetingConverter.convertToPayload(meetingDTO);
                payloadList.add(payload);
            } catch (IOException e) {
                e.printStackTrace();
                // Optionally, you could log this error or handle it in another way
            }
        }

        for(MeetingsPayload payload : payloadList) {
            payload.getParticipants().forEach(participant -> {
               memberRepository.findById(Integer.valueOf(participant)).ifPresent(member -> {
                   payload.getParticipants().set(payload.getParticipants().indexOf(participant), member.getFullName());
               });
            });
        }

        return payloadList;
    }


}