import { Spin } from 'antd';
import Filter from 'product/components/Filter';
import ProductHeader from 'product/components/ProductHeader';
import StringConstants from 'product/constants/StringConstants';
import CommitteeService from 'product/service/committees';
import Terms from 'assets/jsons/report/terms.json';
import React, { useEffect } from 'react';
import { useState } from 'react';
import PrimaryButton from 'product/components/PrimaryButton';
import { columnMapping } from 'product/constants/ColumnMapping';
import MeetingsService from 'product/service/meetings';
import TableSearch from 'product/components/TableSearch';

const ListMeeting = () => {
    const [reportData, setReportData] = useState([]);
    const [committeesData, setCommitteesData] = useState([]);
    const [selectedCommittees, setSelectedCommittees] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isFilterMode, setIsFilterMode] = useState(true);
    const isFilterable = () => selectedCommittees.length > 0 && selectedTerms.length > 0;

    useEffect(() => {
        fetchCommittees();
    }, []);

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
            const response = await MeetingsService.getByCommitteeAndTerm(
                selectedCommittees.map(c => c.value),
                selectedTerms.map(t => t.value)
            );
        
            // Format each meeting in the response
            const formattedData = response.data.map(meeting => ({
                id: meeting.id,
                committee: meeting.committee,
                date: new Date(meeting.date).toLocaleString(), // Convert date to a readable format
                place: meeting.place,
                participants: meeting.participants, // Convert participants array to a comma-separated string
                guests: meeting.guests,
                subject: meeting.subject,
                decisions: meeting.decisions,
                nextMeetingDate: new Date(meeting.nextMeetingDate).toLocaleString(), // Convert nextMeetingDate to a readable format
                createdBy: meeting.createdBy,
                createdAt: new Date(meeting.createdAt).toLocaleString(), // Convert createdAt to a readable format
                attachment: meeting.attachment
            }));
            setReportData(formattedData); // Set the formatted data to the state
            console.log(formattedData); // Log the formatted data
            setLoading(false);
        } catch (error) {
            alert(StringConstants.ERROR);
            setLoading(false);
        }
        
    };

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
    
    const columns = [columnMapping.id, columnMapping.committee, columnMapping.date, columnMapping.place, 
        columnMapping.participants, columnMapping.guests, columnMapping.subject, columnMapping.decisions, 
        columnMapping.nextMeetingDate, columnMapping.createdBy, columnMapping.createdAt, columnMapping.attachment];

    return (
        <Spin spinning={isLoading}>
            <ProductHeader title= {StringConstants.LIST_MEETING} />
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
                <TableSearch columns={columns} data={reportData}/>
                <PrimaryButton
                    title={StringConstants.BACK}
                    onClick={handleBackButtonClick}
                    style={{ marginTop: '30px' }}
                />
            </div>)}
        </Spin>
    );
};

export default ListMeeting;
