import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const RetirementRequestService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.RETIREMENT_REQUESTS + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
};

export default RetirementRequestService