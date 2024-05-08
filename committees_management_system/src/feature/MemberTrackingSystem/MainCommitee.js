import React, { useState } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import MemberRetirementStatus from 'assets/jsons/MembersTracking/MemberRetirementStatus.json';
import PopupForm from 'product/components/PopupForm';
import UNIVERSITY_PROGRAMS from 'product/constants/ProgramConstants';

const MainCommitee = () => {

    const [data, setData] = useState(MemberRetirementStatus);
    const [modalVisible, setModalVisible] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [popupTitle, setPopupTitle] = useState(null);
    const [facultyMember, setFacultyMember] = useState(null);

    const handleCancel = () => {
        setPopupTitle(null);
        setInitialValues(null);
        setModalVisible(false);
    };

    const handleRetire = (values) => {
        if (values.confirmation && values.confirmation.toUpperCase() === facultyMember.toUpperCase()) {
            console.log("Retiring member with ID: ", values);
            const updatedData = data.filter(item => item.id !== initialValues.id);
            setData(updatedData);
        }
        setModalVisible(false); // Close the modal after handling retirement
    };
    

    const handleRetireClick = (record) => {
        // When user clicks retire action, set modalVisible to true and set popupTitle
        setFacultyMember(record.facultyMember);
        setPopupTitle("Retire Member");
        setInitialValues(record);
        setModalVisible(true);
    };

    const fields = [
        columnMapping.id,
        columnMapping.facultyMember,
        columnMapping.email,
        columnMapping.program,
        columnMapping.duration, // Add duration field
        columnMapping.startedAt, // Add startedAt field
        columnMapping.expectedRetirement, // Add expectedRetirement field
        columnMapping.action(null, handleRetireClick), // Use handleRetireClick for retire action
    ];

    return (
        <div>
            <TableSearch columns={fields} data={data} />
            <PopupForm
                title={popupTitle}
                open={modalVisible}
                initialValues={initialValues}
                onCancel={handleCancel}
                onFinish={handleRetire}
                fields={[
                    {
                        rules: [{ required: true, message: 'Please input confirmation!' }],
                        name: 'confirmation',
                        label: <span>Type <strong>{facultyMember}</strong> to confirm retirement</span>,
                        type: 'text',
                        required: true,
                    },
                ]}
            />
        </div>
    );
};

export default MainCommitee;
