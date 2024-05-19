import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const MeetingsService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.MEETINGS + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    add: async (data) => {
        try {
            return await axios.post(ServiceConstants.MEETINGS + ServiceConstants.ADD, data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default MeetingsService