import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

const MailListTable = () => {
    const [mailListData, setMailListData] = useState(null);

    useEffect(() => {
        async function fetchDataAndOrganize() {
            try {
                const response = await axios.get('http://localhost:8080/api/mailing-lists/getAll');
                
                // Object to store organized data
                const organizedData = {};

                // Iterate over response data
                response.data.forEach(item => {
                    const listEmail = item.listEmail;
                    
                    // If listEmail doesn't exist in organizedData, create a new entry
                    if (!organizedData[listEmail]) {
                        organizedData[listEmail] = [];
                    }
                    
                    // Push the item to its corresponding listEmail entry
                    organizedData[listEmail].push(item);
                });

                setMailListData(organizedData); // Set the state with organized data

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchDataAndOrganize();
    }, []);

    // Define columns for the nested table
    const nestedColumns = [
        { title: 'Suid', dataIndex: 'id', key: 'id', searchable: true },
        { title: 'Name', dataIndex: 'member', key: 'member', searchable: true },
        { title: 'Mail', dataIndex: 'memberEmail', key: 'memberEmail', searchable: true },
        { title: 'ListEmail', dataIndex: 'listEmail', key: 'listEmail', searchable: true },
        { title: 'Term', dataIndex: 'term', key: 'term', searchable: true },
    ];

    return (
        <div className='MailListTable'>
            {mailListData && Object.entries(mailListData).map(([listEmail, data]) => (
                <div key={listEmail}>
                    <h3>Email List: {listEmail}</h3>
                    <Table
                        columns={nestedColumns}
                        dataSource={data}
                        rowKey="id"
                        pagination={false}
                    />
                </div>
            ))}
        </div>
    );
};

export default MailListTable;
