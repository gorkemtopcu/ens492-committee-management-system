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
import ReportUtils from 'product/utils/report_utils';
import ExportButtons from 'product/components/ExportButtons';

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
        setLoading(true);
        AssignmentsService.getByCommitteeAndTerm(
            selectedCommittees.map(c => c.value),
            selectedTerms.map(t => t.value)
        )
            .then(response => {
                const organizedData = response.data.map(item => {
                    const key = item.committee;
                    const committee = item.committee;
                    const instructors = item.instructors.map(instructor => ({
                        fullName: instructor.fullName,
                        terms: instructor.terms,
                        program: instructor.program,
                        countOfMembership: instructor.terms.length
                    }));
                    return { key, committee, instructors };
                });
                setReportData(organizedData);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
            });

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

    const getExportData = () => {
        if (!reportData) { return null; }
        return reportData.flatMap(c =>
            c.instructors.flatMap(i =>
            ({
                "Faculty Member": i.fullName,
                "Committee": c.committee,
                "Count of Membership": i.countOfMembership,
                "Terms": i.terms.join(', '),
            }))
        );
    }

    const exportToExcel = () => {
        ReportUtils.exportExcel(getExportData, 'committees.xlsx');
    };

    const copyToClipboard = () => {
        ReportUtils.copyClipboard(getExportData);
    };

    const outsideColumns = [columnMapping.committee];
    const insideColumns = [columnMapping.fullName, columnMapping.program, columnMapping.countOfMembership, columnMapping.terms];

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
                <ExportButtons handleCopy={copyToClipboard} handleExcel={exportToExcel} />
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

export default Committees;
