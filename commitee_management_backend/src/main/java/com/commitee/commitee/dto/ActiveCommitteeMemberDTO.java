package com.commitee.commitee.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ActiveCommitteeMemberDTO {
    private int suid;
    private String fullName;
    private String email;
    private String program;
    private int duration;

}