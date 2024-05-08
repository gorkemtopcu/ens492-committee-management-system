import React from 'react';
import { List } from 'antd';
import COLORS from '../constants/ColorConstants';

const Picker = ({ title, items, selected, onChange }) => {
  function handleClick(item) {
    onChange(item);
  }

  return (
    <div style={{ border: `1px solid ${COLORS.DARKER_BORDER}` }}> {/* Adjusted border color */}
      <h3>{title}</h3>
      <List
        size="small"
        bordered
        dataSource={items}
        renderItem={item => (
          <List.Item
            onClick={() => handleClick(item)}
            style={{
              backgroundColor: selected === item ? COLORS.PRIMARYCONTAINER : 'inherit',
              cursor: 'pointer',
            }}
          >
            {item}
          </List.Item>
        )}
        style={{
          maxHeight: '50vh',
          minHeight: '50vh',
          minWidth: '30vh',
          overflow: 'auto',
          maxWidth: '20vw'
        }}
      />
    </div>
  );
};

export default Picker;
