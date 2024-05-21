import React, { useState, useEffect } from 'react';
import TableSearch from 'product/components/TableSearch';
import { columnMapping } from 'product/constants/ColumnMapping';
import StringConstants from 'product/constants/StringConstants';
import { Button, Spin } from 'antd';
import RetirementRequestService from 'product/service/retirement_request';
import COLORS from 'product/constants/ColorConstants';
import PopupForm from 'product/components/PopupForm';
import RetirementDocumentsService from 'product/service/retirement_documents';

const RetirementRequest = () => {
    const [loading, setLoading] = useState(false); 
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [initialValues, setInitialValues] = useState(null);
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        RetirementRequestService.getAllInRetirement()
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

    const handleRetirementProcess = (values) => { 
        setLoading(true);
        RetirementDocumentsService.getBySuid(values.suid)
        .then(response => {
            console.log(response.data);
            setDocuments(response.data);
        })
          .catch(error => {
            console.error('Error adding data:', error);
          })
          .finally(() => {
            setLoading(false);
            setInitialValues(values);
            setModalVisible(true);
          });
     };

     const finishRetirement = async (values) => {
     };

     const handleCancel = () => {
        setInitialValues(null);
        setModalVisible(false);
    };


    const fields = [
        columnMapping.requestId,
        columnMapping.suid,
        columnMapping.requestDate,
        columnMapping.closed,
        columnMapping.status,
        columnMapping.retirementProcess(handleRetirementProcess),
    ];

    return (
        <Spin spinning={loading}>
            <TableSearch columns={fields} data={data} />
            <PopupForm
                title={StringConstants.RETIREMENT_PROCESS}
                open={modalVisible}
                initialValues={initialValues} // Pass initialValues to PopupForm
                onCancel={handleCancel}
                onFinish={finishRetirement}
                fields={[
                    { name: 'suid', label: 'SU ID', type: 'text', readOnly: true },
                    { name: 'documents', label: 'documents', type: 'text', readOnly: true },

                ]}
            />
        </Spin>
        
    );
};

export default RetirementRequest;
