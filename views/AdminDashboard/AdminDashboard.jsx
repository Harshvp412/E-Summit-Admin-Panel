import React from "react";
import { Layout } from "antd";
import Structure from "./DashboardStructure";

const { Content } = Layout;

const AdminDashboard = () => {
    return (
        <Layout>
            <Content>
                <Structure />
            </Content>
        </Layout>
    );
};

export default AdminDashboard;
