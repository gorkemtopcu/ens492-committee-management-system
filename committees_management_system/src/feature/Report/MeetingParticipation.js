import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search_Field from 'product/components/SearchField';
import Terms from 'assets/jsons/report/terms.json';
import Header from 'product/components/Header';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';


const MeetingParticipation = () => {
    const [data, setData] = useState([]);
    const [initialValues, setInitialValues] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/members/getAll');
            setData(response.data);
            setInitialValues(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setIsButtonEnabled(value !== null && value.length > 0 && selectedTerm !== null);
        // Handle selected values here
    };

    const handleTermChange = (term) => {
        setSelectedTerm(term);
        setIsButtonEnabled(initialValues !== null && term !== null); // Enable button if both program and term are selected
    };

    // Handle button click
    const handleButtonClick = () => {
        // Your logic for button click action
        console.log("Button clicked");
        alert("Button clicked");
    };

    const namesOptions = initialValues ? initialValues.map(item => ({
        label: item.fullName,
        value: item.suid,
    })) : [];

    return (
        <div>
            <h1>Meeting Participation</h1>
            <div style={{ gap: '50px', display: 'flex', justifyContent: 'flex-start', marginTop: "50px" }}>
                <div style={{ flex: 1 }}>
                    
                    <Search_Field options={namesOptions} onChange={handleChange} />
                </div>
                <div style={{ flex: 1 }}>
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

export default MeetingParticipation;
