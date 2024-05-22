import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import StringConstants from 'product/constants/StringConstants';
import { Spin } from 'antd';
import RetirementRequestService from 'product/service/retirement_request';

const RetirementHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        RetirementRequestService.getAllRetiredInfo()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fields = [
        columnMapping.suid,
        columnMapping.fullName,
        columnMapping.email,
        columnMapping.program,
        columnMapping.duration,
        columnMapping.createdAt,
        columnMapping.earlyRetirement,
        columnMapping.retired
    ];

    return (
        <Spin spinning={loading}>
            <TableSearch columns={fields} data={data} />
        </Spin>
    );
};

export default RetirementHistory;
