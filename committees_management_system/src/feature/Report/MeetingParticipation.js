import React, { useState, useEffect } from 'react';
import SearchField from 'product/components/SearchField';
import Terms from 'assets/jsons/report/terms.json';
import ProductHeader from 'product/components/ProductHeader';
import PrimaryButton from 'product/components/PrimaryButton';
import StringConstants from 'product/constants/StringConstants';
import MembersService from 'product/service/members';
import { Spin } from 'antd';
import { columnMapping } from 'product/constants/ColumnMapping';
import Filter from 'product/components/Filter';
import TableSearch from 'product/components/TableSearch';
import MeetingsService from 'product/service/meetings';
import ReportUtils from 'product/utils/report_utils';
import ExportButtons from 'product/components/ExportButtons';

const MeetingParticipation = () => {
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [reportData, setReportData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isFilterMode, setIsFilterMode] = useState(true);

    const isFilterable = () => selectedTerms.length > 0 && selectedMembers.length > 0;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        MembersService.getAll()
            .then(response => setMembers(response.data))
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchReportData = async () => {
        setLoading(true);
        MeetingsService.getByMemberIdAndTerm
            (
                selectedMembers.map(m => m.suid),
                selectedTerms.map(t => t.value)
            )
            .then(response => {
                const organizedData = response.data.map(item => ({
                    key: item.id,
                    id: item.id,
                    suid: item.suid,
                    fullName: item.fullName,
                    committee: item.committee,
                    numberOfMeetings: item.numberOfMeetings,
                    numberOfMeetingsAttended: item.numberOfMeetingsAttended,
                    term: item.term,
                }));
                setReportData(organizedData);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            }).finally(() => {
                setLoading(false);
            });
    };

    const handleChange = (selectedValues) => {
        const selectedMemberObjects = members.filter(member => selectedValues.includes(member.fullName));
        setSelectedMembers(selectedMemberObjects);
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

    const getExportData = () => {
        if (!reportData) { return null; }
        return reportData.map(mp => ({
            "Name": mp.fullName,
            "SUID": mp.suid,
            "Term": mp.term,
            "Number of Meetings": mp.numberOfMeetings,
            "Number of Meetings Attended": mp.numberOfMeetingsAttended,
        }));
    }

    const exportExcel = () => {
        ReportUtils.exportExcel(getExportData, 'meeting_participation.xlsx');
    };

    const copyClipboard = () => {
        ReportUtils.copyClipboard(getExportData);
    };

    const namesOptions = members.map(item => ({
        label: item.fullName,
        value: item.fullName,
    }));

    const insideColumns = [columnMapping.fullName, columnMapping.suid, columnMapping.committee, columnMapping.term, columnMapping.numberOfMeetings, columnMapping.numberOfMeetingsAttended];

    return (
        <Spin spinning={isLoading}>
            <ProductHeader title="Meeting Participation" />
            {isFilterMode && (
                <div style={{ gap: '50px', display: 'flex' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <SearchField options={namesOptions} onChange={handleChange} title="Faculty Members" />
                    </div>
                    <div>
                        <Filter
                            filterProps={[
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
                    </div>
                </div>
            )}
            {!isFilterMode && (
                <div>
                    <ExportButtons handleCopy={copyClipboard} handleExcel={exportExcel} />
                    <TableSearch
                        columns={insideColumns}
                        data={reportData}
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

export default MeetingParticipation;
