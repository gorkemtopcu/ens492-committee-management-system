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
    getAllInRetirement: async () => {
        try {
            return await axios.get(ServiceConstants.RETIREMENT_REQUESTS + ServiceConstants.GET_ALL_IN_RETIREMENT_PROCESS);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    getAllRetiredInfo: async () => {
        try {
            return await axios.get(ServiceConstants.RETIREMENT_REQUESTS + ServiceConstants.GET_ALL_RETIRED_INFO);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    endRetirementProcess: async (requestId) => {
        try {
            return await axios.delete(ServiceConstants.RETIREMENT_REQUESTS + ServiceConstants.END_RETIREMENT_PROCESS + requestId);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default RetirementRequestService