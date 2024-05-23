import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const ActiveMemberService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.ACTIVE_COMMITTEE_MEMBERS + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    add: async (data) => {
        try {
            return await axios.post(ServiceConstants.ACTIVE_COMMITTEE_MEMBERS + ServiceConstants.ADD, data);
        } catch (error) {
            console.error('Error adding data:', error);
        }
    },

    retirementRequestById: async (id) => {
        try {
            return await axios.delete(ServiceConstants.ACTIVE_COMMITTEE_MEMBERS + ServiceConstants.RETIREMENT_REQUEST_BY_ID + id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    getNearRetirement: async () => {
        try {
            return await axios.get(ServiceConstants.ACTIVE_COMMITTEE_MEMBERS + ServiceConstants.GET_NEAR_RETIREMENT);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
};

export default ActiveMemberService