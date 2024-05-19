package com.commitee.commitee.Entities;

import com.commitee.commitee.Services.ConfigService;
import com.commitee.commitee.Services.MeetingService;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "meetings")
public class Meeting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "committee", nullable = false)
    private Long committee;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "place")
    private String place;

    @Column(name = "participants", columnDefinition = "LONGTEXT")
    private String participants;

    @Column(name = "guests", length = 255)
    private String guests;

    @Column(name = "subject", nullable = false, length = 255)
    private String subject;

    @Column(name = "decisions", columnDefinition = "LONGTEXT", nullable = false)
    private String decisions;

    @Column(name = "attachment", length = 255)
    private String attachment;

    @Column(name = "term", length = 6)
    private String term;

    @Column(name = "next_meeting_date")
    private LocalDateTime nextMeetingDate;

    @Column(name = "created_by")
    private Long createdBy;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}