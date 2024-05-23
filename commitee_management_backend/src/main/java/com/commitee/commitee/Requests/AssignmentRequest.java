package com.commitee.commitee.Requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.RequestParam;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentRequest {
  Integer committee;
  Integer fullName;
  Integer term;
  Integer role;
}
