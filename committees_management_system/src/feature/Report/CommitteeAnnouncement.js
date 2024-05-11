import React, { useState } from 'react';
import Terms from 'assets/jsons/report/terms.json';
import Header from 'product/components/Header';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import StringConstants from 'product/constants/StringConstants';


const CommitteeAnnouncement = () => {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const handleTermChange = (terms) => {
        setSelectedTerm(terms);
        setIsButtonEnabled(terms.length > 0);
    };

    const handleButtonClick = () => {
        console.log("Button clicked");
        alert("Button clicked");
    };

    return (

        <div>
            <Header title="Committee Announcement" />
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
