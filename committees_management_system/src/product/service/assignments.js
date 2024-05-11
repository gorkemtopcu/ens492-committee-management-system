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
            const response = await axios.get(`${ServiceConstants.ASSIGNMENTS}getCommitteesWithMembersAndTerms?${queryParams.toString()}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default AssignmentsService