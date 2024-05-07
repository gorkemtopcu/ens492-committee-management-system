import React, { useState } from 'react';
import { Table, Input, Space, Button, Modal } from 'antd';
import TableSearch from '../../components/TableSearch';
import Header from '../../components/Header';
import Committees from 'data/report/committees.json';
import COLORS from 'constants/ColorConstants';

const CommitteesManagement = () => {
  const [data, setData] = useState(Committees);

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
  }

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
      render: (text, record) => (
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
      <TableSearch columns={columns} data={data} />
    </div>
  );
};

export default CommitteesManagement;
