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
    const [mailListData, setMailListData] = useState(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        MailingListService.getAll()
            .then(response => {
                const organizedData = {};
                response.data.forEach(element => {
                    let listEmail = element.listEmail
                    if (!organizedData[listEmail]) {
                        organizedData[listEmail] = [];
                    }
                    organizedData[listEmail].push(element);
                });
                console.log(organizedData);
                setMailListData(organizedData);
            })
            .catch(error => {
                alert(error);
            });
    };

    const insideColumns = [
        columnMapping.member,
        columnMapping.memberEmail,
    ];

    const outsideColumns = [columnMapping.listEmail];

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
                dataSource={mailListData ? Object.keys(mailListData).map(key => ({ listEmail: key })) : []}
                getNestedData={record => mailListData[record.listEmail]}
            />
        </div>
    );
};

export default MailListTable;
