import React, { useState } from 'react';
import Picker from '../../components/Picker';
import PrimaryButton from '../../components/PrimaryButton';
import Header from '../../components/Header';
import Programs from '../../data/report/programs.json'; // Corrected import path
import Terms from '../../data/report/terms.json'; // Corrected import path

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
      <Header title="Program/Term Select" />
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '50px', marginTop: '20px' }}> {/* Align pickers to the left */}
        <Picker
          title="Select Program"
          items={Programs}
          onChange={handleProgramChange}
          selected={selectedProgram} // Pass selectedProgram as prop to highlight the selected program
        />
        <Picker
          title="Select Term"
          items={Terms}
          onChange={handleTermChange}
          selected={selectedTerm} // Pass selectedTerm as prop to highlight the selected term
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

export default ProgramInstructor;
