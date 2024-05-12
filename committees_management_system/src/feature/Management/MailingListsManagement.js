import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import { saveAs } from 'file-saver';
import Header from 'product/components/Header';
import * as XLSX from 'xlsx';
import PrimaryButtonGreen from 'product/components/PrimaryButtonGreen';

const MailListTable = () => {
    const [mailListData, setMailListData] = useState(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

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
                // Set expanded row keys to all keys
                setExpandedRowKeys(Object.keys(organizedData));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchDataAndOrganize();
    }, []);

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

    const handleCopyToClipboard = () => {
        const jsonString = JSON.stringify(mailListData);
        navigator.clipboard.writeText(jsonString);
        message.success('Response copied to clipboard');
    };

    return (
        <div className='MailListTable'>
            <Header title="Mailing List" />
            <div style={{ display: 'flex', marginBottom: 16 }}>
                <PrimaryButtonGreen
                    title="Copy"
                    onClick={handleCopyToClipboard}
                    isEnabled={true}

                    style={{ marginRight: 16 }}
                />
                <PrimaryButtonGreen
                    title="Excel"
                    onClick={handleExportExcel}
                    isEnabled={true}
                    style={{ marginRight: 16 }}
                />
                
            </div>
            <Table
                columns={mainColumns}
                dataSource={mailListData ? Object.keys(mailListData).map(key => ({ listEmail: key })) : []}
                rowKey="listEmail"
                expandedRowKeys={expandedRowKeys}
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
        </div>
    );
};

export default MailListTable;
