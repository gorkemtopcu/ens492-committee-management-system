package com.commitee.commitee.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingParticipationPayload
{
    private Integer suid;
    private String committee;
    private String fullName;
    private String term;
    private Integer numberOfMeetings;
    private Integer numberOfMeetingsAttended;
}
