import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SearchField from 'product/components/SearchField';
import Terms from 'assets/jsons/report/terms.json';
import Header from 'product/components/Header';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import { Table } from 'antd';

const AssignmentByTerm = () => {
    const { term } = useParams();
    const [mailListData, setMailListData] = useState(null);

    const navigate = useNavigate();



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
    }, [term]); // Ensure useEffect runs whenever 'term' changes

    const nestedColumns = [
        { title: 'Name', dataIndex: 'member', key: 'member', searchable: true },
        { title: 'Mail', dataIndex: 'memberEmail', key: 'memberEmail', searchable: true },
    ];

    const mainColumns = [
        { title: 'Email List', dataIndex: 'listEmail', key: 'listEmail' },
    ];


    const handleBackButtonClick = () => {
        // Navigate to the new page with the term information as a parameter
        navigate(`/mgmt-assignments`);
    };
    
    return (
        //<Header title={`Assignment In Term ${term}`} />
        <div className='MailListTable'>
            <Header title={`Assignment In Selected Terms`} />
            <PrimaryButton
                title="Back"
                onClick={handleBackButtonClick}
                isEnabled={true} style={undefined} />
            <Table
                columns={mainColumns}
                dataSource={mailListData ? Object.keys(mailListData).map(key => ({ listEmail: key })) : []}
                rowKey={(record, index) => index} // Use index as row key temporarily
                expandable={{
                    expandedRowRender: record => (
                        <Table
                            columns={nestedColumns}
                            dataSource={mailListData[record.listEmail]}
                            rowKey="id"
                            pagination={false} // Disable pagination for nested table
                        />
                    ),
                    rowExpandable: record => mailListData && mailListData[record.listEmail] && mailListData[record.listEmail].length > 0,
                }}
            />
        </div>
    );
};

export default AssignmentByTerm;
