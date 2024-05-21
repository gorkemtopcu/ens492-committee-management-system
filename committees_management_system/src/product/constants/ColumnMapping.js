// ColumnMapping.js
import React from 'react';
import { Button, Space, Tag } from 'antd';
import COLORS from 'product/constants/ColorConstants';

// Define your mapping object
const columnMapping = {
    suid: {
        title: 'SU ID',
        dataIndex: 'suid',
        key: 'suid',
        searchable: true,
    },
    requestId: {
        title: 'Request ID',
        dataIndex: 'requestId',
        key: 'requestId',
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
    retiredAt: {
        title: 'Retired At',
        dataIndex: 'retiredAt',
        key: 'retiredAt',
        searchable: true,
    },
    requestDate: {
        title: 'Request Date',
        dataIndex: 'requestDate',
        key: 'requestDate',
        searchable: true,
    },
    expectedRetirement: {
        title: 'Expected Retirement',
        dataIndex: 'expectedRetirement',
        key: 'expectedRetirement',
        searchable: true,
    },
    closed: {
        title: 'Closed',
        dataIndex: 'closed',
        key: 'closed',
        render: (closed) => (
            <span>{closed ? 'Yes' : 'No'}</span>
        ),
    },
    earlyRetirement: {
        title: 'Early Retirement',
        dataIndex: 'earlyRetirement',
        key: 'earlyRetirement',
        render: (exclude) => (
            <span>{exclude ? 'Yes' : 'No'}</span>
        ),
    },
    status: {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        searchable: true,
    },
    retirementReason: {
        title: 'Retirement Reason',
        dataIndex: 'retirementReason',
        key: 'retirementReason',
    },
    retired: {
        title: 'Retired',
        dataIndex: 'retired',
        key: 'retired',
        render: (exclude) => (
            <span>{exclude ? 'Yes' : 'No'}</span>
        ),
    },
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
    retirementProcess: (handleRetirementProcess) => ({
        title: 'Retirement Process',
        key: 'retirementProcess',
        render: (record) => (
            <Button
                type="default"
                style={{ color: COLORS.ERROR, borderColor: COLORS.ERROR }}
                onClick={() => handleRetirementProcess(record)}
            >
                Retirement Process
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
            const formattedTerms = terms.map(term => <Tag key={term} color={COLORS.PRIMARY_LIGHT}>{term}</Tag>);
            return formattedTerms;
        },
    },
};

export { columnMapping };
