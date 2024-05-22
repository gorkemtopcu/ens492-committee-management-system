package com.commitee.commitee.Services;

import com.commitee.commitee.Entities.*;
import com.commitee.commitee.Payload.MeetingParticipationPayload;
import com.commitee.commitee.Payload.MeetingsPayload;
import com.commitee.commitee.Repositories.MeetingRepository;
import com.commitee.commitee.Repositories.MemberRepository;
import com.commitee.commitee.dto.MeetingDTO;
import com.commitee.commitee.dto.MeetingParticipationDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;
    private final ConfigService configService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final AssignmentService assignmentService;

    @Autowired
    public MeetingService(MeetingRepository meetingRepository, ConfigService configService, MemberRepository memberRepository, MemberService memberService, AssignmentService assignmentService) {
        this.meetingRepository = meetingRepository;
        this.configService = configService;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
        this.assignmentService = assignmentService;
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

    public List<MeetingParticipationPayload> getMeetingByMemberAndTerm(List<Integer> members, List<Integer> terms) {
        List<MeetingParticipationDTO> dto = meetingRepository.getMeetingByMemberAndTerm(terms);
        List<MeetingParticipationPayload> payloadList = new ArrayList<>();

        for (Integer member : members) {
            List<String> committees = assignmentService.getCommitteesByMember(member).stream().map(Committee::getCommittee).toList();

            Map<String, Map<String, Integer>> numberOfMeetingsAttendedMap = new HashMap<>();
            Map<String, Map<String, Integer>> numberOfMeetingsMap = new HashMap<>();
            for (MeetingParticipationDTO meetingParticipationDTO : dto) {
                String participants = meetingParticipationDTO.getParticipants();
                String trimmed = participants.substring(1, participants.length() - 1);
                String[] items = trimmed.replace("\"", "").split(",");
                List<String> participantList = new ArrayList<>(Arrays.asList(items));
                String committee = meetingParticipationDTO.getCommittee();
                String term = meetingParticipationDTO.getTerm();

                if (participantList.contains(member.toString())) {
                    if (numberOfMeetingsAttendedMap.containsKey(term)) {
                        if (numberOfMeetingsAttendedMap.get(term).containsKey(committee)) {
                            numberOfMeetingsAttendedMap.get(term).put(committee, numberOfMeetingsAttendedMap.get(term).get(committee) + 1);
                        } else {
                            numberOfMeetingsAttendedMap.get(term).put(committee, 1);
                        }
                    } else {
                        Map<String, Integer> committeeMap = new HashMap<>();
                        committeeMap.put(committee, 1);
                        numberOfMeetingsAttendedMap.put(term, committeeMap);
                    }
                }

                if (committees.contains(committee)) {
                    if (numberOfMeetingsMap.containsKey(term)) {
                        if (numberOfMeetingsMap.get(term).containsKey(committee)) {
                            numberOfMeetingsMap.get(term).put(committee, numberOfMeetingsMap.get(term).get(committee) + 1);
                        } else {
                            numberOfMeetingsMap.get(term).put(committee, 1);
                        }
                    } else {
                        Map<String, Integer> committeeMap = new HashMap<>();
                        committeeMap.put(committee, 1);
                        numberOfMeetingsMap.put(term, committeeMap);
                    }
                }

            }
            //Map
            for (Map.Entry<String, Map<String, Integer>> termEntry : numberOfMeetingsMap.entrySet()) {
                String currentTerm = termEntry.getKey();
                Map<String, Integer> termMeetingsMap = termEntry.getValue();

                for (Map.Entry<String, Integer> meetingsEntry : termMeetingsMap.entrySet()) {
                    String committeeName = meetingsEntry.getKey();
                    Integer numberOfMeetings = meetingsEntry.getValue();
                    Integer numberOfMeetingsAttended = numberOfMeetingsAttendedMap.getOrDefault(currentTerm, Collections.emptyMap())
                            .getOrDefault(committeeName, 0);

                    Member currentMember = memberService.getById(member);
                    MeetingParticipationPayload newMeeting = new MeetingParticipationPayload(member, committeeName, currentMember.getFullName(), currentTerm, numberOfMeetings, numberOfMeetingsAttended);
                    payloadList.add(newMeeting);
                }
            }
        }
        return payloadList;
    }
}