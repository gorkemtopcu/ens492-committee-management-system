import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const CommitteesService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.COMMITTEES + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default CommitteesService