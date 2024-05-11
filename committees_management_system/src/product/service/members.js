import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const MembersService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.MEMBERS + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default MembersService