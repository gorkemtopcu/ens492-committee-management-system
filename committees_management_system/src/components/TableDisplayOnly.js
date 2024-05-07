import React from 'react';
import { Table } from 'antd';

//Check the table page in antd design for more information on using columns, data etc
const TableDisplayOnly = ({ columns, data, onChange }) => (
  <Table
    columns={columns}
    dataSource={data}
    onChange={onChange}
    showSorterTooltip={{
      target: 'sorter-icon',  
    }}
  />
);

export default TableDisplayOnly;
