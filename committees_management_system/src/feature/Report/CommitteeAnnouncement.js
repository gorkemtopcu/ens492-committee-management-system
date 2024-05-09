import React, {useState} from 'react';
import faculity_members from 'assets/jsons/report/faculity_members.json';
import SearchField from 'product/components/SearchField'; // Ensure correct component name and import path
import Terms from 'assets/jsons/report/terms.json';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';


const CommitteeAnnouncement = () => {
    const facultyMemberNames = faculity_members.map(member => ({ label: member.facultyMember, value: member.id }));
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // Placeholder for button state

    const handleTermChange = (term) => {
        setSelectedTerm(term);
        setIsButtonEnabled(selectedTerm !== null); // Enable button if both program and term are selected
    };

    const handleButtonClick = () => {
        // Your logic for button click action
    };
    
    return (
        <div>
            <h1 style={{ marginBottom: '30px' }}>Committee Announcement</h1>
            <div style={{ display: 'flex'}}>
                <SearchField title="Search Faculty Members" data={facultyMemberNames} />
                <div style={{ marginLeft: '100px' }}> {/* Adjust the margin as needed */}
                    <Picker
                        title="Select Term"
                        items={Terms}
                        onChange={handleTermChange}
                        selected={selectedTerm}
                    />
                </div>
            </div>
            <PrimaryButton
                title="Submit"
                onClick={handleButtonClick}
                isEnabled={isButtonEnabled}
            />
        </div>
    );
};

export default CommitteeAnnouncement;