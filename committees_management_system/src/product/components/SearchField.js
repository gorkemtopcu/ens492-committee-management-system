import React from 'react';
import { Select } from 'antd';
import COLORS from '../constants/ColorConstants';


const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

const searchfield = (title, data) => (
    <div style={{ border: `1px solid ${COLORS.DARKER_BORDER}` }}>
        <h3>Search Field</h3>
        <Select
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={data}
        />
    </div>
  
);
export default searchfield;