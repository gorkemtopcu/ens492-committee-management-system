import { Spin } from 'antd';
import Filter from 'product/components/Filter';
import ProductHeader from 'product/components/ProductHeader';
import StringConstants from 'product/constants/StringConstants';
import ProgramService from 'product/service/programs';
import React, { useEffect, useState } from 'react';
import Terms from 'assets/jsons/report/terms.json';
import AssignmentsService from 'product/service/assignments';
import TableExpandable from 'product/components/TableExpandable';
import PrimaryButton from 'product/components/PrimaryButton';
import { columnMapping } from 'product/constants/ColumnMapping';


const CommitteesAssignment = () => {

    const [reportData, setReportData] = useState([]);
    const [programData, setProgramData] = useState([]);
    const [selectedProgram, setSelectedCommittees] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isFilterMode, setIsFilterMode] = useState(true);
    const isFilterable = () => selectedProgram.length > 0 && selectedTerms.length > 0;

    useEffect(() => {
        fetchPrograms();
    }, []);

    const fetchPrograms = async () => {
        setLoading(true);
        ProgramService.getAll()
            .then(response => {
                const formattedData = response.data.map(program => ({
                    value: program.program,
                    label: program.programFull
                }));
                setProgramData(formattedData);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchReportData = async () => {
        setLoading(true);
        AssignmentsService.getCommitteeAssignment(
            selectedProgram.map(c => c.value),
            selectedTerms.map(t => t.value)
        )
            .then(response => {
                const organizedData = response.data.map(item => {
                    const key = item.program;
                    const program = item.program;
                    const instructors = item.instructors.map(instructor => ({
                        fullName: instructor.fullName,
                        committee: instructor.committees,
                    }));
                    return { key, program, instructors };
                });
                console.log(organizedData);
                setReportData(organizedData);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSelecteProgramChange = (programs) => {
        setSelectedCommittees(programs);
    };

    const handleSelectedTermsChange = (terms) => {
        setSelectedTerms(terms);
    };

    const handleFilterButtonClick = () => {
        fetchReportData();
        setIsFilterMode(false);
    }

    const handleBackButtonClick = () => {
        setIsFilterMode(true);
    }
    const outsideColumns = [columnMapping.program];
    const insideColumns = [columnMapping.fullName, columnMapping.multipleCommittees];

    return (

        <Spin spinning={isLoading}>
            <ProductHeader title={StringConstants.COMMITTEE_ASSIGNMENT} />
            {isFilterMode && (
                <Filter
                    filterProps={[
                        {
                            title: StringConstants.SELECT_PROGRAM,
                            items: programData,
                            onChange: handleSelecteProgramChange,
                            selected: selectedProgram,
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
                <TableExpandable outsideColumns={outsideColumns} insideColumns={insideColumns} dataSource={reportData} getNestedData={record => record.instructors} />
                <PrimaryButton
                    title={StringConstants.BACK}
                    onClick={handleBackButtonClick}
                    style={{ marginTop: '30px' }}
                />
            </div>)}
        </Spin>
    );
};

export default CommitteesAssignment;
