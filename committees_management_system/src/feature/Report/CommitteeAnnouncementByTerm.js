import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import PrimaryButton from 'product/components/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import ProductHeader from 'product/components/ProductHeader';
import ExcelButton from 'product/components/ExcelButton';
import StringConstants from 'product/constants/StringConstants';
import TableExpandable from 'product/components/TableExpandable';
import { columnMapping } from 'product/constants/ColumnMapping';

const CommitteeAnnouncementByTerm = () => {
    const { term } = useParams();
    const [dataSource, setDataSource] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/assignments/getAllCommitteesWithMembersAndTerms?terms=${term}`);
                const committeesData = response.data;
                console.log(committeesData);
                const newData = Object.keys(committeesData).map(committeeId => {
                    return {
                        key: committeeId,
                        committeeId: committeeId,
                        committeeName: committeesData[committeeId][Object.keys(committeesData[committeeId])[0]].committee.committee,
                        members: Object.keys(committeesData[committeeId]).map(memberId => ({
                            key: memberId,
                            memberId: memberId,
                            memberName: committeesData[committeeId][memberId].member.fullName,
                            memberEmail: committeesData[committeeId][memberId].member.email,
                        })),
                    };
                });
                setDataSource(newData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const outsideColumns = [columnMapping.committeeName];

    const insideColumns = [
        columnMapping.memberId,
        columnMapping.memberName,
        columnMapping.memberEmail,
    ];

    const handleExportExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(dataSource.flatMap(record => {
            return [
                {
                    'Committee ID': record.committeeId,
                    'Committee Name': record.committeeName,
                    'Member ID': '',
                    'Member Name': '',
                    'Email': '',
                },
                ...record.members.map(member => ({
                    'Committee ID': '',
                    'Committee Name': '',
                    'Member ID': member.memberId,
                    'Member Name': member.memberName,
                    'Email': member.memberEmail,
                }))
            ];
        }));
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Committee Data');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'committee_data.xlsx');
    };

    const handleBackButtonClick = () => {
        navigate(`/committee-announcement`);
    };

    return (
        <div>
            <ProductHeader title="Committee Announcement" />
            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center' }}>
                <ExcelButton
                    onClick={handleExportExcel}
                    isEnabled={true}
                    style={{ marginRight: 16 }}
                />
                <PrimaryButton
                    title={StringConstants.SELECT_TERM}
                    onClick={handleBackButtonClick}
                    isEnabled={true}
                    style={{ marginRight: 16 }}
                />
            </div>
            <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}>
                <TableExpandable outsideColumns={outsideColumns} insideColumns={insideColumns} dataSource={dataSource} getNestedData={record => record.members} />
            </div>
        </div>


    );
};

export default CommitteeAnnouncementByTerm;


