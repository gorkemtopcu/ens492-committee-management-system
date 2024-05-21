import React from 'react';
import ICONS from 'product/constants/IconConstants';
import PrimaryButton from './PrimaryButton';
import StringConstants from 'product/constants/StringConstants';

const CopyButton = ({ onClick, isEnabled = true, style = null }) => {
    return (
        <PrimaryButton onClick={onClick} title={StringConstants.COPY} style={style} isEnabled={isEnabled} icon={ICONS.COPY} />
    );
};

export default CopyButton;
