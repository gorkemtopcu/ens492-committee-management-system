import React from 'react';
import ICONS from 'product/constants/IconConstants';
import PrimaryButton from './PrimaryButton';
import StringConstants from 'product/constants/StringConstants';

const ExcelButton = ({ onClick, isEnabled = true, style = null }) => {
    return (
        <PrimaryButton onClick={onClick} title={StringConstants.EXCEL} style={style} isEnabled={isEnabled} icon={ICONS.EXCEL} />
    );
};

export default ExcelButton;
