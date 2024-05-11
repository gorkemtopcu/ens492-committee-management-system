import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchField from 'product/components/SearchField';
import Terms from 'assets/jsons/report/terms.json';
import Header from 'product/components/Header';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';

const AssignmentsManagement = () => {
    const [initialValues, setInitialValues] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleTermChange = (term) => {
        setSelectedTerm(term);
        setIsButtonEnabled(term !== null); // Enable button if term is selected
    };

    const handleButtonClick = () => {
        // Navigate to the new page with the term information as a parameter
        navigate(`/mgmt-assignments/byterm/${selectedTerm}`);
    };

    return (
        <div>
            <Header title="Assignments Management" />

            <div style={{ width: "300px" }}>
                <Picker
                    title="Select Term"
                    items={Terms}
                    onChange={handleTermChange}
                    selected={selectedTerm} isCollapsed={undefined} onCollapseToggle={undefined} />
            </div>

            <PrimaryButton
                title="Submit"
                onClick={handleButtonClick}
                isEnabled={isButtonEnabled} style={undefined} />
        </div>
    );
};

export default AssignmentsManagement;
