import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const RetirementDocumentsService = {
    getBySuid: async (id) => {
        try {
            return await axios.get(ServiceConstants.RETIREMENT_DOCUMENTS + ServiceConstants.GET_BY_SUID + id);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    add: async (document) => {
        try {
            console.log(document);
            return await axios.post(ServiceConstants.RETIREMENT_DOCUMENTS + ServiceConstants.ADD, document);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default RetirementDocumentsService