import React, { useEffect, useState } from 'react';
import Terms from 'assets/jsons/report/terms.json';
import ProductHeader from 'product/components/ProductHeader';
import PrimaryButton from 'product/components/PrimaryButton';
import StringConstants from 'product/constants/StringConstants';
import ProgramService from 'product/service/programs';
import { Spin } from 'antd';
import Filter from 'product/components/Filter';
import AssignmentsService from 'product/service/assignments';

const ProgramInstructor = () => {
  const [programsData, setProgramsData] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFilterMode, setIsFilterMode] = useState(true);
  const isFilterable = () => selectedPrograms.length > 0 && selectedTerms.length > 0;

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await ProgramService.getAll();
      const formattedData = response.data.map(program => ({
        value: program.program,
        label: program.programFull
      }));
      setProgramsData(formattedData);
      setLoading(false);
    } catch (error) {
      alert(StringConstants.ERROR);
    }
  };

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await AssignmentsService.getInstructorByProgramAndTerm(selectedPrograms.map(p => p.value), selectedTerms.map(t => t.value));
      console.log(response);
      // const formattedData = response.data.map(program => ({
      //   value: program.program,
      //   label: program.programFull
      // }));
      // setProgramsData(formattedData);
      setLoading(false);
    } catch (error) {
      alert(StringConstants.ERROR);
    }
  }

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleSelectedProgramsChange = (programs) => {
    setSelectedPrograms(programs);
  };

  const handleSelectedTermsChange = (terms) => {
    setSelectedTerms(terms);
  };

  const handleFilterButtonClick = () => {
    fetchReportData();
    setIsFilterMode(false);
  }

  const handleBackButtonClick = () => {
    setSelectedPrograms(null);
    setSelectedTerms([]);
    setIsFilterMode(true);
  }

  return (
    <Spin spinning={isLoading}>
      <ProductHeader title="Program & Instructor" />
      {isFilterMode && (
        <Filter
          filterProps={[
            {
              title: StringConstants.SELECT_PROGRAM,
              items: programsData,
              onChange: handleSelectedProgramsChange,
              selected: selectedPrograms,
              multipleSelection: true
            },
            {
              title: StringConstants.SELECT_TERM,
              items: Terms.map(term => ({ value: term, label: term })),
              onChange: handleSelectedTermsChange,
              selected: selectedTerms,
              multipleSelection: true
            }
          ]}
          handleFilterButtonClick={handleFilterButtonClick}
          isFilterable={isFilterable}
        />
      )}
      {!isFilterMode && (<div>
        <PrimaryButton
          title={StringConstants.BACK}
          onClick={handleBackButtonClick}
          style={{ marginTop: '30px' }}
        />
      </div>)}
    </Spin>
  );
};

export default ProgramInstructor;
