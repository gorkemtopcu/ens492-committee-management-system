import React, { useState } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import MemberManagement from 'assets/jsons/Management/MemberManagement.json';
import PopupForm from 'product/components/PopupForm';
import Header from 'product/components/Header';
import UNIVERSITY_PROGRAMS from 'product/constants/ProgramConstants';

const MembersManagement = () => {
    const [data, setData] = useState(MemberManagement);
    const [modalVisible, setModalVisible] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [popupTitle, setPopupTitle] = useState(null);
    const [status, setStatus] = useState(true); // Boolean state for status

    const handleEdit = (record) => {
        setPopupTitle("Edit Member");
        setInitialValues(record);
        setModalVisible(true);
    };

    const handleCancel = () => {
        setPopupTitle(null);
        setInitialValues(null);
        setModalVisible(false);
    };

    const handleEditMember = (values) => {
        if (!values) {
            return;
          }
      
        const updatedMember = {
            ...initialValues,
            facultyMember: values.facultyMember,
            email: values.email,
            program: values.program,
            exclude: values.exclude === "Yes" ? true : false,
        };
      
          const updatedData = data.map(item => {
            if (item.id === initialValues.id) {
              return updatedMember;
            }
            return item;
          });
      
          setData(updatedData);
          handleCancel();
    };

    const toggleStatus = () => {
        setStatus(!status);
    };

    const fields = [
        columnMapping.id,
        columnMapping.facultyMember,
        columnMapping.email,
        columnMapping.program,
        columnMapping.exclude,
        columnMapping.action(handleEdit, null),
    ];

    return (
        <div>
            <Header title="Members Management" />
            <TableSearch columns={fields} data={data} />
            <PopupForm
                title={popupTitle}
                open={modalVisible}
                initialValues={initialValues} // Pass initialValues to PopupForm
                onCancel={handleCancel}
                onFinish={handleEditMember}
                fields={[
                    { name: 'facultyMember', label: 'Member Name', type: 'text', required: true },
                    { name: 'email', label: 'Email of User', type: 'text', required: false },
                    { name: 'program', label: 'Program Name', type: 'select', required: true, options: UNIVERSITY_PROGRAMS },
                    { name: 'exclude', label: 'Exclude', type: 'select', required: true, options: ["Yes", "No"] },
                ]}
            />
        </div>
    );
};

export default MembersManagement;
