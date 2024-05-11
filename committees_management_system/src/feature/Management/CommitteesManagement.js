import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Committees from 'assets/jsons/report/committees.json';
import { columnMapping } from 'product/constants/ColumnMapping';
import TableSearch from 'product/components/TableSearch';
import PopupForm from 'product/components/PopupForm';
import Header from 'product/components/Header';
import Categories from 'assets/jsons/report/committee_categories.json';

const FormActionTypes = {
  ADD: 'Add New Committee',
  EDIT: 'Edit Committee',
};

const CommitteesManagement = () => {
  const [data, setData] = useState(Committees);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [formActionType, setFormActionType] = useState(null);

  const onDeleteButtonClicked = (record) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete "${record.committee}"?`,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const updatedData = data.filter(item => item.id !== record.id);
        setData(updatedData);
        updateJsonFile(updatedData);
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
      id: data.length + 1,
      committee: values.committee,
      category: values.category,
      about: values.about,
      email_list_address: values.mailingList,
      created_at: new Date().toISOString(),
    };

    const updatedData = [...data, newCommittee];
    setData(updatedData);
    updateJsonFile(updatedData);
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


  const tableColumns = [columnMapping.id, columnMapping.committee, columnMapping.action(onEditButtonClicked, onDeleteButtonClicked)];
  const formFields = [
    { name: 'committee', label: 'Committee', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'select', required: false, options: Categories },
    { name: 'about', label: 'About', type: 'textarea', required: false },
    { name: 'mailingList', label: 'Mailing List', type: 'text', required: false },
  ];

  return (
    <div>
      <Header title="Committees Management" />
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
    </div>
  );
};

export default CommitteesManagement;
