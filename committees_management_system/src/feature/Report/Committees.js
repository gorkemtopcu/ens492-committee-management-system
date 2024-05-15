import React, { useEffect, useState } from 'react';
import ProductHeader from 'product/components/ProductHeader';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import Terms from 'assets/jsons/report/terms.json';
import StringConstants from 'product/constants/StringConstants';
import TableExpandable from 'product/components/TableExpandable';
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
    };

    const outsideColumns = [columnMapping.committee];
    const insideColumns = [columnMapping.facultyMember, columnMapping.program, columnMapping.terms];

    const inside = [];
    for (let i = 0; i < 3; ++i) {
        inside.push({
            key: i.toString(),
            date: '2014-12-24 23:12:00',
            name: 'This is production name',
            upgradeNum: 'Upgraded: 56',
        });
    }

    const outside = [];
    for (let i = 0; i < 3; ++i) {
        outside.push({
            key: i.toString(),
            name: 'Screen',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00',
        });
    }

    return (
        <div>
            <ProductHeader title="Committees" />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <Picker
                    title={StringConstants.SELECT_COMMITTEE}
                    items={committeesData}
                    onChange={handleCommitteeFilterChange}
                    selected={selectedCommittees}
                    isCollapsed={committeesCollapsed}
                    onCollapseToggle={() => setCommitteesCollapsed(!committeesCollapsed)}
                    isMultipleSelectable={true}
                />
                <Picker
                    title={StringConstants.SELECT_TERM}
                    items={Terms}
                    onChange={handleTermFilterChange}
                    selected={selectedTerms}
                    isCollapsed={termsCollapsed}
                    onCollapseToggle={() => setTermsCollapsed(!termsCollapsed)}
                    isMultipleSelectable={true}
                />
                <PrimaryButton
                    title={StringConstants.SUBMIT}
                    onClick={handleButtonClick}
                    isEnabled={isButtonEnabled}
                    style={{ marginTop: '15px' }}
                />
            </div>
            {isFiltered && <TableExpandable outsideColumns={outsideColumns} insideColumns={insideColumns} outsideData={outside} insideData={inside} />}
        </div>
    );
};

export default Committees;
