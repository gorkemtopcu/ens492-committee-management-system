import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const MemberTrackingService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.ACTIVE_COMMITTEE_MEMBERS + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
};

export default MemberTrackingService