import Header from 'product/components/Header';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import React, { useState } from 'react';
import Programs from 'assets/jsons/report/programs.json';
import Terms from 'assets/jsons/report/terms.json';
import StringConstants from 'product/constants/StringConstants';
import TableSearch from 'product/components/TableSearch';
import AssignmentsData from 'assets/jsons/report/assignments.json';
import { columnMapping } from 'product/constants/ColumnMapping';

const Committees = () => {
    const [selectedCommittees, setSelectedCommittees] = useState([]);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [isFiltered, setIsFiltered] = useState(false);
    const [committeesCollapsed, setCommitteesCollapsed] = useState(false);
    const [termsCollapsed, setTermsCollapsed] = useState(false);

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
    };

    const tableColumns = [columnMapping.facultyMember, columnMapping.program, columnMapping.terms];

    return (
        <div>
            <Header title="Committees" />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <Picker
                    title={StringConstants.SELECT_COMMITTEE}
                    items={Programs}
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
            {isFiltered && <TableSearch columns={tableColumns} data={AssignmentsData} />}
        </div>
    );
};

export default Committees;