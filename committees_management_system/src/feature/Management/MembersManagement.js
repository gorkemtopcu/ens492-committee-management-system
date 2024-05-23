import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import PopupForm from 'product/components/PopupForm';
import ProductHeader from 'product/components/ProductHeader';
import { Spin, notification } from 'antd';
import MembersService from 'product/service/members';
import StringConstants from 'product/constants/StringConstants';

const MembersManagement = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [popupTitle, setPopupTitle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        fetchData();
        fetchPrograms();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        MembersService.getAll()
            .then(response => {
                response.data.map(e => { if (e.exclude === null) { e.exclude = false; } });
                setData(response.data);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchPrograms = async () => {
        setLoading(true);
        MembersService.getAll()
            .then(response => {
                setPrograms(response.data.map(e => e.program));
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
            });
    }

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
            exclude: values.exclude,
        };

        console.log(updatedMember);

        setLoading(true);
        MembersService.update(updatedMember)
            .then(response => {
                notification.success({
                    message: StringConstants.SUCCESS,
                    description: 'Member editted successfully',
                });
                fetchData();
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
                handleCancel();
            });
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
                    {
                        name: 'program', label: 'Program Name', type: 'select', required: false, options:
                            programs.map(program => ({ label: program, value: program }))
                    },
                    {
                        name: 'exclude', label: 'Exclude', type: 'select', required: true, options:
                            [{ label: "Yes", value: true }, { label: "No", value: false }]
                    },
                ]}
            />
        </Spin>
    );
};

export default MembersManagement;
