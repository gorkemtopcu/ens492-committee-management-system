import {
    BarChartOutlined,
    ClockCircleTwoTone,
    FileDoneOutlined,
    TeamOutlined,
} from '@ant-design/icons';

const CommitteeRoutes = [
    {
        key: 'reports',
        icon: <BarChartOutlined />,
        label: 'Reports',
        children: [
            {
                key: 'program-instructor',
                icon: <BarChartOutlined />,
                label: 'Program & Instructor',
            },
            {
                key: 'committees',
                icon: <BarChartOutlined />,
                label: 'Committees',
            },
            {
                key: 'committees-assignment',
                icon: <BarChartOutlined />,
                label: 'Committees Assignment',
            },
            {
                key: 'meeting-participation',
                icon: <BarChartOutlined />,
                label: 'Meeting Participation',
            },
            {
                key: 'committee-announcement',
                icon: <BarChartOutlined />,
                label: 'Committee Announcement',
            },
        ]
    },
    {
        key: 'management',
        icon: <FileDoneOutlined />,
        label: 'Management',
        children: [
            {
                key: 'mgmt-committees',
                icon: <FileDoneOutlined />,
                label: 'Committees',
            },
            {
                key: 'mgmt-members',
                icon: <FileDoneOutlined />,
                label: 'Members',
            },
            {
                key: 'mgmt-assignments',
                icon: <FileDoneOutlined />,
                label: 'Assignments',
            },
            {
                key: 'mgmt-mailing',
                icon: <FileDoneOutlined />,
                label: 'Mailing Lists',
            },
        ]
    },
    {
        key: 'meeting',
        icon: <TeamOutlined />,
        label: 'Meetings',
        children: [
            {
                key: 'list-meeting',
                icon: <TeamOutlined />,
                label: 'List Meetings',
            },
            {
                key: 'create-meeting-notes',
                icon: <TeamOutlined />,
                label: 'Create Meeting Notes',
            },
        ]
    },
    {
        key: 'member-tracking-system',
        icon: <ClockCircleTwoTone />,
        label: 'Member Tracking System',
        children: [
            {
                key: 'main-commitee',
                icon: <ClockCircleTwoTone />,
                label: 'Main Commitee',
            },
            {
                key: 'retirement-history',
                icon: <ClockCircleTwoTone />,
                label: 'Retirement History',
            },
            {
                key: 'retirement-requests',
                icon: <ClockCircleTwoTone />,
                label: 'Retirement Requests',
            },
        ]
    },
];

export default CommitteeRoutes;