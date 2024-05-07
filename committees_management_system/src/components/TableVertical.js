import React from 'react';
import { Table, Card } from 'antd';

const TableVertical = ({ dataSource, columns }) => {
  const renderCommunityColumn = (communities) => (
    <div style={{ display: 'flex', overflowX: 'auto' }}>
      {communities.map((community, index) => (
        <Card key={index} style={{ marginRight: '8px' }}>
          {community}
        </Card>
      ))}
    </div>
  );

  const modifiedColumns = columns.map(column => {
    if (column.dataIndex === 'communities') {
      return {
        ...column,
        render: renderCommunityColumn
      };
    }
    return column;
  });

  return <Table dataSource={dataSource} columns={modifiedColumns} pagination={false} />;
};

export default TableVertical;
