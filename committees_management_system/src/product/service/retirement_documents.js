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
   
};

export default RetirementDocumentsService