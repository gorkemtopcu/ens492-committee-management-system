package com.commitee.commitee.Payload;

import com.commitee.commitee.Entities.Committee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommitteeAssignmentPayload
{
    private String program;
    private List<Instructor> instructors;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Instructor {
        private String fullName;
        private List<String> committees;

    }

}
