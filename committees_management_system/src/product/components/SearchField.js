import React from 'react';
import { Select, Typography } from 'antd';
const { Title } = Typography;

const SearchField = ({ options, onChange, title }) => (
  <>
    <Title level={4}>{options.length} {title}</Title>
    <Select
      mode="multiple"
      style={{ width: '100%' }}
      placeholder="Please select"
      onChange={onChange}
      options={options}
      optionLabelProp="label"
    />
  </>
);

export default SearchField;
