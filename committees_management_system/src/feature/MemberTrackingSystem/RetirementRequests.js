import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import StringConstants from 'product/constants/StringConstants';
import { Spin, notification } from 'antd';
import RetirementRequestService from 'product/service/retirement_request';
import PopupForm from 'product/components/PopupForm';
import RetirementDocumentsService from 'product/service/retirement_documents';
import FileUtils from 'product/utils/file_utils';

const RetirementRequest = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInitialValues, setModalInitialValues] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        RetirementRequestService.getAllInRetirement()
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

    const endRetirementProcess = async (requestId) => {
        setLoading(true);
        try {
            const response = await RetirementRequestService.endRetirementProcess(requestId);
            return response.data;
        } catch (error) {
            alert(StringConstants.ERROR);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const addDocument = async (document) => {
        setLoading(true);
        try {
            const response = await RetirementDocumentsService.add(document);
            return response.data;
        } catch (error) {
            alert(StringConstants.ERROR);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const handleRetirementProcessButtonClick = (values) => {
        setLoading(true);
        RetirementDocumentsService.getByRequestId(values.requestId)
            .then(response => {
                setModalInitialValues({
                    requestId: values.requestId,
                    suid: values.suid,
                    attachment: response.data,
                });
            })
            .catch(error => {
                console.error('Error adding data:', error);
            })
            .finally(() => {
                setLoading(false);
                setModalVisible(true);
            });
    };

    const handleSubmit = async (values, form) => {
        try {
            const endRetirementRequest = await endRetirementProcess(values.requestId);
            if (endRetirementRequest && endRetirementRequest.requestId) {
                for (const d of values.attachment) {
                    const documentData = {
                        documentType: FileUtils.getDocumentType(d.name),
                        filePath: d.name,
                        requestId: endRetirementRequest.requestId,
                    };
                    await addDocument(documentData);
                }
            }
            notification.success({
                message: StringConstants.SUCCESS,
                description: 'Retirement submitted successfully',
            });
            setModalInitialValues(null);
            setModalVisible(false);
            form.resetFields();
            fetchData();
        } catch (error) {
            console.error('Error finishing retirement:', error);
        }
    };


    const handleCancel = (form) => {
        setModalInitialValues(null);
        setModalVisible(false);
    };

    const tableColumns = [
        columnMapping.requestId,
        columnMapping.fullName,
        columnMapping.requestDate,
        columnMapping.duration,
        columnMapping.retirementProcess(handleRetirementProcessButtonClick),
    ];

    const formFields = [
        { name: 'requestId', label: 'Request ID', type: 'text', readOnly: true },
        { name: 'suid', label: 'SU ID', type: 'text', readOnly: true },
        { name: 'attachment', label: 'Documents', type: 'file', readOnly: false },
    ];

    return (
        <Spin spinning={loading}>
            <TableSearch columns={tableColumns} data={data} />
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

export default RetirementRequest;
