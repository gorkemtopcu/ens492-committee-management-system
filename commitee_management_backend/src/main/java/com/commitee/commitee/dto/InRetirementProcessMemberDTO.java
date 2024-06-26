package com.commitee.commitee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class InRetirementProcessMemberDTO {
    private int suid;
    private String fullName;
    private String email;
    private String program;
    private int duration;
    private LocalDateTime createdAt;
    private boolean earlyRetirement;
    private boolean retired;
}
