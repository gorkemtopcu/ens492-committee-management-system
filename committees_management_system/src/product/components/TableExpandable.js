import React from 'react';
import { Table } from 'antd';

const TableExpandable = ({ outsideColumns, insideColumns, outsideData, insideData }) => {
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

export default TableExpandable;
