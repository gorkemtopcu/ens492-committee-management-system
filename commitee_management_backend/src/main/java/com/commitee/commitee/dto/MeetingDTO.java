package com.commitee.commitee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MeetingDTO {
    private Long id;
    private String committee;
    private LocalDateTime date;
    private String place;
    private String participants; // Raw participants SUIDs in JSON format
    private String guests;
    private String subject;
    private String decisions;
    private String attachment;
    private String term;
    private LocalDateTime nextMeetingDate;
    private String createdBy;
    private LocalDateTime createdAt;
}