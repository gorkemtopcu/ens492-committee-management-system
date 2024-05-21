package com.commitee.commitee.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProgramInstructorPayload {
    private String program;
    private List<Instructor> instructors;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Instructor {
        private String fullName;
        private List<CommitteeTerm> committees;

        @Getter
        @Setter
        @NoArgsConstructor
        @AllArgsConstructor
        public static class CommitteeTerm {
            private String committee;
            private List<Integer> terms;
        }

    }



}
