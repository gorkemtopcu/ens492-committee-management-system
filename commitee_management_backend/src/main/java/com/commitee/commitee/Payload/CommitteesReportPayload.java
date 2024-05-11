package com.commitee.commitee.Payload;

import com.commitee.commitee.Entities.Committee;
import com.commitee.commitee.Entities.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CommitteesReportPayload {
    private Committee committee;
    private Member member;
    private Integer term;
}