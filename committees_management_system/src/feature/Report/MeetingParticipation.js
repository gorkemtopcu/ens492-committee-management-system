import React, { useState, useEffect } from 'react';
import SearchField from 'product/components/SearchField';
import Terms from 'assets/jsons/report/terms.json';
import ProductHeader from 'product/components/ProductHeader';
import PrimaryButton from 'product/components/PrimaryButton';
import StringConstants from 'product/constants/StringConstants';
import MembersService from 'product/service/members';
import { Spin } from 'antd';
import TableExpandable from 'product/components/TableExpandable';
import { columnMapping } from 'product/constants/ColumnMapping';
import Filter from 'product/components/Filter';
import TableSearch from 'product/components/TableSearch';
import MeetingsService from 'product/service/meetings';

const MeetingParticipation = () => {
    const [members, setMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [reportData, setReportData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isFilterMode, setIsFilterMode] = useState(true);

    const isFilterable = () => selectedTerms.length > 0 && selectedMembers.length > 0;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        MembersService.getAll()
            .then(response => setMembers(response.data))
            .catch(error => {
                alert(StringConstants.ERROR);
            });
    };

    const fetchReportData = async () => {
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
            });
    };

    const handleChange = (selectedValues) => {
        const selectedMemberObjects = members.filter(member => selectedValues.includes(member.fullName));
        setSelectedMembers(selectedMemberObjects);
        setIsButtonEnabled(selectedValues.length > 0);
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
