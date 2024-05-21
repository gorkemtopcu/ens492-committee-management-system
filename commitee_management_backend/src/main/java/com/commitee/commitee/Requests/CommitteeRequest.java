package com.commitee.commitee.Requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CommitteeRequest {
    List<String> committee;
    List<Integer> terms;
}
