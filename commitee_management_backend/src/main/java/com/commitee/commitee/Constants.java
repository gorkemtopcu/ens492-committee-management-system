package com.commitee.commitee;

public final class Constants {

        // Private constructor to prevent instantiation
        private Constants() {
            throw new AssertionError("Cannot instantiate constants class");
        }

        // API related constants
        public static final class Api {
            public static final String BASE_URL = "/api";
            public static final String GET_ALL_MEMBERS = BASE_URL + "/members";
            public static final String GET_MEMBER_BY_ID = BASE_URL + "/members/{id}";

            private Api() {
                throw new AssertionError("Cannot instantiate constants class");
            }
        }

        // General application constants
        public static final String PENDING = "Pending";
}
