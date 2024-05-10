package com.commitee.commitee.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TermsCommitteesPayload {
    Collection<String> terms;
    Collection<String> Committees;
}
