import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import { saveAs } from 'file-saver';
import PrimaryButton from 'product/components/PrimaryButton';
import * as XLSX from 'xlsx';
import ProductHeader from 'product/components/ProductHeader';
import ExcelButton from 'product/components/ExcelButton';
import CopyButton from 'product/components/CopyButton';
import StringConstants from 'product/constants/StringConstants';

const AssignmentByTerm = () => {
    const { term } = useParams();
    const [mailListData, setMailListData] = useState(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchDataAndOrganize() {
            try {
                const response = await axios.get('http://localhost:8080/api/mailing-lists/getAll');
                const organizedData = {};
                response.data.forEach(item => {
                    const listEmail = item.listEmail;
                    if (!organizedData[listEmail]) {
                        organizedData[listEmail] = [];
                    }
                    organizedData[listEmail].push(item);
                });
                setMailListData(organizedData);
                setExpandedRowKeys(Object.keys(organizedData));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchDataAndOrganize();
    }, [term]);

    const nestedColumns = [
        { title: 'Name', dataIndex: 'member', key: 'member', searchable: true },
        { title: 'Mail', dataIndex: 'memberEmail', key: 'memberEmail', searchable: true },
    ];

    const mainColumns = [
        { title: 'Email List', dataIndex: 'listEmail', key: 'listEmail' },
    ];

    const handleExportExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(Object.values(mailListData).flat());
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Mailing List');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'mailing_list.xlsx');
    };

    const handleBackButtonClick = () => {
        navigate(`/mgmt-assignments`);
    };

    const handleCopyToClipboard = () => {
        const jsonString = JSON.stringify(mailListData);
        navigator.clipboard.writeText(jsonString);
        message.success('Response copied to clipboard');
    };

    return (
        <div className='MailListTable'>
            <ProductHeader title={`Assignment In Selected Terms`} />
            <div style={{ display: 'flex', marginBottom: 16 }}>
                <CopyButton
                    onClick={handleCopyToClipboard}
                    isEnabled={true}
                    style={{ marginRight: 16 }}
                />
                <ExcelButton
                    onClick={handleExportExcel}
                    isEnabled={true}
                    style={{ marginRight: 16 }}
                />
            </div>
            <Table
                columns={mainColumns}
                dataSource={mailListData ? Object.keys(mailListData).map(key => ({ listEmail: key })) : []}
                rowKey="listEmail"
                expandable={{
                    expandedRowRender: record => (
                        <Table
                            columns={nestedColumns}
                            dataSource={mailListData[record.listEmail]}
                            rowKey="id"
                            pagination={false}
                        />
                    ),
                    onExpand: (expanded, record) => {
                        setExpandedRowKeys(expanded ? [...expandedRowKeys, record.listEmail] : expandedRowKeys.filter(key => key !== record.listEmail));
                    },
                }}
            />
            <PrimaryButton
                title={StringConstants.BACK}
                onClick={handleBackButtonClick}
                isEnabled={true}
                style={{ marginRight: 16 }}
            />
        </div>
    );
};

export default AssignmentByTerm;
