package com.commitee.commitee.Payload;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommitteePayload {
    private String committee;

    private Integer category;

    private String about;

    private String emailListAddress;
}
