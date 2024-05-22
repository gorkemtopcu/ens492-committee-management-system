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
    },

    getByCommitteeAndTerm: async (committees, terms) => {
        try {
            const url = `${ServiceConstants.MEETINGS}${ServiceConstants.MEETING_LIST}?${ServiceConstants.PARAM_COMMITTEES}${committees.join(',')}&${ServiceConstants.PARAM_TERMS}${terms.join(',')}`;
            console.log(url);
            return await axios.get(url);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    },

    getByMemberIdAndTerm: async (members, terms) => {
        try {
            const url = `${ServiceConstants.MEETINGS}${ServiceConstants.MEETING_MEMBER_TERM}?${ServiceConstants.PARAM_TERMS}${terms.join(',')}&${ServiceConstants.PARAM_MEMBERS}${members.join(',')}`;
            console.log(url);
            return await axios.get(url);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
};

export default MeetingsService