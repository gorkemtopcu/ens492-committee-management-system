import React, { useState, useEffect } from 'react';
import { List, Checkbox } from 'antd';
import COLORS from '../constants/ColorConstants';
import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';

const Picker = ({ title, items, selected, onChange, multipleSelection = true, style = null, isCollapsible = true }) => {
  const [selectedItems, setSelectedItems] = useState(selected);
  const [shiftClickStartIndex, setShiftClickStartIndex] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setSelectedItems(selected);
  }, [selected]);

  const handleSelectAllChange = (e) => {
    const updatedSelectedItems = e.target.checked ? items : [];
    setSelectedItems(updatedSelectedItems);
    onChange(updatedSelectedItems);
  };

  const handleCollapseToggle = () => {
    if (isCollapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleClick = (item, index, event) => {
    let updatedSelectedItems;

    if (multipleSelection) {
      if (event.ctrlKey || event.metaKey) {
        // Toggle selection for ctrl/cmd key click
        if (selectedItems.some(selectedItem => selectedItem.value === item.value)) {
          updatedSelectedItems = selectedItems.filter(selectedItem => selectedItem.value !== item.value);
        } else {
          updatedSelectedItems = [...selectedItems, item];
        }
      } else if (event.shiftKey) {
        // Range selection for shift key click
        if (shiftClickStartIndex !== null) {
          const startIndex = Math.min(shiftClickStartIndex, index);
          const endIndex = Math.max(shiftClickStartIndex, index);
          const rangeItems = items.slice(startIndex, endIndex + 1);
          updatedSelectedItems = Array.from(new Set([...selectedItems, ...rangeItems])); // Ensure unique items
          setShiftClickStartIndex(null);
        } else {
          setShiftClickStartIndex(index);
          updatedSelectedItems = [...selectedItems, item];
        }
      } else {
        // Regular click resets selection to the clicked item
        updatedSelectedItems = [item];
        setShiftClickStartIndex(index);
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px',
          cursor: isCollapsible ? 'pointer' : 'default',
        }}
        onClick={handleCollapseToggle}
      >
        {isCollapsible && (isCollapsed ? <CaretRightOutlined /> : <CaretDownOutlined />)}
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
      {(!isCollapsible || !isCollapsed) && (
        <List
          size="small"
          bordered
          dataSource={items}
          renderItem={(item, index) => (
            <List.Item
              onClick={(event) => handleClick(item, index, event)}
              style={{
                backgroundColor: selectedItems.some(selectedItem => selectedItem.value === item.value) ? COLORS.PRIMARYCONTAINER : 'inherit',
                cursor: 'pointer',
              }}
            >
              {item.label}
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
