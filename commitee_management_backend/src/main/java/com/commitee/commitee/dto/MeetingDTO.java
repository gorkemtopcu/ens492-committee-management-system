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

    // Custom constructor to handle potential null values
    public MeetingDTO(Long id, String committee, LocalDateTime date, String place, String participants, String guests, String subject, String decisions, String attachment, String term, LocalDateTime nextMeetingDate, String createdBy, LocalDateTime createdAt) {
        this.id = id;
        this.committee = committee;
        this.date = date != null ? date : LocalDateTime.now();
        this.place = place != null ? place : "";
        this.participants = participants != null ? participants : "";
        this.guests = guests != null ? guests : "";
        this.subject = subject != null ? subject : "";
        this.decisions = decisions != null ? decisions : "";
        this.attachment = attachment != null ? attachment : "";
        this.term = term != null ? term : ""; // Assign empty string if term is null
        this.nextMeetingDate = nextMeetingDate != null ? nextMeetingDate : LocalDateTime.now();
        this.createdBy = createdBy != null ? createdBy : ""; // Assign empty string if createdBy is null
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
    }
}
