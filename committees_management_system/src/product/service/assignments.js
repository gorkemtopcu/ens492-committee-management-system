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

    searchByCommitteeAndTerm: async (committees, terms) => {
        try {
            const queryParams = new URLSearchParams();
            committees.forEach(committee => {
                queryParams.append(ServiceConstants.COMMITTEES_PARAM, committee);
            });
            terms.forEach(term => {
                queryParams.append(ServiceConstants.TERMS_PARAM, term);
            });
            return await axios.get(`${ServiceConstants.ASSIGNMENTS}getCommitteesWithMembersAndTerms?${queryParams.toString()}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },


    getInstructorByProgramAndTerm: async (programs, terms) => {
        try {
            const programsParam = programs.join(',');
            const termsParam = terms.join(',');

            const url = `${ServiceConstants.ASSIGNMENTS}${ServiceConstants.REPORT_PROGRAM_INSTRUCTOR}?programs=${programsParam}&terms=${termsParam}`;
            console.log(url);

            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

};

export default AssignmentsService