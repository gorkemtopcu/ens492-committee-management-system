import React from 'react';
import COLORS from '../constants/ColorConstants';

const PrimaryButton = ({ title, onClick, isEnabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={!isEnabled}
            style={{
                width: '100px',
                bottom: '5px',
                left: '20px',
                padding: '8px 16px',
                backgroundColor: isEnabled ? COLORS.PRIMARY : COLORS.DISABLED,
                color: isEnabled ? COLORS.ONPRIMARY : COLORS.SECONDARY,
            }}>
            {title}
        </button>
    );
};

export default PrimaryButton;
