const ServiceConstants = {
    ASSIGNMENTS: "http://localhost:8080/api/assignments/",
    COMMITTEE_CATEGORY: "http://localhost:8080/api/committee-categories/",
    COMMITTEES: "http://localhost:8080/api/committees/",
    GROUPS: "http://localhost:8080/api/groups/",
    MAILING_LIST: "http://localhost:8080/api/mailing-lists/",
    MEETINGS: "http://localhost:8080/api/meetings/",
    MEMBERS: "http://localhost:8080/api/members/",
    PROGRAMS: "http://localhost:8080/api/programs/",
    ROLES: "http://localhost:8080/api/roles/",
    // FENS Committee
    ACTIVE_COMMITTEE_MEMBERS: "http://localhost:8080/api/active-committee-members/",
    RETIRED_COMMITTEE_MEMBERS: "http://localhost:8080/api/retired-committee-members/",
    RETIREMENT_REQUESTS: "http://localhost:8080/api/retirement-requests/",
    RETIREMENT_DOCUMENTS: "http://localhost:8080/api/retirement-documents/",
    // REPORTS
    REPORT_PROGRAM_INSTRUCTOR: "getInstructorByProgramAndTerm",
    REPORT_COMMITTEES: "getByCommitteeAndTerm",
    REPORT_ASSIGNMENTS: "getCommitteeAssignment",
    REPORT_ASSIGNMENT_TERM: "getByTerm/",
    REPORT_COMMITTEE_ANNOUNCEMENT: "getCommitteeAnnouncement/",
    // PARAMS
    PARAM_COMMITTEES: "committees=",
    PARAM_TERMS: "terms=",
    PARAM_PROGRAMS: "programs=",

    //Mail List
    MEETING_LIST: "getMeetingByCommitteeAndTerm",

    GET_ALL: "getAll",
    GET_BY_ID: "getById/",
    GET_BY_SUID: "getBySuid/",
    GET_ALL_RETIRED_INFO: "getAllRetiredInfo",
    RETIREMENT_REQUEST_BY_ID: "retirementRequestById/",
    GET_INSTRUCTOR: "getInstructorByProgramAndTerm",
    CHANGE_RETIREMENT_REASON: "changeRetirementReason",
    GET_ALL_RETIRED: "getAllRetired",
    GET_ALL_IN_RETIREMENT_PROCESS: "getAllInRetirementProcess",
    END_RETIREMENT: "endRetirementProcess",
    ADD_DOCUMENT: "addDocument",
    DELETE: "deleteById/",
    ADD: "add",
    UPDATE: "update"
};

export default ServiceConstants;