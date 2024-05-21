import React, { useEffect, useState } from 'react';
import ProductHeader from 'product/components/ProductHeader';
import Picker from 'product/components/Picker';
import StringConstants from 'product/constants/StringConstants';
import PrimaryButton from 'product/components/PrimaryButton';
import Terms from 'assets/jsons/report/terms.json';
import CommitteeService from 'product/service/committees';
import { Spin } from 'antd';
import Filter from 'product/components/Filter';

const Committees = () => {
    const [committeesData, setCommitteesData] = useState([]);
    const [selectedCommittee, setSelectedCommittee] = useState(null);
    const [selectedTerms, setSelectedTerms] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isFilterMode, setIsFilterMode] = useState(true);
    const isFilterable = () => selectedCommittee != null && selectedTerms.length > 0;

    const fetchCommittees = async () => {
        try {
            setLoading(true);
            const response = await CommitteeService.getAll();
            const formattedData = response.data.map(committee => ({
                value: committee.id,
                label: committee.committee
            }));
            setCommitteesData(formattedData);
            setLoading(false);
        } catch (error) {
            alert(StringConstants.ERROR);
        }
    };

    useEffect(() => {
        fetchCommittees();
    }, []);

    const handleSelectedCommitteeChange = (committees) => {
        setSelectedCommittee(committees[0]);
    };

    const handleSelectedTermsChange = (terms) => {
        setSelectedTerms(terms);
    };

    const handleFilterButtonClick = () => {

        setIsFilterMode(false);
    }

    const handleBackButtonClick = () => {
        setSelectedCommittee(null);
        setSelectedTerms([]);
        setIsFilterMode(true);
    }

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
                            selected: selectedCommittee ? [selectedCommittee] : [],
                            multipleSelection: false
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
