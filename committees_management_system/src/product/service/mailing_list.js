import axios from "axios";
import ServiceConstants from "product/constants/ServiceConstants";

const MailingListService = {
    getAll: async () => {
        try {
            return await axios.get(ServiceConstants.MAILING_LIST + ServiceConstants.GET_ALL);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default MailingListService