import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const AssignmentsService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.ASSIGNMENTS + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    getInstructorByProgramAndTerm: async (programs, terms) => {
        try {
            const url = `${ServiceConstants.ASSIGNMENTS}${ServiceConstants.REPORT_PROGRAM_INSTRUCTOR}?${ServiceConstants.PARAM_PROGRAMS}${programs.join(',')}&${ServiceConstants.PARAM_TERMS}${terms.join(',')}`;
            return await axios.get(url);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    deleteAssignment: async (record, term) => {
        try {
            console.log(record);
            const url = `${ServiceConstants.ASSIGNMENTS}${ServiceConstants.DELETE_ASSIGNMENT}${record.committee}/${record.fullName}/${term}`;
            console.log(url);
            console.log(url);
            return await axios.delete(url);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    },

    getByCommitteeAndTerm: async (committees, terms) => {
        try {
            const url = `${ServiceConstants.ASSIGNMENTS}${ServiceConstants.REPORT_COMMITTEES}?${ServiceConstants.PARAM_COMMITTEES}${committees.join(',')}&${ServiceConstants.PARAM_TERMS}${terms.join(',')}`;
            console.log(url);
            return await axios.get(url);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    getCommitteeAssignment: async (programs, terms) => {
        try {
            const url = `${ServiceConstants.ASSIGNMENTS}${ServiceConstants.REPORT_ASSIGNMENTS}?${ServiceConstants.PARAM_PROGRAMS}${programs.join(',')}&${ServiceConstants.PARAM_TERMS}${terms.join(',')}`;
            return await axios.get(url);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    getByTerm: async (term) => {
        try {
            return await axios.get(ServiceConstants.ASSIGNMENTS + ServiceConstants.REPORT_ASSIGNMENT_TERM + term);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    getCommitteeAnnoucement: async (term) => {
        try {
            return await axios.get(ServiceConstants.ASSIGNMENTS + ServiceConstants.REPORT_COMMITTEE_ANNOUNCEMENT + term);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    add: async (record) => {
        try {
            const params = {
                term: record.term,
                committeeId: record.committee,
                role: record.role,
                suid: record.fullName,
            };
                const response = await axios.post(
                `${ServiceConstants.ASSIGNMENTS}${ServiceConstants.ADD}`,
                params
            );
            
            return response.data; // Return the data from the response
        } catch (error) {
            console.error('Error adding data:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    },

    duplicateTerm: async (fromTerm, toTerm) => {
        try {
            //Create param
            const params = {
                fromTerm: fromTerm,
                toTerm: toTerm
            };

            return await axios.post(ServiceConstants.ASSIGNMENTS + ServiceConstants.DUPLICATE_TERM, params);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },



};

export default AssignmentsService