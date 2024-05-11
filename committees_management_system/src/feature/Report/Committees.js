import React, { useEffect, useState } from 'react';
import Header from 'product/components/Header';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import Terms from 'assets/jsons/report/terms.json';
import StringConstants from 'product/constants/StringConstants';
import TableInsideTable from 'product/components/TableInsideTable';
import { columnMapping } from 'product/constants/ColumnMapping';
import CommitteesService from 'product/service/committees';
import AssignmentsService from 'product/service/assignments';

const Committees = () => {
    const [selectedCommittees, setSelectedCommittees] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [committeesCollapsed, setCommitteesCollapsed] = useState(false);
    const [termsCollapsed, setTermsCollapsed] = useState(false);
    const [committeesData, setCommitteesData] = useState([]);
    const [assignmentsData, setAssignmentsData] = useState([]);

    useEffect(() => {
        getCommitteesData();
    }, []);

    const getCommitteesData = async () => {
        try {
            const response = await CommitteesService.getAll();
            if (Array.isArray(response.data)) {
                const committees = response.data.map(item => item.committee);
                setCommitteesData(committees);
            } else {
                throw new Error('Received invalid data from the server.');
            }
        } catch (error) {
            alert(StringConstants.ERROR);
            console.error('Error fetching committees data:', error);
        }
    };

    const handleCommitteeChange = (committees) => {
        setSelectedCommittees(committees);
        setIsButtonEnabled(committees.length > 0 && selectedTerms.length > 0);
    };

    const handleTermChange = (terms) => {
        setSelectedTerms(terms);
        setIsButtonEnabled(selectedCommittees.length > 0 && terms.length > 0);
    };

    const handleButtonClick = () => {
        setIsFiltered(true);
        setCommitteesCollapsed(true);
        setTermsCollapsed(true);
        // getAssignmentsData();
    };

    const outsideColumns = [columnMapping.committee];
    const insideColumns = [columnMapping.facultyMember, columnMapping.program, columnMapping.terms];

    // Transform selectedCommittees into an array of objects
    const committeeData = selectedCommittees.map((committee, index) => ({
        key: index.toString(),
        committee: committee,
    }));

    return (
        <div>
            <Header title="Committees" />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <Picker
                    title={StringConstants.SELECT_COMMITTEE}
                    items={committeesData}
                    onChange={handleCommitteeChange}
                    selected={selectedCommittees}
                    isCollapsed={committeesCollapsed}
                    onCollapseToggle={() => setCommitteesCollapsed(!committeesCollapsed)}
                />
                <Picker
                    title={StringConstants.SELECT_TERM}
                    items={Terms}
                    onChange={handleTermChange}
                    selected={selectedTerms}
                    isCollapsed={termsCollapsed}
                    onCollapseToggle={() => setTermsCollapsed(!termsCollapsed)}
                />
                <PrimaryButton
                    title={StringConstants.SUBMIT}
                    onClick={handleButtonClick}
                    isEnabled={isButtonEnabled}
                    style={{ marginTop: '15px' }}
                />
            </div>
            {isFiltered && <TableInsideTable outsideColumns={outsideColumns} insideColumns={insideColumns} outsideData={committeeData} insideData = {null}/>}
        </div>
    );
};

export default Committees;
