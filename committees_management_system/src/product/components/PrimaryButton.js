import React from 'react';
import { Button } from 'antd';
import COLORS from '../constants/ColorConstants';

const PrimaryButton = ({ title, onClick, isEnabled = true, icon = null, style = null }) => {
    return (
        <Button
            onClick={onClick}
            disabled={!isEnabled}
            icon={icon ? icon : null}
            style={{
                width: '100px',
                bottom: '5px',
                left: '20px',
                padding: '8px 16px',
                backgroundColor: isEnabled ? COLORS.PRIMARY : COLORS.DISABLED,
                color: isEnabled ? COLORS.ONPRIMARY : COLORS.SECONDARY,
                borderColor: isEnabled ? COLORS.PRIMARY : COLORS.DISABLED,
                textAlign: 'center', // Center the text horizontally
                lineHeight: 'normal', // Reset line height
                display: 'flex', // Use flexbox
                justifyContent: 'center', // Center vertically
                alignItems: 'center', // Center horizontally
                ...style, // Spread the incoming style object
            }}>
            {title}
        </Button>
    );
};

export default PrimaryButton;
