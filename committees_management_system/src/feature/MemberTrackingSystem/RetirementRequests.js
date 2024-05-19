import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import StringConstants from 'product/constants/StringConstants';
import RetiredMemberService from 'product/service/retired_member';
import { Button, Spin } from 'antd';
import RetirementRequestService from 'product/service/retirement_request';
import COLORS from 'product/constants/ColorConstants';

const RetirementRequest = () => {
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState([]);


    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        RetirementRequestService.getAllInRetirement()
        .then(response => {
                setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after data is fetched
            });
    };

    const handleRetirementProcess = (values) => {  };

    const fields = [
        columnMapping.requestId,
        columnMapping.suid,
        columnMapping.requestDate,
        columnMapping.closed,
        columnMapping.status,
        columnMapping.retirementProcess(handleRetirementProcess),
    ];

    return (
        <Spin spinning={loading}>
            <TableSearch columns={fields} data={data} />
        </Spin>
    );
};

export default RetirementRequest;
