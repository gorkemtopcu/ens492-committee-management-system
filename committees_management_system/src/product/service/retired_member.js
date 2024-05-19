import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const RetiredMemberService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.RETIRED_COMMITTEE_MEMBERS + ServiceConstants.GET_ALL_RETIRED);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
   
};

export default RetiredMemberService