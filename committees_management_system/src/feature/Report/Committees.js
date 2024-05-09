import React, { useState } from 'react';
import committeesData from 'assets/jsons/report/committees.json';
import Terms from 'assets/jsons/report/terms.json';
import Header from 'product/components/Header';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';

const Committees = () => {
    
    const [selectedCommittee, setSelectedCommittee] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to track if button should be enabled

    // Extract committee names from the data
    const committeeNames = committeesData.map(committee => committee.committee);

    // Define function to handle change in committee selection
    const handleCommitteeChange = (committee) => {
        setSelectedCommittee(committee);
        setIsButtonEnabled(selectedTerm !== null); // Enable button if both committee and term are selected
    };

    const handleTermChange = (term) => {
        setSelectedTerm(term);
        setIsButtonEnabled(selectedCommittee !== null); // Enable button if both committee and term are selected
    };

    // Handle button click
    const handleButtonClick = () => {
        // Your logic for button click action
        console.log("Button clicked");
        alert("Button clicked");
    };

    return (
        <div>
            <Header title="Committee/Term Select" />
            <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '50px', marginBottom: "50px" }}>
                <Picker
                    title="Select Committee"
                    items={committeeNames}
                    onChange={handleCommitteeChange}
                    selected={selectedCommittee}
                />
                <Picker
                    title="Select Term"
                    items={Terms}
                    onChange={handleTermChange}
                    selected={selectedTerm}
                />
            </div>

            <PrimaryButton
                title="Submit"
                onClick={handleButtonClick}
                isEnabled={isButtonEnabled}
            />
        </div>
    );

};

export default Committees;