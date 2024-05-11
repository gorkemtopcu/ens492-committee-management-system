import React, { useState } from 'react';
import { List, Checkbox } from 'antd';
import COLORS from '../constants/ColorConstants';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

const Picker = ({ title, items, selected, onChange, isCollapsed, onCollapseToggle }) => {
  const initialSelectedItems = selected ? selected : [];
  const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
  const [shiftClickStartIndex, setShiftClickStartIndex] = useState(null);

  const handleSelectAllChange = (e) => {
    const updatedSelectedItems = e.target.checked ? items : [];
    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems);
  };

  function handleClick(item, index, event) {
    let updatedSelectedItems;

    if (event.ctrlKey || event.metaKey) {
      // Toggle selection of the clicked item if Ctrl or Cmd (on Mac) is pressed
      if (selectedItems.includes(item)) {
        updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem !== item);
      } else {
        updatedSelectedItems = [...selectedItems, item];
      }
    } else if (event.shiftKey && shiftClickStartIndex !== null) {
      // Select items between the first shift click and the current shift click
      const minIndex = Math.min(shiftClickStartIndex, index);
      const maxIndex = Math.max(shiftClickStartIndex, index);
      updatedSelectedItems = items.slice(minIndex, maxIndex + 1);
    } else {
      // Otherwise, select only the clicked item
      updatedSelectedItems = [item];
      setShiftClickStartIndex(index); // Set the start index for shift click
    }

    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems);
  }

  return (
    <div style={{ border: `1px solid ${COLORS.DARKER_BORDER}`, marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
          cursor: 'pointer',
        }}
        onClick={onCollapseToggle}
      >
        {isCollapsed ? <CaretRightOutlined /> : <CaretDownOutlined />}
        <h3 style={{ marginRight: '5vh' }}>{title}</h3>
        <Checkbox
          checked={selectedItems.length === items.length} // Check if all items are selected
          onChange={handleSelectAllChange}
        >
          Select All
        </Checkbox>
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