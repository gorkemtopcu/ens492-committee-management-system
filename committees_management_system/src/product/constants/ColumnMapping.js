// ColumnMapping.js
import React from 'react';
import { Button, Space } from 'antd';
import COLORS from 'product/constants/ColorConstants';

// Define your mapping object
const columnMapping = {
    id: {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        searchable: true,
    },
    committee: {
        title: 'Committee',
        dataIndex: 'committee',
        key: 'committee',
        searchable: true,
    },
    facultyMember: {
        title: 'Faculty Member',
        dataIndex: 'facultyMember',
        key: 'facultyMember',
        searchable: true,
    },
    email: {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        searchable: true,
    },
    program: {
        title: 'Program',
        dataIndex: 'program',
        key: 'program',
        searchable: true,
    },
    exclude: {
        title: 'Exclude',
        dataIndex: 'exclude',
        key: 'exclude',
        render: (exclude) => (
            <span>{exclude ? 'Yes' : 'No'}</span>
        ),
    },
    action: (handleEdit, handleDelete) => ({
        title: 'Action',
        key: 'action',
        render: (record) => (
            <Space size="middle">
                {handleEdit !== null && (
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                )}
                {handleDelete !== null && (
                    <Button
                        type="default"
                        style={{ color: COLORS.ERROR, borderColor: COLORS.ERROR }}
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </Button>
                )}
            </Space>
        ),
    }),
};

export { columnMapping };
