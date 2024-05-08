import React, { useState } from 'react';
import { Space, Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Committees from 'assets/jsons/report/committees.json';
import Colors from 'product/constants/ColorConstants';
import TableSearch from 'product/components/TableSearch';
import PopupForm from 'product/components/PopupForm';
import Header from 'product/components/Header';
import COMMITTEE_CATEGORIES from 'product/constants/CommitteeConstants';

const CommitteesManagement = () => {
  const [data, setData] = useState(Committees);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState(null);
  const [popupTitle, setPopupTitle] = useState(null);

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: `Are you sure you want to delete "${record.committeeName}"?`,
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

  const handleEdit = (record) => {
    setPopupTitle("Edit Committee");
    setInitialValues(record);
    setModalVisible(true);
  };

  const handleAddCommittee = () => {
    setPopupTitle("Add New Committee");
    setInitialValues(null);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setPopupTitle(null);
    setInitialValues(null);
    setModalVisible(false);
  };

  const handleCreateCommittee = (values) => {
    handleCancel();
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      searchable: true,
    },
    {
      title: 'Committee Management',
      dataIndex: 'committeeName',
      key: 'committeeName',
      searchable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="default" style={{ color: Colors.ERROR, borderColor: Colors.ERROR }} onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Header title="Committees Management" />
      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCommittee}>Add New Committee</Button>
      </div>
      <TableSearch columns={columns} data={data} />
      <PopupForm
        title={popupTitle}
        open={modalVisible}
        initialValues={initialValues}
        onCancel={handleCancel}
        onFinish={handleCreateCommittee}
        fields={[
          { name: 'committeeName', label: 'Committee Name', type: 'text', required: true },
          { name: 'category', label: 'Category', type: 'select', required: false, options: COMMITTEE_CATEGORIES },
          { name: 'about', label: 'About', type: 'textarea', required: false },
          { name: 'mailingList', label: 'Mailing List', type: 'text', required: false },
        ]}
      />
    </div>
  );
};

export default CommitteesManagement;
