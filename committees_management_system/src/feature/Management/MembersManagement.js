import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import PopupForm from 'product/components/PopupForm';
import ProductHeader from 'product/components/ProductHeader';
import { Spin } from 'antd'; 

import UNIVERSITY_PROGRAMS from 'product/constants/ProgramConstants';
import MembersService from 'product/service/members';
import StringConstants from 'product/constants/StringConstants';
import { wait } from '@testing-library/user-event/dist/utils';

const MembersManagement = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [popupTitle, setPopupTitle] = useState(null);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        MembersService.getAll()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false); // Set loading to false after data is fetched
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
            suid: values.suid,
            fullName: values.fullName,
            email: values.email,
            program: values.program,
            exclude: values.exclude === "Yes" ? true : false,
        };
        setLoading(true); 
        MembersService.update(updatedMember) 
        .then(response => {
            console.log(response);
            fetchData();
        })
        .catch(error => {
            alert(StringConstants.ERROR);
        })
        .finally(() => {
            setLoading(false); // Set loading to false after data is fetched
        });

        
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
        <Spin spinning={loading}>
           <ProductHeader title="Members Management" />
            <TableSearch columns={fields} data={data} />
            <PopupForm
                title={popupTitle}
                open={modalVisible}
                initialValues={initialValues} 
                onCancel={handleCancel}
                onFinish={handleEditMember}
                fields={[
                    { name: 'suid', label: 'SU ID', type: 'text', readOnly: true },
                    { name: 'fullName', label: 'Member Name', type: 'text', required: true },
                    { name: 'email', label: 'Email of User', type: 'text', required: false },
                    { name: 'program', label: 'Program Name', type: 'select', required: true, options: 
                    UNIVERSITY_PROGRAMS.map(program => ({ label: program, value: program }))},
                    { name: 'exclude', label: 'Exclude', type: 'select', required: true, options:
                     [{label: "Yes", value: "yes"}, {label: "No", value: "no"}] },
                ]}
            />
      </Spin>
    );
};

export default MembersManagement;
