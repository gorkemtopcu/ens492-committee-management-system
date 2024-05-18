package com.commitee.commitee.Requests;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RetirementReasonPutRequest {
    private int requestId;
    private String retirementReason;

}
