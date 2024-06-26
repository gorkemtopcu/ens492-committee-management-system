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
    meetingId: {
        title: 'Meeting ID',
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
    role: {
        title: 'Committee Role',
        dataIndex: 'role',
        key: 'role',
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
    guests: {
        title: 'Guest',
        dataIndex: 'guest',
        key: 'guest',
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
    date: {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        searchable: true,
    },
    startedAt: {
        title: 'Started At',
        dataIndex: 'startedAt',
        key: 'startedAt',
        searchable: true,
    },
    term: {
        title: 'Term',
        dataIndex: 'term',
        key: 'term',
        searchable: true,
    },
    createdAt: {
        title: 'Created At',
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
    place: {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
        searchable: true,
    },
    numberOfMeetings: {
        title: 'Number of Meetings',
        dataIndex: 'numberOfMeetings',
        key: 'numberOfMeetings',
        searchable: true,
    },
    numberOfMeetingsAttended: {
        title: 'Number of Meetings Attended',
        dataIndex: 'numberOfMeetingsAttended',
        key: 'numberOfMeetingsAttended',
        searchable: true,
    },
    countOfMembership: {
        title: 'Count of Membership',
        dataIndex: 'countOfMembership',
        key: 'countOfMembership',
        searchable: true,
    },
    decisions: {
        title: 'Decisions',
        dataIndex: 'decisions',
        key: 'decisions',
        searchable: true,
        // Add a custom render function to limit the height and enable scrolling
        render: (decisions) => (
            <div style={{ maxHeight: '50px', overflowY: 'auto' }}>
                {decisions}
            </div>
        ),
    },
    multipleCommittees: {
        title: 'Committees',
        dataIndex: 'committee',
        key: 'committee',
        render: (multipleCommittees) => {
            if (!multipleCommittees || multipleCommittees.length === 0) return null;
            const formattedCommittees = multipleCommittees.map(committee => <Tag key={committee} color={COLORS.PRIMARY_LIGHT}>{committee}</Tag>);
            return formattedCommittees;
        }
    },

    nextMeetingDate: {
        title: 'Next Meeting Date',
        dataIndex: 'nextMeetingDate',
        key: 'nextMeetingDate',
        searchable: true,
    },
    createdBy: {
        title: 'Created By',
        dataIndex: 'createdBy',
        key: 'createdBy',
        searchable: true,
    },
    attachment:
    {
        title: 'Attachment',
        dataIndex: 'attachment',
        key: 'attachment',
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
    subject: {
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
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
    participants: {
        title: 'Participants',
        dataIndex: 'participants',
        key: 'participants',
        render: (participants) => {
            if (!participants || participants.length === 0) return null;
            const formattedParticipants = participants.map(participant => <Tag key={participant} color={COLORS.PRIMARY_LIGHT}>{participant}</Tag>);
            return formattedParticipants;
        },
    },
    retire: (handleRetire) => ({
        title: 'Action',
        key: 'retire',
        render: (record) => (
            <Button
                type="default"
                style={{ color: COLORS.ERROR, borderColor: COLORS.ERROR }}
                onClick={() => handleRetire(record)}
            >
                Start Process
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
