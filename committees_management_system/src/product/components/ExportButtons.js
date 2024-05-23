import React from 'react';
import CopyButton from './CopyButton';
import ExcelButton from './ExcelButton';

const ExportButtons = ({ handleCopy, handleExcel }) => {
    return (
        <div style={{ display: 'flex', marginBottom: 16 }}>
            <CopyButton
                onClick={handleCopy}
                isEnabled={true}
                style={{ marginRight: 16 }}
            />
            <ExcelButton
                onClick={handleExcel}
                isEnabled={true}
                style={{ marginRight: 16 }}
            />
        </div>
    );
};

export default ExportButtons;
