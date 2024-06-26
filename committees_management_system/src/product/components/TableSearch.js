import React, { useState } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import COLORS from 'product/constants/ColorConstants';

const TableSearch = ({ columns, data }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? COLORS.PRIMARY : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : false,
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span>{text}</span>
      ) : (
        text
      ),
  });

  const columnsWithSearch = columns.map((col) => {
    if (col.searchable) {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex),
      };
    }
    return col;
  });

  const filteredData = searchText
    ? data.filter((record) =>
      columns.some(
        (col) =>
          col.searchable &&
          record[col.dataIndex] &&
          record[col.dataIndex]
            .toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())
      )
    )
    : data;

  return (
    <div style={{ maxHeight: 800, overflow: 'auto' }}> {/* Adjust maxHeight and overflow as needed */}
      <Table columns={columnsWithSearch} dataSource={filteredData} />
    </div>
  );
};

export default TableSearch;
