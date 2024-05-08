import Header from 'product/components/Header';
import TableSearch from 'product/components/TableSearch';
import React from 'react';
import { generateColumns } from 'product/constants/ColumnMapping';
import MemberManagement from 'assets/jsons/Management/MemberManagement.json';


const MembersManagement = () => {
    const fields = ['id', 'facultyMember', 'email', 'program', 'exclude', 'action'];
    const handleEdit = (record) => {
        // Define your handleEdit logic here
    };

    const handleDelete = (record) => {
        // Define your handleDelete logic here
    };

    return (
        <div>
            <Header title="Members Management"/>
            <TableSearch columns={generateColumns(fields, handleEdit, handleDelete, true, false)} data={MemberManagement} />
        </div>
    );
};

export default MembersManagement;