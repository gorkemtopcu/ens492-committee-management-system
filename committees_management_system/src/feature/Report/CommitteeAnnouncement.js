import React, { useState } from 'react';
import Terms from 'assets/jsons/report/terms.json';
import ProductHeader from 'product/components/ProductHeader';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import StringConstants from 'product/constants/StringConstants';
import { useNavigate } from 'react-router-dom';


const CommitteeAnnouncement = () => {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const navigate = useNavigate();
    
    const handleTermChange = (terms) => {
        setSelectedTerm(terms);
        setIsButtonEnabled(terms.length > 0);
    };


    const handleButtonClick = () => {
        // Navigate to the new page with the term information as a parameter
        navigate(`/committee-announcement/byterm/${selectedTerm}`);
    };

    return (

        <div>
            <ProductHeader title="Committee Announcement" />
            <div>
                <div style={{ width: "300px" }}>
                    <Picker
                        title={StringConstants.SELECT_TERM}
                        items={Terms}
                        onChange={handleTermChange}
                        selected={selectedTerm} isCollapsed={undefined} onCollapseToggle={undefined} />
                </div>
                <PrimaryButton
                    title={StringConstants.SUBMIT}
                    onClick={handleButtonClick}
                    isEnabled={isButtonEnabled}
                    style={{ marginTop: '15px' }}
                />
            </div>

        </div>
    );
};

export default CommitteeAnnouncement;
