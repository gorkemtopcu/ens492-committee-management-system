import React, { useState, useEffect } from 'react';
import { List, Checkbox } from 'antd';
import COLORS from '../constants/ColorConstants';
import './css/Picker.css'; // Updated import path

const Picker = ({ title, items, selected, onChange, multipleSelection = true, style = null }) => {
  const [selectedItems, setSelectedItems] = useState(selected);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    setSelectedItems(selected);
  }, [selected]);

  const handleSelectAllChange = (e) => {
    const updatedSelectedItems = e.target.checked ? items : [];
    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems);
  };

  const handleMouseDown = (item, index) => {
    setIsMouseDown(true);
    handleClick(item);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseOver = (item) => {
    if (isMouseDown) {
      handleClick(item);
    }
  };

  const handleClick = (item) => {
    let updatedSelectedItems;

    if (multipleSelection) {
      {
        // Regular click
        if (selectedItems.some(selectedItem => selectedItem.value === item.value)) {
          updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem.value !== item.value);
        } else {
          updatedSelectedItems = [...selectedItems, item];
        }
      }
    } else {
      // Single selection mode
      updatedSelectedItems = [item];
    }

    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems);
  };

  return (
    <div style={style}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ marginBottom: '10px' }}>{title}</h3>
        {multipleSelection && (
          <Checkbox
            checked={selectedItems.length === items.length}
            indeterminate={selectedItems.length > 0 && selectedItems.length < items.length}
            onChange={handleSelectAllChange}
            style={{ marginLeft: '30px' }}
          >
            Select All
          </Checkbox>
        )}
      </div>
      <List
        size="small"
        bordered
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item
            onMouseDown={(event) => handleMouseDown(item)}
            onMouseUp={handleMouseUp}
            onMouseOver={(event) => handleMouseOver(item)}
            className="no-select"
            style={{
              backgroundColor: selectedItems.some(selectedItem => selectedItem.value === item.value) ? COLORS.PRIMARYCONTAINER : 'inherit',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {item.label}
          </List.Item>
        )}
        style={{
          maxHeight: '50vh',
          minWidth: '25vh',
          overflowY: 'auto',
        }}
      />
    </div>
  );
};

export default Picker;