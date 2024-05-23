import React, { useState, useEffect } from 'react';
import Terms from 'assets/jsons/report/terms.json';
import PrimaryButton from 'product/components/PrimaryButton';
import ProductHeader from 'product/components/ProductHeader';
import { Spin } from 'antd';
import Filter from 'product/components/Filter';
import StringConstants from 'product/constants/StringConstants';
import TableExpandable from 'product/components/TableExpandable';
import { columnMapping } from 'product/constants/ColumnMapping';
import AssignmentsService from 'product/service/assignments';

const AssignmentsManagement = () => {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedTerms, setSelectedTerms] = useState([]);
  const [isFilterMode, setIsFilterMode] = useState(true);

  const isFilterable = () => selectedTerms.length > 0;

  const fetchReportData = async () => {
    setLoading(true);
    AssignmentsService.getByTerm(selectedTerms.map(t => t.value))
      .then(response => {
        const organizedData = response.data.map(item => ({
          key: item.committee,
          committee: item.committee,
          instructors: item.instructors.map(instructor => ({
            fullName: instructor.fullName,
            program: instructor.program,
          }))
        }));
        setReportData(organizedData);
        console.log(response);
      })
      .catch(error => {
        alert(StringConstants.ERROR);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleBackButtonClick = () => {
    setIsFilterMode(true);
  };

  const handleSelectedTermsChange = (terms) => {
    setSelectedTerms(terms);
  };

  const handleFilterButtonClick = () => {
    fetchReportData();
    setIsFilterMode(false);
  };

  const outsideColumns = [columnMapping.committee];
  const insideColumns = [columnMapping.fullName, columnMapping.program];

  return (
    <Spin spinning={isLoading}>
      <ProductHeader title={`Assignments Management`} />
      {isFilterMode && (
        <Filter
          filterProps={[
            {
              title: StringConstants.SELECT_TERM,
              items: Terms.map(term => ({ value: term, label: term })),
              onChange: handleSelectedTermsChange,
              selected: selectedTerms,
              multipleSelection: false,
            }
          ]}
          handleFilterButtonClick={handleFilterButtonClick}
          isFilterable={isFilterable}
        />
      )}
      {!isFilterMode && (
        <div>
          <TableExpandable
            outsideColumns={outsideColumns}
            insideColumns={insideColumns}
            dataSource={reportData}
            getNestedData={record => record.instructors}
          />
          <PrimaryButton
            title={StringConstants.BACK}
            onClick={handleBackButtonClick}
            style={{ marginTop: '30px' }}
          />
        </div>
      )}
    </Spin>
  );
};

export default AssignmentsManagement;
