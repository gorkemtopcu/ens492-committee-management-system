import React, { useEffect, useState } from 'react';
import ProductHeader from 'product/components/ProductHeader';
import StringConstants from 'product/constants/StringConstants';
import PrimaryButton from 'product/components/PrimaryButton';
import Terms from 'assets/jsons/report/terms.json';
import CommitteeService from 'product/service/committees';
import { Spin } from 'antd';
import Filter from 'product/components/Filter';
import AssignmentsService from 'product/service/assignments';
import { columnMapping } from 'product/constants/ColumnMapping';
import TableExpandable from 'product/components/TableExpandable';

const Committees = () => {
    const [reportData, setReportData] = useState([]);
    const [committeesData, setCommitteesData] = useState([]);
    const [selectedCommittees, setSelectedCommittees] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isFilterMode, setIsFilterMode] = useState(true);
    const isFilterable = () => selectedCommittees.length > 0 && selectedTerms.length > 0;

    const fetchCommittees = async () => {
        try {
            setLoading(true);
            const response = await CommitteeService.getAll();
            const formattedData = response.data.map(committee => ({
                value: committee.committee,
                label: committee.committee
            }));
            setCommitteesData(formattedData);
            setLoading(false);
        } catch (error) {
            alert(StringConstants.ERROR);
            setLoading(false);
        }
    };

    const fetchReportData = async () => {
        try {
            setLoading(true);
            const response = await AssignmentsService.getByCommitteeAndTerm(
                selectedCommittees.map(c => c.value),
                selectedTerms.map(t => t.value)
            );

            console.log(response);

            const organizedData = response.data.map(e => ({
                key: e.committee,
                committe: e.committee,
                facultyMembers: e.instructors.map((i, index) => ({
                    key: i.fullName,
                    fullName: i.fullName
                }))
            }));
            setReportData(organizedData);
            console.log(organizedData);
            setLoading(false);
        } catch (error) {
            alert(StringConstants.ERROR);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCommittees();
    }, []);

    const handleSelectedCommitteeChange = (committees) => {
        setSelectedCommittees(committees);
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

    const outsideColumns = [columnMapping.committee];
    const insideColumns = [columnMapping.facultyMember];

    return (
        <Spin spinning={isLoading}>
            <ProductHeader title="Committees" />
            {isFilterMode && (
                <Filter
                    filterProps={[
                        {
                            title: StringConstants.SELECT_COMMITTEE,
                            items: committeesData,
                            onChange: handleSelectedCommitteeChange,
                            selected: selectedCommittees,
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
                <TableExpandable outsideColumns={outsideColumns} insideColumns={insideColumns} dataSource={reportData} getNestedData={record => record.facultyMember} />
                <PrimaryButton
                    title={StringConstants.BACK}
                    onClick={handleBackButtonClick}
                    style={{ marginTop: '30px' }}
                />
            </div>)}
        </Spin>
    );
};

export default Committees;
