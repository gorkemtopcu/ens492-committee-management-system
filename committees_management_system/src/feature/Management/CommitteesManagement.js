import React, { useState, useEffect } from 'react';
import { Button, Modal, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { columnMapping } from 'product/constants/ColumnMapping';
import TableSearch from 'product/components/TableSearch';
import PopupForm from 'product/components/PopupForm';
import ProductHeader from 'product/components/ProductHeader';
import Categories from 'assets/jsons/report/committee_categories.json';
import CommitteeService from 'product/service/committees';
import StringConstants from 'product/constants/StringConstants';

const FormActionTypes = {
  ADD: 'Add New Committee',
  EDIT: 'Edit Committee',
};

const CommitteesManagement = () => {
  const [data, setData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [formActionType, setFormActionType] = useState(null);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    CommitteeService.getAll()
      .then(response => {
        let dataToSet = response.data;
        dataToSet.forEach((item) => {
          item.category = Categories[item.category - 1];
        });
        setLoading(false);
        setData(dataToSet);
      })
      .catch(error => {
        alert(StringConstants.ERROR);
      });
  };

  const onDeleteButtonClicked = (record) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete "${record.committee}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        // Call deleteById function from CommitteeService
        setLoading(true);
        CommitteeService.deleteById(record.id)
          .then(() => {
            const updatedData = data.filter(item => item.id !== record.id);
            setData(updatedData);
          })
          .catch(error => {
            console.error('Error deleting data:', error);
          })
          .finally(() => {
            setLoading(false);
          });
      },
    });
  };

  const updateJsonFile = (updatedData) => {
    localStorage.setItem('committeesData', JSON.stringify(updatedData));
  };

  const onEditButtonClicked = (record) => {
    setFormActionType(FormActionTypes.EDIT);
    setInitialValues(record);
    setModalVisible(true);
  };

  const onAddButtonClicked = () => {
    setFormActionType(FormActionTypes.ADD);
    setInitialValues(null);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setFormActionType(null);
    setInitialValues(null);
    setModalVisible(false);
  };

  const handleCreateCommittee = (values) => {
    if (!values) {
      return;
    }

    const newCommittee = {
      committee: values.committee,
      category: Categories.indexOf(values.category) + 1,
      about: values.about,
      emailListAddress: values.mailingList,
    };
    console.log(newCommittee);
    CommitteeService.add(newCommittee)
      .then(() => {
        const updatedData = [...data, newCommittee];
        setData(updatedData);
      })
      .catch(error => {
        console.error('Error adding data:', error);
      });
    handleCancel();
  };

  const handleEditCommittee = (values) => {
    if (!values) {
      return;
    }

    const updatedCommittee = {
      ...initialValues,
      committee: values.committee,
      category: values.category,
      about: values.about,
      email_list_address: values.mailingList,
    };

    const updatedData = data.map(item => {
      if (item.id === initialValues.id) {
        return updatedCommittee;
      }
      return item;
    });

    setData(updatedData);
    updateJsonFile(updatedData);
    handleCancel();
  };


  const tableColumns = [columnMapping.id, columnMapping.committee, columnMapping.committeeCategory, columnMapping.action(onEditButtonClicked, onDeleteButtonClicked)];
  const formFields = [
    { name: 'committee', label: 'Committee', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', required: false, options: Categories },
    { name: 'about', label: 'About', type: 'textarea', required: false },
    { name: 'mailingList', label: 'Mailing List', type: 'text', required: false },
  ];

  return (
    <Spin spinning={loading}>
     <ProductHeader title="Committees Management" />
      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAddButtonClicked}>Add New Committee</Button>
      </div>
      <TableSearch columns={tableColumns} data={data} />
      <PopupForm
        title={formActionType}
        open={modalVisible}
        initialValues={initialValues}
        onCancel={handleCancel}
        onFinish={formActionType === FormActionTypes.ADD ? handleCreateCommittee : handleEditCommittee}
        fields={formFields}
      />
    </Spin>
  );
};

export default CommitteesManagement;
