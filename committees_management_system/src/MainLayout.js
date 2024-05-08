import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme } from 'antd';
import { useNavigate } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import CommitteeRoutes from './product/constants/Routes';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

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
                width={275}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className="demo-logo-vertical">
                    {collapsed ? (
                        <h2 className="text-white fs-5 text-center py-3 mb-0">
                            <span className="lg-logo"> FENS </span>
                        </h2>
                    ) : (
                        <h2 className="text-white fs-5 text-center py-3 mb-0">
                            <span className="lg-logo"> FENS Committee </span>
                        </h2>
                    )}
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        navigate(key);
                        console.log(key);
                    }}
                    items={CommitteeRoutes}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
                <Header
                    className="d-flex justify-content-between ps-2 pe-5"
                    style={{ padding: 0, background: colorBgContainer }}>
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
                    <div className="d-sm-flex gap-3 align-items-center" style={{ marginTop: '20px' }}>
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
                        <div className="user-info">
                        <h5 className="mb-0">Username</h5>
                        <p className="mb-0">username@sabanciuniv.edu</p>
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
