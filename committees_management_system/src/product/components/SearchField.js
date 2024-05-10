import React from 'react';
import { Select, Typography } from 'antd';
const { Title } = Typography;



const Search_Field = ({ options, onChange }) => (
  <>
    <Title level={4}>{options.length} Items</Title>
    <Select
      mode="multiple"
      style={{
        width: '30%',
      }}
      placeholder="Please select"
      onChange={onChange}
      options={options}
    />
  </>
);
export default Search_Field;