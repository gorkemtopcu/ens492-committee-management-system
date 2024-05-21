import React, { useState } from 'react';
import { Table } from 'antd';

const TableExpandable = ({ outsideColumns, insideColumns, dataSource, getNestedData }) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  return (
    <Table
      columns={outsideColumns}
      dataSource={dataSource}
      scroll={{ x: true }}
      expandable={{
        expandedRowRender: record => {
          const nestedData = getNestedData(record);
          return (
            <Table
              columns={insideColumns}
              dataSource={nestedData}
              pagination={false}
              rowKey="key"
            />
          );
        },
        expandedRowKeys: expandedRowKeys,
        onExpand: (expanded, record) => {
          setExpandedRowKeys(expanded ? [...expandedRowKeys, record.key] : expandedRowKeys.filter(key => key !== record.key));
        },
      }}
      rowKey="key"
    />
  );
};

export default TableExpandable;
