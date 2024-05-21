import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const CommitteeService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.COMMITTEES + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    deleteById: async (id) => {
        try {
            console.log(ServiceConstants.COMMITTEES + ServiceConstants.DELETE + id);
            return await axios.delete(ServiceConstants.COMMITTEES + ServiceConstants.DELETE + id);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    },

    add: async (data) => {
        try {
            return await axios.post(ServiceConstants.COMMITTEES + ServiceConstants.ADD, data);
        } catch (error) {
            console.error('Error adding data:', error);
        }
    },

    update: async (data) => {
        try {
            return await axios.put(ServiceConstants.COMMITTEES + ServiceConstants.UPDATE +"/" + data.id, data);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }
    

    
};

export default CommitteeService
