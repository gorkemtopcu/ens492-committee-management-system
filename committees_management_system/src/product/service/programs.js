import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const ProgramService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.PROGRAMS + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },
};

export default ProgramService
