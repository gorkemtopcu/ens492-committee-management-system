package com.commitee.commitee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommitteesDTO {

    private String fullName;
    private String program;
    private String committee;
    private int term;

}
