import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import ProductHeader from 'product/components/ProductHeader';
import MailingListService from 'product/service/mailing_list';
import { columnMapping } from 'product/constants/ColumnMapping';
import TableExpandable from 'product/components/TableExpandable';
import ReportUtils from 'product/utils/report_utils';
import ExportButtons from 'product/components/ExportButtons';

const MailListTable = () => {
    const [mailListData, setMailListData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        setLoading(true);
        MailingListService.getAll()
            .then(response => {
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
            })
            .catch(error => {
                alert(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const insideColumns = [
        columnMapping.member,
        columnMapping.memberEmail,
    ];

    const outsideColumns = [columnMapping.listEmail];

    const getExportData = () => {
        if (!mailListData) { return null; }
        return mailListData.flatMap(item => item.elements);
    }

    const exportExcel = () => {
        ReportUtils.exportExcel(getExportData, 'mailing_list.xlsx');
    };

    const copyClipboard = () => {
        ReportUtils.copyClipboard(getExportData);
    };

    return (
        <Spin spinning={loading} className='MailListTable'>
            <ProductHeader title="Mailing List" />
            <ExportButtons handleCopy={copyClipboard} handleExcel={exportExcel} />
            <TableExpandable
                outsideColumns={outsideColumns}
                insideColumns={insideColumns}
                dataSource={mailListData}
                getNestedData={record => record.elements}
            />
        </Spin>
    );
};

export default MailListTable;
