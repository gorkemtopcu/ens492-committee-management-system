import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import Header from 'product/components/Header';



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
        //{ title: 'Suid', dataIndex: 'id', key: 'id', searchable: true },
        { title: 'Name', dataIndex: 'member', key: 'member', searchable: true },
        { title: 'Mail', dataIndex: 'memberEmail', key: 'memberEmail', searchable: true },
        //{ title: 'ListEmail', dataIndex: 'listEmail', key: 'listEmail', searchable: true },
        //{ title: 'Term', dataIndex: 'term', key: 'term', searchable: true },
    ];

    // Define columns for the main table
    const mainColumns = [
        { title: 'Email List', dataIndex: 'listEmail', key: 'listEmail' },
    ];

    return (
        <div className='MailListTable'>
            <Header title="Mailing List" />
            <Table
                columns={mainColumns}
                dataSource={mailListData ? Object.keys(mailListData).map(key => ({ listEmail: key })) : []}
                rowKey="listEmail"
                expandable={{
                    expandedRowRender: record => (
                        <Table
                            columns={nestedColumns}
                            dataSource={mailListData[record.listEmail]}
                            rowKey="id"
                            pagination={false}
                        />
                    ),
                    rowExpandable: record => mailListData[record.listEmail] && mailListData[record.listEmail].length > 0,
                    
                }}
                
                
            />
        </div>
    );
};

export default MailListTable;
