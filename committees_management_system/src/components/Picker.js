import React from 'react';
import { List } from 'antd';

const Picker = ({ programs, onChange }) => {
  function handleClick(program) {
    onChange(program);
  }

  return (
    <List
      size="small"
      bordered
      dataSource={programs}
      renderItem={program => (
        <List.Item onClick={() => handleClick(program)}>
          {program}
        </List.Item>
      )}
      style={{ maxHeight: '50vh', overflow: 'auto', maxWidth: '20vw' }}
    />
  );
};

export default Picker;
