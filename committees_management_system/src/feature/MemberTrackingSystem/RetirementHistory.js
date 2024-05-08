import React, { useState } from 'react';
import TableSearch from 'product/components/TableSearch';
// @ts-ignore
import { columnMapping } from 'product/constants/RetirementMapping'
import MemberRetirementStatus from 'assets/jsons/RetirementHistory/RetirementHistory.json';
import PopupForm from 'product/components/PopupForm';
import UNIVERSITY_PROGRAMS from 'product/constants/ProgramConstants';

const RetirementHistory = () => {
    // No need for useState if data is static
    const data = MemberRetirementStatus;

    const fields = [
        columnMapping.id,
        columnMapping.facultyMember,
        columnMapping.email,
        columnMapping.program,
        columnMapping.duration, // Assuming this field exists in your JSON data
        columnMapping.startedAt, // Assuming this field exists in your JSON data
        columnMapping.expectedRetirement, // Assuming this field exists in your JSON data
        columnMapping.status,
        columnMapping.relateddocuments
    ];

    return (
        <div>
            {/* Pass columns and data to TableSearch */}
            <TableSearch columns={fields} data={data} />
        </div>
    );
};

export default RetirementHistory;
