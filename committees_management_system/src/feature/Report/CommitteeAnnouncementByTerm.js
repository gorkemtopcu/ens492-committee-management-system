import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import PrimaryButton from 'product/components/PrimaryButton';
import { useNavigate, useParams } from 'react-router-dom';
import ProductHeader from 'product/components/ProductHeader';
import ExcelButton from 'product/components/ExcelButton';

const CommitteeAnnouncementByTerm = () => {
    const { term } = useParams();
    const [dataSource, setDataSource] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/assignments/getAllCommitteesWithMembersAndTerms?terms=${term}`);
                const committeesData = response.data;
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
                setExpandedRowKeys(newData.map(record => record.key)); // Expand all rows by default
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error
            }
        };

        fetchData();
    }, []);

    const mainColumns = [
        { title: 'Committee Name', dataIndex: 'committeeName', key: 'committeeName' },
    ];

    const nestedColumns = [
        { title: 'Member ID', dataIndex: 'memberId', key: 'memberId' },
        { title: 'Member Name', dataIndex: 'memberName', key: 'memberName' },
        { title: 'Email', dataIndex: 'memberEmail', key: 'memberEmail' },
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
                    title="Change Term"
                    onClick={handleBackButtonClick}
                    isEnabled={true}
                    icon={"faCoffee"}
                    style={{ marginRight: 16 }}
                />
            </div>
            <div style={{ overflow: 'auto', maxHeight: 'calc(100vh - 200px)' }}> {/* Adjust the height as needed */}
                <Table
                    columns={mainColumns}
                    dataSource={dataSource}
                    pagination={false} // Disable pagination
                    scroll={{ x: true }} // Enable horizontal scrolling if needed
                    expandable={{
                        expandedRowRender: record => (
                            <Table
                                columns={nestedColumns}
                                dataSource={record.members}
                                pagination={false} // Disable pagination for nested table
                            />
                        ),
                        expandedRowKeys: expandedRowKeys,
                        onExpand: (expanded, record) => {
                            setExpandedRowKeys(expanded ? [...expandedRowKeys, record.key] : expandedRowKeys.filter(key => key !== record.key));
                        },
                    }}
                />
            </div>
            <PrimaryButton
                title="Back"
                onClick={handleBackButtonClick}
                isEnabled={true}
                style={{ marginRight: 16 }}
            />
        </div>


    );
};

export default CommitteeAnnouncementByTerm;


