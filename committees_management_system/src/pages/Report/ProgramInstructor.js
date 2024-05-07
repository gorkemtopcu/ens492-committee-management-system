import React, { useState } from 'react';
import Picker from '../../components/Picker';
import programs from '../../lists/report_lists/programs.json';
import terms from '../../lists/report_lists/terms.json';

const ProgramInstructor = () => {
    // Define state for the selected programs and term
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false); // State to track if button should be enabled

    // Define function to handle change in program selection
    const handleProgramChange = (program) => {
      setSelectedProgram(program);
      setIsButtonEnabled(selectedTerm !== null); // Enable button if both program and term are selected
    };
  
    const handleTermChange = (term) => {
      setSelectedTerm(term);
      setIsButtonEnabled(selectedProgram !== null); // Enable button if both program and term are selected
    };

    // Handle button click
    const handleButtonClick = () => {
        // Your logic for button click action
        console.log("Button clicked");
        alert("Button clicked");
      };
    
    return (
      <div>
        <h1 style={{ marginBottom: '20px', fontSize: '2.5em', color:'red' }}>Program/Term Select</h1>
        <div style={{ display: 'flex' , gap: '120px'}}>
          {/* Render first picker */}
          <Picker title = "Programs" items={programs} onChange={handleProgramChange} />
          {/* Render second picker */}
          <Picker title = "Terms" items={terms} onChange={handleTermChange} />
          <div>
            <p style={{ marginTop: '50px'}}> Selected Program: {selectedProgram}</p>
            <div>
            <p style={{ marginTop: '50px'}}> Selected Term: {selectedTerm}</p>
          </div>
          </div>
          
        </div>
        <button 
        onClick={handleButtonClick} 
        disabled={!isButtonEnabled} 
        style={{ 
            width: '100px', 
            bottom: '5px',  
            left: '20px', 
            padding: '8px 16px',
            backgroundColor: isButtonEnabled ? '#3fdf22' : '#cccccc', // White color when enabled, grey color when disabled
            color: '#000000' // Black text color
        }}>Submit</button>

        </div>
    );
};

export default ProgramInstructor;