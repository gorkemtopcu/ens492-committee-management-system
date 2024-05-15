import React, { useState } from 'react';
import { List, Checkbox } from 'antd';
import COLORS from '../constants/ColorConstants';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

const Picker = ({ title, items, selected, onChange, multipleSelection = true, style = null }) => {
  const initialSelectedItems = selected ? selected : [];
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [shiftClickStartIndex, setShiftClickStartIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSelectAllChange = (e) => {
    const updatedSelectedItems = e.target.checked ? items : [];
    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems);
  };

  const handleCollapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  function handleClick(item, index, event) {
    let updatedSelectedItems;

    if (multipleSelection) {
      if (event.ctrlKey || event.metaKey) {
        if (selectedItems.includes(item)) {
          updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem !== item);
        } else {
          updatedSelectedItems = [...selectedItems, item];
        }
      } else if (event.shiftKey && shiftClickStartIndex !== null) {
        const minIndex = Math.min(shiftClickStartIndex, index);
        const maxIndex = Math.max(shiftClickStartIndex, index);
        updatedSelectedItems = items.slice(minIndex, maxIndex + 1);
      } else {
        updatedSelectedItems = [item];
        setShiftClickStartIndex(index);
      }
    } else {
      updatedSelectedItems = [item];
    }

    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems);
  }

  return (
    <div style={style}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
          cursor: 'pointer',
        }}
        onClick={handleCollapseToggle}
      >
        {isCollapsed ? <CaretRightOutlined /> : <CaretDownOutlined />}
        <h3 style={{ marginRight: '5vh' }}>{title}</h3>
        {multipleSelection && (
          <Checkbox
            checked={selectedItems.length === items.length}
            onChange={handleSelectAllChange}
          >
            Select All
          </Checkbox>
        )}
      </div>
      {!isCollapsed && (
        <List
          size="small"
          bordered
          dataSource={items}
          renderItem={(item, index) => (
            <List.Item
              onClick={(event) => handleClick(item, index, event)}
              style={{
                backgroundColor: selectedItems.includes(item) ? COLORS.PRIMARYCONTAINER : 'inherit',
                cursor: 'pointer',
              }}
            >
              {item}
            </List.Item>
          )}
          style={{
            maxHeight: '50vh',
            overflowY: 'auto',
          }}
        />
      )}
    </div>
  );
};

export default Picker;
