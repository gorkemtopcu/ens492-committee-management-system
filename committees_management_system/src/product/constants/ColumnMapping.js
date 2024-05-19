// ColumnMapping.js
import React from 'react';
import { Button, Space } from 'antd';
import COLORS from 'product/constants/ColorConstants';

// Define your mapping object
const columnMapping = {
    suid: {
        title: 'SU ID',
        dataIndex: 'suid',
        key: 'suid',
        searchable: true,
    },
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
    committeeName: {
        title: 'Committee Name',
        dataIndex: 'committeeName',
        key: 'committeeName',
        searchable: true,
    },
    committeeCategory: {
        title: 'Category',
        dataIndex: 'category',
        key: 'category',
        searchable: true,
    },
    fullName: {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
        searchable: true,
    },
    facultyMember: {
        title: 'Faculty Member',
        dataIndex: 'facultyMember',
        key: 'facultyMember',
        searchable: true,
    },
    member: {
        title: 'Member',
        dataIndex: 'member',
        key: 'member',
        searchable: true,
    },
    memberId: {
        title: 'Member ID',
        dataIndex: 'memberId',
        key: 'memberId',
        searchable: true,
    },
    memberName: {
        title: 'Member Name',
        dataIndex: 'memberName',
        key: 'memberName',
        searchable: true,
    },
    email: {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        searchable: true,
    },
    memberEmail: {
        title: 'Email',
        dataIndex: 'memberEmail',
        key: 'memberEmail',
        searchable: true,
    },
    listEmail: {
        title: 'Email List',
        dataIndex: 'listEmail',
        key: 'listEmail',
    },
    program: {
        title: 'Program',
        dataIndex: 'program',
        key: 'program',
        searchable: true,
    },
    duration: {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        searchable: true,
    },
    startedAt: {
        title: 'Started At',
        dataIndex: 'startedAt',
        key: 'startedAt',
        searchable: true,
    },
    createdAt: {
        title: 'Started At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        searchable: true,
    },
    expectedRetirement: {
        title: 'Expected Retirement',
        dataIndex: 'expectedRetirement',
        key: 'expectedRetirement',
        searchable: true,
    },
    earlyRetirement: {
        title: 'Early Retirement',
        dataIndex: 'earlyRetirement',
        key: 'earlyRetirement',
        render: (exclude) => (
            <span>{exclude ? 'Yes' : 'No'}</span>
        ),    },
    retired: {
        title: 'Retired',
        dataIndex: 'retired',
        key: 'retired',
        render: (exclude) => (
            <span>{exclude ? 'Yes' : 'No'}</span>
        ),    },
    exclude: {
        title: 'Exclude',
        dataIndex: 'exclude',
        key: 'exclude',
        render: (exclude) => (
            <span>{exclude ? 'Yes' : 'No'}</span>
        ),
    },
    retire: (handleRetire) => ({
        title: 'Retire',
        key: 'retire',
        render: (record) => (
            <Button
                type="default"
                style={{ color: COLORS.ERROR, borderColor: COLORS.ERROR }}
                onClick={() => handleRetire(record)}
            >
                Retire
            </Button>
        ),
    }),
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
    terms: {
        title: 'Terms',
        dataIndex: 'terms',
        key: 'terms',
        searchable: true,
        render: (terms) => {
            if (!terms || terms.length === 0) return null;
            // Split terms by every two characters to get the year and term number
            const formattedTerms = terms
                .match(/.{1,2}/g) // Split terms into pairs of characters
                .map(term => `20${term.substr(0, 2)}${term.substr(2)}`) // Format year and term number
                .sort((a, b) => parseInt(b) - parseInt(a)); // Sort terms in descending order
            // Join the formatted terms with commas
            return formattedTerms.join(', ');
        },
    },
};

export { columnMapping };
