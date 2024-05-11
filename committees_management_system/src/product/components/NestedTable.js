import React from 'react';
import { Table } from 'antd';

const NestedTable = ({ columns, data }) => {
    // Define columns for the nested table
    const nestedColumns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Email', dataIndex: 'email' }
    ];

    return (
        <div className='NestedTable'>
            <Table
                columns={columns}
                dataSource={data}
                expandable={{
                    // Make all rows expandable
                    rowExpandable: (record) => true,
                    // Render expanded row with nested table
                    expandedRowRender: (record) => (
                        <Table
                            columns={nestedColumns}
                            dataSource={record.children} // Assuming 'children' contains nested data
                            pagination={false} // Disable pagination for nested table
                        />
                    )
                }}
            />
        </div>
    );
};

export default NestedTable;