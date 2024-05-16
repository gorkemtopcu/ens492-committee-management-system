import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import ProductHeader from 'product/components/ProductHeader';
import CopyButton from 'product/components/CopyButton';
import ExcelButton from 'product/components/ExcelButton';
import MailingListService from 'product/service/mailing_list';
import { columnMapping } from 'product/constants/ColumnMapping';
import TableExpandable from 'product/components/TableExpandable';

const MailListTable = () => {
    const [mailListData, setMailListData] = useState([]);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        try {
            const response = await MailingListService.getAll();
            const emailMap = {};

            response.data.forEach(element => {
                const { listEmail } = element;
                if (!emailMap[listEmail]) {
                    emailMap[listEmail] = [];
                }
                emailMap[listEmail].push(element);
            });

            const organizedData = Object.keys(emailMap).map(email => ({
                listEmail: email,
                elements: emailMap[email],
                key: email 
            }));
            setMailListData(organizedData);
        } catch (error) {
            alert(error);
        }
    };

    const insideColumns = [
        columnMapping.member,
        columnMapping.memberEmail,
    ];

    const outsideColumns = [columnMapping.listEmail];

    const handleExportExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(mailListData.flatMap(item => item.elements));
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
            <ProductHeader title="Mailing List" />
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
            <TableExpandable
                outsideColumns={outsideColumns}
                insideColumns={insideColumns}
                dataSource={mailListData}
                getNestedData={record => record.elements}
            />
        </div>
    );
};

export default MailListTable;
