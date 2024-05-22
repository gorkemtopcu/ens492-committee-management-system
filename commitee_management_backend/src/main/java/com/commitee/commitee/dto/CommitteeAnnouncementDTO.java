package com.commitee.commitee.dto;

import com.commitee.commitee.Payload.CommitteeAssignmentPayload;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommitteeAnnouncementDTO {
    private String fullName;
    private String program;
    private String committee;
    private int term;
    private String role;
    private int order;

}
