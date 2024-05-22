import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import StringConstants from 'product/constants/StringConstants';
import { Spin } from 'antd';
import RetirementRequestService from 'product/service/retirement_request';
import PopupForm from 'product/components/PopupForm';

const RetirementHistory = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInitialValues, setModalInitialValues] = useState(null);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        RetirementRequestService.getAllRetiredInfo()
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                alert(StringConstants.ERROR);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleSubmit = async () => {

    }

    const handleCancel = async () => {

    }

    const handleEditButtonClick = async () => {

    }

    const tableFields = [
        columnMapping.suid,
        columnMapping.fullName,
        columnMapping.email,
        columnMapping.program,
        columnMapping.duration,
        columnMapping.createdAt,
        columnMapping.earlyRetirement,
        columnMapping.retired,
        columnMapping.action(handleEditButtonClick, null),
    ];

    const formFields = [
        { name: 'requestId', label: 'Request ID', type: 'text', readOnly: true },
        { name: 'suid', label: 'SU ID', type: 'text', readOnly: true },
        { name: 'attachment', label: 'Documents', type: 'file', readOnly: false },
    ];

    return (
        <Spin spinning={loading}>
            <TableSearch columns={tableFields} data={data} />
            <PopupForm
                title={StringConstants.RETIREMENT_PROCESS}
                open={modalVisible}
                initialValues={modalInitialValues}
                onCancel={handleCancel}
                onFinish={handleSubmit}
                fields={formFields}
            />
        </Spin>
    );
};

export default RetirementHistory;
