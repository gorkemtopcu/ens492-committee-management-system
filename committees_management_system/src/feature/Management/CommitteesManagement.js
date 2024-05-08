import React, { useState } from 'react';
import { Space, Button, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Committees from 'assets/jsons/report/committees.json';
import COLORS from 'product/constants/ColorConstants';
import { Header } from 'antd/es/layout/layout';
import TableSearch from 'product/components/TableSearch';

const { Option } = Select;

const CommitteesManagement = () => {
  const [data, setData] = useState(Committees);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    // Logic to handle form submission goes here
    setIsModalVisible(false);
  };

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
    console.log('JSON file updated successfully');
  };

  const handleEdit = (record) => {
    console.log('Editing:', record);
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
          <Button type="default" style={{ color: COLORS.ERROR, borderColor: COLORS.ERROR }} onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Header title="Committees Management" />
      <div style={{ marginBottom: '20px' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>Add New Committee</Button>
      </div>
      <Modal title="Add New Committee" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="addCommitteeForm"
          onFinish={handleOk} // Specify the form submission handler
          initialValues={{ category: 'Select Category' }} // Initial values for the form fields
        >
          <Form.Item
            label="Committee"
            name="committee"
            rules={[{ required: true, message: 'Please input the committee name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select the category!' }]}
          >
            <Select>
              <Option value="Category 1">Category 1</Option>
              <Option value="Category 2">Category 2</Option>
              <Option value="Category 3">Category 3</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="About"
            name="about"
            rules={[{ required: true, message: 'Please input about the committee!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Mailing List"
            name="mailingList"
            rules={[{ required: true, message: 'Please input the mailing list!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <TableSearch columns={columns} data={data} />
    </div>
  );
};

export default CommitteesManagement;
