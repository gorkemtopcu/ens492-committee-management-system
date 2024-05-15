import React, { useEffect, useState } from 'react';
import ProductHeader from 'product/components/ProductHeader';
import Picker from 'product/components/Picker';
import PrimaryButton from 'product/components/PrimaryButton';
import Terms from 'assets/jsons/report/terms.json';
import StringConstants from 'product/constants/StringConstants';
import TableExpandable from 'product/components/TableExpandable';
import { columnMapping } from 'product/constants/ColumnMapping';
import CommitteesService from 'product/service/committees';

const Committees = () => {


    return (
        <div>
            <ProductHeader title="Committees" />
        </div>
    );
};

export default Committees;
