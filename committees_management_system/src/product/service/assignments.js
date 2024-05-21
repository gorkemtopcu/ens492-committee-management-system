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
    }

};

export default AssignmentsService