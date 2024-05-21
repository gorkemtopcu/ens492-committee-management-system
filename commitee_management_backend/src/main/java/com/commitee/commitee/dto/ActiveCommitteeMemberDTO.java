package com.commitee.commitee.dto;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ActiveCommitteeMemberDTO {
    private int suid;
    private String fullName;
    private String email;
    private String program;
    private LocalDateTime startedAt;
    private int duration;
    private LocalDateTime expectedRetirement;

    public ActiveCommitteeMemberDTO(int suid, String fullName, String email, String program, LocalDateTime createdAt, int duration) {
        this.suid = suid;
        this.fullName = fullName;
        this.email = email;
        this.program = program;
        this.startedAt = createdAt;
        this.duration = duration;
        this.expectedRetirement = createdAt.plusYears(duration);
    }
}