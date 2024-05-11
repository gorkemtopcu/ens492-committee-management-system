import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const CommitteeCategoryService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.COMMITTEE_CATEGORY + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default CommitteeCategoryService