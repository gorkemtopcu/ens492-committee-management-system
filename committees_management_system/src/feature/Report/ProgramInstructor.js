import React, { useState } from 'react';
import Programs from 'assets/jsons/report/programs.json';
import Terms from 'assets/jsons/report/terms.json';
import Header from 'product/components/Header';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import StringConstants from 'product/constants/StringConstants';

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
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '50px', marginBottom: "50px" }}>
        <Picker
          title={StringConstants.SELECT_PROGRAM}
          items={Programs}
          onChange={handleProgramChange}
          selected={selectedProgram} isCollapsed={undefined} onCollapseToggle={undefined}        />
        <Picker
          title={StringConstants.SELECT_TERM}
          items={Terms}
          onChange={handleTermChange}
          selected={selectedTerm} isCollapsed={undefined} onCollapseToggle={undefined}        />
      </div>

      <PrimaryButton
        title="Submit"
        onClick={handleButtonClick}
        isEnabled={isButtonEnabled} style={undefined}      />
    </div>
  );
};

export default ProgramInstructor;
