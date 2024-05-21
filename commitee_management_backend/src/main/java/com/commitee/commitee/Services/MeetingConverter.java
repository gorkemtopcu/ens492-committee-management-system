package com.commitee.commitee.Services;

import com.commitee.commitee.Payload.MeetingsPayload;
import com.commitee.commitee.Repositories.MemberRepository;
import com.commitee.commitee.dto.MeetingDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;

public class MeetingConverter {

    MemberRepository memberRepository;
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public MeetingConverter(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    // Convert MeetingDTO to MeetingsPayload
    public static MeetingsPayload convertToPayload(MeetingDTO dto) throws IOException {
        MeetingsPayload payload = new MeetingsPayload();
        payload.setId(dto.getId());
        payload.setCommittee(dto.getCommittee());
        payload.setDate(dto.getDate());
        payload.setPlace(dto.getPlace());
        payload.setParticipants(parseParticipants(dto.getParticipants()));
        payload.setGuests(dto.getGuests());
        payload.setSubject(dto.getSubject());
        payload.setDecisions(dto.getDecisions());
        payload.setAttachment(dto.getAttachment());
        payload.setTerm(dto.getTerm());
        payload.setNextMeetingDate(dto.getNextMeetingDate());
        payload.setCreatedBy(dto.getCreatedBy());
        payload.setCreatedAt(dto.getCreatedAt());
        return payload;
    }

    // Convert JSON string to List<String>
    private static List<String> parseParticipants(String participantsJson) throws IOException {

        return objectMapper.readValue(participantsJson, new TypeReference<List<String>>() {});
    }


}
