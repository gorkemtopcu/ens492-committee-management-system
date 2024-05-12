import React from 'react';
import { Button } from 'antd';
import { DownloadOutlined, RetweetOutlined } from '@ant-design/icons'; // Import the Excel icon
import COLORS from '../constants/ColorConstants';

const PrimaryButton = ({ title, onClick, isEnabled, style }) => {
    return (
        <Button
            onClick={onClick}
            disabled={!isEnabled}
            style={{
                width: '120px',
                bottom: '5px',
                left: '20px',
                padding: '8px 16px',
                backgroundColor: isEnabled ? COLORS.FORESTGREEN : COLORS.DISABLED,
                color: isEnabled ? COLORS.ONPRIMARY : COLORS.SECONDARY,
                borderColor: isEnabled ? COLORS.FORESTGREEN : COLORS.DISABLED,
                textAlign: 'center', // Center the text horizontally
                lineHeight: 'normal', // Reset line height
                display: 'flex', // Use flexbox
                justifyContent: 'center', // Center vertically
                alignItems: 'center', // Center horizontally
                ...style, // Spread the incoming style object
            }}
            icon={<RetweetOutlined />} // Add Excel icon
        >
            {title}
        </Button>
    );
};

export default PrimaryButton;