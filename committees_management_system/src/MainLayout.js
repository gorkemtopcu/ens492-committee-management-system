import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from 'antd';
import { AiOutlineDashboard, AiOutlineSetting, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { BsListOl } from "react-icons/bs";
import { FiTruck } from "react-icons/fi";
import { HiLogout } from "react-icons/hi";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null} collapsible collapsed={collapsed}
                width={200}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className="demo-logo-vertical">
                    <h2 className="text-white fs-5 text-center py-3 mb-0">
                        <span className="lg-logo"> Fens Committee </span>

                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        navigate(key);
                        console.log(key);
                    }}
                    items={[
                        {
                            key: 'dashboard',
                            icon: <AiOutlineDashboard />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'reports-do',
                            icon: <AiOutlineUser />,
                            label: 'Reports (DO)',
                            children: [
                                {
                                    key: 'program-instructor',
                                    icon: <AiOutlineUser />,
                                    label: 'Program & Instructor',
                                },
                                {
                                    key: 'count-membership',
                                    icon: <AiOutlineUser />,
                                    label: 'Count of Membership',
                                },
                                {
                                    key: 'committees',
                                    icon: <AiOutlineUser />,
                                    label: 'Committees',
                                },
                                {
                                    key: 'committees-assignment',
                                    icon: <AiOutlineUser />,
                                    label: 'Committees Assignment',
                                },
                                {
                                    key: 'meeting-participation',
                                    icon: <AiOutlineUser />,
                                    label: 'Meeting Participation',
                                }
                            ]
                        },
                        {
                            key: 'reports',
                            icon: <FaCartPlus />,
                            label: 'Reports',
                            children: [
                                {
                                    key: 'committee-announcement',
                                    icon: <FaCartPlus />,
                                    label: 'Committee Announcement',
                                },
                            ]
                        },
                        {
                            key: 'management',
                            icon: <FaCartPlus />,
                            label: 'Management',
                            children: [
                                {
                                    key: 'mgmt-committees',
                                    icon: <FaCartPlus />,
                                    label: 'Committees',
                                },
                                {
                                    key: 'mgmt-members',
                                    icon: <FaCartPlus />,
                                    label: 'Members',
                                },
                                {
                                    key: 'mgmt-assignments',
                                    icon: <FaCartPlus />,
                                    label: 'Assignments',
                                },
                                {
                                    key: 'mgmt-mailing',
                                    icon: <FaCartPlus />,
                                    label: 'Mailing Lists',
                                },
                            ]
                        },
                        {
                            key: 'meeting',
                            icon: <FaCartPlus />,
                            label: 'Meetings',
                            children: [
                                {
                                    key: 'list-meeting',
                                    icon: <FaCartPlus />,
                                    label: 'List Meetings',
                                },
                                {
                                    key: 'meeting-notes',
                                    icon: <FaCartPlus />,
                                    label: 'Create Meeting Notes',
                                },
                            ]
                        },
                    ]}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 250}}>
                <Header
                    className="d-flex justify-content-between ps-2 pe-5"
                    style={{ padding: 0, background: colorBgContainer}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className="d-flex gap-3 align-items-center"  style={{ marginTop: '40px' }}>
                        <div className="position-relative">
                            <IoMdNotifications className="fs-4" />
                            <span className="badge bg-warning rounded-circle p-1 position-absolute"> 3</span>
                        </div>
                        <div>
                            <div className="d-flex gap-3 align-items-center">
                                <img width={32}
                                    height={32}
                                    src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360" alt="" />
                            </div>
                        </div>
                        <div>
                            <h5 className="text-dark"> Username</h5>
                            <p className="mb-0"> username@sabanciuniv.edu</p>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        background: colorBgContainer,
                        minHeight: 280, // Adjust the minimum height of the content area
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout >
    );
};

export default MainLayout;