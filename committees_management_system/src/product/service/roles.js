import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const RolesService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.ROLES + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
    
};

export default RolesService