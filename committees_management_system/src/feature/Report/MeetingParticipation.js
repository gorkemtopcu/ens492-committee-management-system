import React, { useState, useEffect } from 'react';
import SearchField from 'product/components/SearchField';
import Terms from 'assets/jsons/report/terms.json';
import ProductHeader from 'product/components/ProductHeader';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import StringConstants from 'product/constants/StringConstants';
import MembersService from 'product/service/members';


const MeetingParticipation = () => {
    const [members, setMembers] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        MembersService.getAll()
            .then(response => setMembers(response.data))
            .catch(error => {
                alert(StringConstants.ERROR);
            });
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setIsButtonEnabled(value !== null && value.length > 0 && selectedTerm !== null);
    };

    const handleTermChange = (term) => {
        setSelectedTerm(term);
        setIsButtonEnabled(members !== null && term !== null);
    };

    // Handle button click
    const handleButtonClick = () => {
    };

    const namesOptions = members ? members.map(item => ({
        label: item.fullName,
        value: item.suid,
    })) : [];

    return (
        <div>
            <ProductHeader title="Meeting Participation" />
            <div style={{ gap: '50px', display: 'flex', }}>
                <div style={{ maxWidth: '300px' }}>
                    <SearchField options={namesOptions} onChange={handleChange} title="Faculty Members" />
                </div>
                <div>
                    <Picker
                        title={StringConstants.SELECT_TERM}
                        items={Terms}
                        onChange={handleTermChange}
                        selected={selectedTerm} />
                </div>

            </div>

            <PrimaryButton
                title={StringConstants.SUBMIT}
                onClick={handleButtonClick}
                isEnabled={isButtonEnabled} style={undefined} />
        </div>

    );
};

export default MeetingParticipation;
