import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import StringConstants from 'product/constants/StringConstants';
import { Spin, notification } from 'antd';
import RetirementRequestService from 'product/service/retirement_request';
import PopupForm from 'product/components/PopupForm';
import RetirementDocumentsService from 'product/service/retirement_documents';
import FileUtils from 'product/utils/file_utils';
import ReportUtils from 'product/utils/report_utils';
import ExportButtons from 'product/components/ExportButtons';

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

    const addDocument = async (document) => {
        setLoading(true);
        RetirementDocumentsService.add(document)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                alert(StringConstants.ERROR);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (values.attachment) {
                for (const d of values.attachment) {
                    const documentData = {
                        documentType: FileUtils.getDocumentType(d.name),
                        filePath: d.name,
                        requestId: values.requestId,
                    };
                    await addDocument(documentData);
                }
            }
            notification.success({
                message: StringConstants.SUCCESS,
                description: 'Retirement edited successfully',
            });
            setModalInitialValues(null);
            setModalVisible(false);
            fetchData();
        } catch (error) {
            console.error('Error finishing retirement:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setModalInitialValues(null);
        setModalVisible(false);
    };

    const handleEditButtonClick = async (values) => {
        setLoading(true);
        RetirementDocumentsService.getByRequestId(values.requestId)
            .then(response => {
                setModalInitialValues({
                    requestId: values.requestId,
                    suid: values.suid,
                });
            })
            .catch(error => {
                alert(StringConstants.ERROR);
                console.error('Error adding data:', error);
            })
            .finally(() => {
                setLoading(false);
                setModalVisible(true);
            });
    }

    const getExportData = () => {
        if (!data) { return null; }
        return data.flatMap(m => ({
            "Name": m.fullName,
            "Email": m.email,
            "Program": m.program,
            "Duration": m.duration,
            "Early Retirement": m.earlyRetirement ? "Yes" : "No",
        }));
    }

    const exportExcel = () => {
        ReportUtils.exportExcel(getExportData, 'retirement_history.xlsx');
    };

    const copyClipboard = () => {
        ReportUtils.copyClipboard(getExportData);
    };

    const tableFields = [
        columnMapping.fullName,
        columnMapping.email,
        columnMapping.program,
        columnMapping.duration,
        columnMapping.earlyRetirement,
        columnMapping.action(handleEditButtonClick, null),
    ];

    const formFields = [
        { name: 'requestId', label: 'Request ID', type: 'text', readOnly: true },
        { name: 'suid', label: 'SU ID', type: 'text', readOnly: true },
        { name: 'attachment', label: 'Documents', type: 'file', readOnly: false },
    ];

    return (
        <Spin spinning={loading}>
            <ExportButtons handleCopy={copyClipboard} handleExcel={exportExcel} />
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
