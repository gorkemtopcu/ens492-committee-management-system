import Header from 'product/components/Header';
import TableSearch from 'product/components/TableSearch';
import React from 'react';
import { columnMapping } from 'product/constants/ColumnMapping';
import MemberManagement from 'assets/jsons/Management/MemberManagement.json';


const MembersManagement = () => {
    const handleEdit = (record) => {
        // Define your handleEdit logic here
    };
    const fields = [columnMapping.id, columnMapping.facultyMember, columnMapping.email, columnMapping.program, columnMapping.exclude, columnMapping.action(handleEdit, null)];

    return (
        <div>
            <Header title="Members Management" />
            <TableSearch columns={fields} data={MemberManagement} />
        </div>
    );
};

export default MembersManagement;