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

                // Convert organizedData object to the desired format
                const newData = Object.entries(organizedData) // Filter out empty lists
                    .map(([key, value]) => ({
                        maillist: key,
                        children: value
                    }));

                setMailListData(newData);
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
            <Table
                columns={[{ title: 'Mail List', dataIndex: 'maillist', key: 'maillist' }]}
                dataSource={mailListData}
                expandable={{
                    // Make all rows expandable
                    rowExpandable: (record) => true,
                    // Render expanded row with nested table
                    expandedRowRender: (record) => (
                        <Table
                            columns={nestedColumns}
                            dataSource={record.children}
                            pagination={false}
                        />
                    )
                }}
            />
        </div>
    );
};

export default MailListTable;