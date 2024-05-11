package com.commitee.commitee.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommitteesReportPayload {
    private String facultyMember;
    private String program;
    private List<Integer> terms;
}
