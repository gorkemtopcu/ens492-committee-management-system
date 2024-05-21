package com.commitee.commitee.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ProgramInstructorDTO {
    private String fullName;
    private String program; // Include program name
    private String committee;
    private int term;

    // getters and setters
}