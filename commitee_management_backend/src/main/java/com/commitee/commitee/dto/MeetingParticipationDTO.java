package com.commitee.commitee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingParticipationDTO
{
    private Long id;
    private String committee;
    private String participants;
    private String term;


}