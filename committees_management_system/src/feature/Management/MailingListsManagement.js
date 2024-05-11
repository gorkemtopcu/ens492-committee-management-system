import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Terms from 'assets/jsons/report/terms.json';
import StringConstants from 'product/constants/StringConstants';
import TableDisplayOnly from 'product/components/TableDisplayOnly';
import { columnMapping } from 'product/constants/ColumnMapping';

const MailingListTable = () => {
    const [mailingLists, setMailingLists] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mailing-lists/getAll');
        const sortedMailingLists = response.data.sort((a, b) => {
          if (a.listEmail < b.listEmail) return -1;
          if (a.listEmail > b.listEmail) return 1;
          return 0;
        });
        setMailingLists(sortedMailingLists);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Define columns for the table
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'Member',
        dataIndex: 'member',
        key: 'member',
      },
      {
        title: 'Member Email',
        dataIndex: 'memberEmail',
        key: 'memberEmail',
      },
      {
        title: 'List Email',
        dataIndex: 'listEmail',
        key: 'listEmail',
      },
      {
        title: 'Term',
        dataIndex: 'term',
        key: 'term',
      },
    ];
  
    return (
      <div>
        <h1>Mailing List Table</h1>
        <TableDisplayOnly columns={columns} data={mailingLists} onChange={undefined} />
      </div>
    );
  };
  
  export default MailingListTable;