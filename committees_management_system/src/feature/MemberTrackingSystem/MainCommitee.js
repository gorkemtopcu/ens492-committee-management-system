import React, { useEffect, useState } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import PopupForm from 'product/components/PopupForm';
import { Button, Spin } from 'antd';
import StringConstants from 'product/constants/StringConstants';
import ActiveMemberService from 'product/service/active_member';
import { PlusOutlined } from '@ant-design/icons';
import ReportUtils from 'product/utils/report_utils';
import ExportButtons from 'product/components/ExportButtons';

const MainCommitee = () => {

    const [data, setData] = useState([]);
    const [retireModalVisible, setRetireModalVisible] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [loading, setLoading] = useState(false);
    const [memberModalVisible, setMemberModalVisible] = useState(false);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        ActiveMemberService.getAll()
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

    const onAddButtonClicked = () => {
        setMemberModalVisible(true);

    };

    const handleCancel = () => {
        setInitialValues(null);
        setRetireModalVisible(false);
        setMemberModalVisible(false);
    };

    const handleRetire = (values) => {
        if (values.confirmation && values.confirmation.toUpperCase() === fullName.toUpperCase()) {
            const updatedData = data.filter(item => item.id !== initialValues.id);
            setData(updatedData);
        }
        console.log(initialValues.suid);
        ActiveMemberService.retirementRequestById(initialValues.suid)
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error('Error adding data:', error);
            });
        setRetireModalVisible(false);
    };


    const handleRetireClick = (record) => {
        setFullName(record.fullName);
        setInitialValues(record);
        setRetireModalVisible(true);
    };

    const handleAddMember = (values) => {
        if (!values) {
            return;
        }

        const newActiveMemberRequest = {
            suid: values.suid,
            duration: values.duration,
        };

        ActiveMemberService.add(newActiveMemberRequest)
            .then(() => {
                fetchData();
            })
            .catch(error => {
                console.error('Error adding data:', error);
            });
        handleCancel();
    };

    const getExportData = () => {
        if (!data) { return null; }
        return data.flatMap(m => ({
            "Name": m.fullName,
            "Email": m.email,
            "Program": m.program,
            "Duration": m.duration,
            "Started at": m.startedAt,
            "Expected Retirement": m.expectedRetirement
        }));
    }

    const exportExcel = () => {
        ReportUtils.exportExcel(getExportData, 'main_committee.xlsx');
    };

    const copyClipboard = () => {
        ReportUtils.copyClipboard(getExportData);
    };

    const tableFields = [
        columnMapping.suid,
        columnMapping.fullName,
        columnMapping.email,
        columnMapping.program,
        columnMapping.duration,
        columnMapping.startedAt,
        columnMapping.expectedRetirement,
        columnMapping.retire(handleRetireClick),
    ];

    const addMemberFields = [
        { name: 'suid', label: 'SU ID', type: 'text', required: true },
        { name: 'duration', label: 'Duration', type: 'text', required: true },
    ];

    return (
        <Spin spinning={loading}>
            <div style={{ marginBottom: '20px' }}>
                <Button type="primary" icon={<PlusOutlined />} onClick={onAddButtonClicked}>Add New Member</Button>
            </div>
            <ExportButtons handleCopy={copyClipboard} handleExcel={exportExcel} />
            <TableSearch columns={tableFields} data={data} />
            <PopupForm
                title={StringConstants.RETIRE_MEMBER}
                open={retireModalVisible}
                initialValues={initialValues}
                onCancel={handleCancel}
                onFinish={handleRetire}
                fields={[
                    {
                        rules: [{ required: true, message: 'Please input confirmation!' }],
                        name: 'confirmation',
                        label: <span>Type <strong>{fullName}</strong> to confirm retirement</span>,
                        type: 'text',
                        required: true,
                    },
                ]}

            />
            <PopupForm
                title={StringConstants.ADD_MEMBER}
                open={memberModalVisible}
                initialValues={null}
                onCancel={handleCancel}
                onFinish={handleAddMember}
                fields={addMemberFields}
            />
        </Spin>
    );
};

export default MainCommitee;
