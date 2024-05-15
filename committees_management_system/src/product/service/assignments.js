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

    searchByTerm: async (term) => {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append(ServiceConstants.TERM_PARAM, term);
            return await axios.get(`${ServiceConstants.ASSIGNMENTS}getByTerm?${queryParams.toString()}`);
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
    }
};

export default AssignmentsService