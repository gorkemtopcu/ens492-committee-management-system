import React from 'react';
import { Space, Table, Dropdown, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const items = [
  {
    key: '1',
    label: 'Action 1',
  },
  {
    key: '2',
    label: 'Action 2',
  },
];

const TableInsideTable = ({ outsideColumns, insideColumns, outsideData, insideData}) => {
  const expandedRowRender = () => {
    
    return <Table columns={insideColumns} dataSource={insideData} pagination={false} />;
  };

  return (
    <Table
      columns={outsideColumns}
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: ['0'],
      }}
      dataSource={outsideData}
    />
  );
};

export default TableInsideTable;
