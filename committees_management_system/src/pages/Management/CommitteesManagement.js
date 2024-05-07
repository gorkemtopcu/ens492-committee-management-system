import React, { useState } from 'react';
import { Table, Input, Space, Button, Modal } from 'antd';
import axios from 'axios'; // Import axios for making HTTP requests
import TableSearch from '../../components/TableSearch';
import committeesData from '../../lists/report_lists/committees.json';

const CommitteesManagement = () => {
  const [data, setData] = useState(committeesData);

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
        updateJsonFile(updatedData); // Update JSON file
      },
    });
  }

  const updateJsonFile = (updatedData) => {
    // Update the JSON file directly
    localStorage.setItem('committeesData', JSON.stringify(updatedData));
    console.log('JSON file updated successfully');
  };

  const handleEdit = (record) => {
    // Implement the handleEdit functionality here
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
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
          <Button type="danger" onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return <TableSearch columns={columns} data={data} />; // Pass updated data here
};

export default CommitteesManagement;