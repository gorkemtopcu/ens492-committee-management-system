import React, { useEffect, useState } from 'react';
import ProductHeader from 'product/components/ProductHeader';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import Terms from 'assets/jsons/report/terms.json';
import StringConstants from 'product/constants/StringConstants';
import TableExpandable from 'product/components/TableExpandabke';
import { columnMapping } from 'product/constants/ColumnMapping';
import CommitteesService from 'product/service/committees';

const Committees = () => {
    const [selectedCommittees, setSelectedCommittees] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [committeesCollapsed, setCommitteesCollapsed] = useState(false);
    const [termsCollapsed, setTermsCollapsed] = useState(false);
    const [committeesData, setCommitteesData] = useState([]);
    const [committeesIdMap, setCommitteesIdMap] = useState([]);
    const [assignmentsData, setAssignmentsData] = useState([]);

    useEffect(() => {
        getCommitteesData();
    }, []);

    const getCommitteesData = async () => {
        try {
            const response = await CommitteesService.getAll();
            if (Array.isArray(response.data)) {
                setCommitteesData(response.data.map(item => item.committee));
            } else {
                throw new Error('Received invalid data from the server.');
            }
        } catch (error) {
            alert(StringConstants.ERROR);
            console.error('Error fetching committees data:', error);
        }
    };


    const getAssignmentsData = async () => {
        // try {
        //     const response = await AssignmentsService.searchByCommitteeAndTerm(selectedCommittees, selectedTerms);
        //     const assignmentsData = response.data;
        //     const mappedData = [];

        //     Object.values(assignmentsData).forEach(committee => {
        //         Object.values(committee).forEach(member => {
        //             const mappedItem = {
        //                 facultyMember: member.member.fullName,
        //                 program: member.member.program,
        //                 terms: member.terms
        //             };

        //             mappedData.push(mappedItem);
        //         });
        //     });
        //     setAssignmentsData(mappedData);
        //     console.log(mappedData);
        // } catch (error) {
        //     alert(StringConstants.ERROR);
        // }
    };


    const handleCommitteeFilterChange = (committees) => {
        setSelectedCommittees(committees);
        setIsButtonEnabled(committees.length > 0 && selectedTerms.length > 0);
    };

    const handleTermFilterChange = (terms) => {
        setSelectedTerms(terms);
        setIsButtonEnabled(selectedCommittees.length > 0 && terms.length > 0);
    };

    const handleButtonClick = () => {
        setIsFiltered(true);
        setCommitteesCollapsed(true);
        setTermsCollapsed(true);
        getAssignmentsData();
    };

    const outsideColumns = [columnMapping.committee];
    const insideColumns = [columnMapping.facultyMember, columnMapping.program, columnMapping.terms];

    const committeeData = assignmentsData.map((committee) => ({
        committee: committee,
    }));

    return (
        <div>
            <ProductHeader title="Committees" />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <Picker
                    title={StringConstants.SELECT_COMMITTEE}
                    items={committeesData.map(item => item.committee)}
                    onChange={handleCommitteeFilterChange}
                    selected={selectedCommittees}
                />
                <Picker
                    title={StringConstants.SELECT_TERM}
                    items={Terms}
                    onChange={handleTermFilterChange}
                    selected={selectedTerms}
                />
                <PrimaryButton
                    title={StringConstants.SUBMIT}
                    onClick={handleButtonClick}
                    isEnabled={isButtonEnabled}
                    style={{ marginTop: '15px' }}
                />
            </div>
            {isFiltered && <TableExpandable outsideColumns={outsideColumns} insideColumns={insideColumns} outsideData={committeeData} insideData={null} />}
        </div>
    );
};

export default Committees;
