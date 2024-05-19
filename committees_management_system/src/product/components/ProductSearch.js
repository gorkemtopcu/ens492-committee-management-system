import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const ProductSearch = ({ options, onSelect }) => {
    const [searchText, setSearchText] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);

    const handleSearch = (value) => {
        setSearchText(value);
        const filteredOptions = options.filter((option) => option.toLowerCase().indexOf(value.toLowerCase()) > -1);
        setSearchOptions(filteredOptions);
    };

    return (
        <AutoComplete
            value={searchText}
            options={searchOptions.map((option) => ({ value: option }))}
            style={{ width: '100%' }}
            onSearch={handleSearch}
            onSelect={onSelect}
        />
    );
};

export default ProductSearch;
