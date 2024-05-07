import React from 'react';
import { List } from 'antd';

const Picker = ({ title, items, onChange }) => {
  function handleClick(item) {
    onChange(item);
  }

  return (
    <div>
      <h3>{title}</h3>
      <List
        size="small"
        bordered
        dataSource={items}
        renderItem={item => (
          <List.Item onClick={() => handleClick(item)}>
            {item}
          </List.Item>
        )}
        style={{ maxHeight: '50vh', minHeight: '50vh', minWidth: '30vh', overflow: 'auto', maxWidth: '20vw' }}
      />
    </div>
  );
};

export default Picker;