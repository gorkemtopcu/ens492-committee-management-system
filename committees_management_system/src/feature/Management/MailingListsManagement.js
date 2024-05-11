import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Terms from 'assets/jsons/report/terms.json';
import StringConstants from 'product/constants/StringConstants';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';

const MailingListTable = () => {
    const [mailingLists, setMailingLists] = useState([]);
    const [columns, setColumns] = useState([]); // Define state for columns
  
    useEffect(() => {
      fetchData();
      setColumns([
        {
          title: 'Member',
          dataIndex: 'member',
          key: 'member',
          searchable: true, // Enable searching for this column
        },
        {
          title: 'Member Email',
          dataIndex: 'memberEmail',
          key: 'memberEmail',
          searchable: true, // Enable searching for this column
        },
        {
          title: 'List Email',
          dataIndex: 'listEmail',
          key: 'listEmail',
          searchable: true, // Enable searching for this column
        },
        {
          title: 'Term',
          dataIndex: 'term',
          key: 'term',
          searchable: true, // Enable searching for this column
        },
      ]);
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/mailing-lists/getAll');
        setMailingLists(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div>
        <h1>Mailing List Table</h1>
        <TableSearch columns={columns} data={mailingLists} /> {/* Render the TableSearch component */}
      </div>
    );
  };
  
  export default MailingListTable;