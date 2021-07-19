import React, { useState, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
    Layout,
    Avatar,
    Descriptions,
    Typography,
    Menu,
    Popconfirm,
    Drawer,
    message,
    Row,
    Col,
} from "antd";
import {
    UserOutlined,
    LogoutOutlined,
    HomeOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import Event from "./Event";
import Greetings from "./Greetings";
import openNotification from "../../utils/openAntdNotification";
import { logoutAdmin } from "../../redux/admin/adminActions";


const { Text } = Typography;
const { Header, Content } = Layout;


function Structure() {
    function cancel(e) {
        // console.log(e);
        message.error("Click on No");
    }
    const history = useHistory();
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.admin);

    const [visibleMenu, setVisibleMenu] = useState(false);

    const showMenuDrawer = () => {
        setVisibleMenu(true);
    };
    const onMenuClose = () => {
        setVisibleMenu(false);
    };

    const [visibleProfile, setVisibleProfile] = useState(false);
    // const [visibleAvatarUpdater, setVisibleAvatarUpdater] = useState(false);

    const showProfileDrawer = () => {
        setVisibleProfile(true);
        // setVisibleAvatarUpdater(false);
    };
    const onClose = () => {
        setVisibleProfile(false);
    };
    const handleLogout = async () => {
        const handleSuccess = () => {
            localStorage.removeItem("adminData");
            history.push("/admin-p/admin-login");
        };
        const handleError = (errorMsg) => {
            openNotification("error", "Error in logging out", errorMsg);
        };
        dispatch(logoutAdmin(handleSuccess, handleError));
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Drawer
                width={300}
                placement="left"
                closable={false}
                onClose={onMenuClose}
                visible={visibleMenu}
                drawerStyle={{ backgroundColor: "#00152a" }}>
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" inlineIndent="30">
                    <Menu.Item key="1" onClick={showProfileDrawer}>
                        <Avatar
                            style={{ backgroundColor: "#44b4ca" }}
                            icon={<UserOutlined />}
                            src={admin.data.avatarUrl !== undefined ? admin.data.avatarUrl : null}
                        />
                        <Text strong style={{ paddingLeft: "20px", color: "white" }}>
                            {admin.data.name}
                        </Text>
                    </Menu.Item>
                    <Menu.Item key="2" title="My Profile" icon={<UserOutlined />} onClick={showProfileDrawer}>
                        My Profile
                    </Menu.Item>
                    <Menu.Item key="3" title="My Profile" icon={<HomeOutlined />} onClick={onMenuClose}>
                        <Link to="/admin-p/admin-dashboard">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="4" title="Logout" icon={<LogoutOutlined />}>
                        <Popconfirm
                            title="Are you sure you want to log out?"
                            onConfirm={handleLogout}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            Logout
                        </Popconfirm>
                    </Menu.Item>
                </Menu>
            </Drawer>
            <Drawer
                width={340}
                title="My Profile"
                placement="right"
                closable={false}
                onClose={onClose}
                zIndex={2000}
                visible={visibleProfile}>
                <Descriptions title={admin.data.name}>
                    <Col span={24} style={{ paddingTop: "1em", textAlign: "center" }}>
                        <Avatar
                            src={admin.data.avatarUrl}
                            alt={admin.data.name}
                            size={200}
                        ><UserOutlined /></Avatar>
                    </Col>

                    <Descriptions.Item span={12} label="Email">
                        {admin.data.email}
                    </Descriptions.Item>
                    <Descriptions.Item span={12} label="Vertical">
                        {admin.data.vertical}
                    </Descriptions.Item>

                </Descriptions>
            </Drawer>

            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 10, background: "#022036" }}>
                    <Row>
                        <Col
                            xs={{ span: 1, offset: 0 }}
                            sm={{ span: 2, offset: 0 }}
                            md={{ span: 2, offset: 0 }}
                            lg={{ span: 1, offset: 0 }}>
                            <MenuUnfoldOutlined
                                onClick={showMenuDrawer}
                                style={{ color: "whitesmoke", fontSize: 40 }}
                            />
                        </Col>
                        <Col
                            xs={{ span: 10, offset: 5 }}
                            sm={{ span: 8, offset: 8 }}
                            md={{ span: 8, offset: 8 }}
                            lg={{ span: 6, offset: 8 }}>
                            <Typography.Title level={2} style={{ color: "#fefefe", margin: 0, lineHeight: "200%" }}>
                                E-SUMMIT 2021 Admin <span style={{ fontWeight: "lighter" }}> E-Cell IITM</span>
                            </Typography.Title>
                        </Col>
                        <Col
                            xs={{ span: 1, offset: 4 }}
                            sm={{ span: 1, offset: 3 }}
                            md={{ span: 1, offset: 3 }}
                            lg={{ span: 1, offset: 6 }}>
                            <Avatar
                                size={40}
                                style={{ cursor: "pointer", float: "right", backgroundColor: "#00152a" }}
                                icon={<UserOutlined />}
                                onClick={showProfileDrawer}
                                src={admin.data.avatarUrl !== undefined ? admin.data.avatarUrl : null}
                            />
                        </Col>
                        <Col
                            xs={{ span: 1, offset: 2 }}
                            sm={{ span: 1, offset: 1 }}
                            md={{ span: 1, offset: 1 }}
                            lg={{ span: 1, offset: 0 }}>
                            <Popconfirm
                                title="Are you sure you want to log out?"
                                onConfirm={handleLogout}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No">
                                <Avatar
                                    size={40}
                                    style={{ cursor: "pointer", float: "right", backgroundColor: "#00152a" }}
                                    icon={<LogoutOutlined />}
                                />
                            </Popconfirm>
                        </Col>
                    </Row>
                </Header>

                <Content style={{ margin: "0 16px" }}>
                    {admin.data.events
                        ? admin.data.events.map((event) => (
                            <Route key={event._id} path={`/admin-p/admin-dashboard/${event._id}`}>
                                <Event eventID={event._id} />
                            </Route>
                        ))
                        : null}
                    <Route exact path="/admin-p/admin-dashboard/">
                        <Greetings />
                    </Route>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Structure;
