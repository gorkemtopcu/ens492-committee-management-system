import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import StringConstants from 'product/constants/StringConstants';
import RetiredMemberService from 'product/service/retired_member';

const RetirementHistory = () => {
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState([]);


    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        RetiredMemberService.getAll()
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
        <div>
            <TableSearch columns={fields} data={data} />
        </div>
    );
};

export default RetirementHistory;
