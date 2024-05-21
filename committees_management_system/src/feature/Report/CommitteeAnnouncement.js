import React, { useState } from 'react';
import Terms from 'assets/jsons/report/terms.json';
import ProductHeader from 'product/components/ProductHeader';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import StringConstants from 'product/constants/StringConstants';
import { useNavigate } from 'react-router-dom';

const CommitteeAnnouncement = () => {
    const [selectedTerm, setSelectedTerm] = useState([]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const navigate = useNavigate();

    const handleTermChange = (terms) => {
        setSelectedTerm(terms);
        setIsButtonEnabled(terms.length > 0);
    };

    const handleButtonClick = () => {
        navigate('/committee-announcement/byterm', { state: { term: selectedTerm } });
    };

    return (
        <div>
            <ProductHeader title="Committee Announcement" />
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <div style={{ marginRight: '20px' }}>
                    <Picker
                        title={StringConstants.SELECT_TERM}
                        items={Terms.map(t => ({ "value": t, "label": t }))}
                        onChange={handleTermChange}
                        selected={selectedTerm}
                        multipleSelection={false}
                    />
                </div>
                <div>
                    <PrimaryButton
                        title={StringConstants.SUBMIT}
                        onClick={handleButtonClick}
                        isEnabled={isButtonEnabled}
                        style={{ marginTop: '15px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CommitteeAnnouncement;
