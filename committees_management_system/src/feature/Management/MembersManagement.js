import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import PopupForm from 'product/components/PopupForm';
import Header from 'product/components/Header';

import UNIVERSITY_PROGRAMS from 'product/constants/ProgramConstants';
import MembersService from 'product/service/members';
import StringConstants from 'product/constants/StringConstants';

const MembersManagement = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [popupTitle, setPopupTitle] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        MembersService.getAll()
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            });
    };

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
    }
    const fields = [
        columnMapping.suid,
        columnMapping.fullName,
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
                    { name: 'suid', label: 'SU ID', type: 'text', readOnly: true },
                    { name: 'fullName', label: 'Member Name', type: 'text', required: true },
                    { name: 'email', label: 'Email of User', type: 'text', required: false },
                    { name: 'program', label: 'Program Name', type: 'select', required: true, options: UNIVERSITY_PROGRAMS },
                    { name: 'exclude', label: 'Exclude', type: 'select', required: true, options: ["Yes", "No"] },
                ]}
            />
        </div>
    );
};

export default MembersManagement;
