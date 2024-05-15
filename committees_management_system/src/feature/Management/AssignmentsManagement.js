import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Terms from 'assets/jsons/report/terms.json';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import ProductHeader from 'product/components/ProductHeader';

const AssignmentsManagement = () => {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleTermChange = (term) => {
        setSelectedTerm(term);
        setIsButtonEnabled(term !== null); // Enable button if term is selected
    };

    const handleButtonClick = () => {
        // Navigate to the new page with the term information as a parameter
        navigate(`/mgmt-assignments/byterm`);
    };

    return (
        <div>
            <ProductHeader title="Assignments Management" />

            <div style={{ width: "300px" }}>
                <Picker
                    title="Select Term"
                    items={Terms}
                    onChange={handleTermChange}
                    multipleSelection={false}
                    selected={selectedTerm}
                />
            </div>

            <PrimaryButton
                title="Submit"
                onClick={handleButtonClick}
                isEnabled={isButtonEnabled} style={undefined} />
        </div>
    );
};

export default AssignmentsManagement;
