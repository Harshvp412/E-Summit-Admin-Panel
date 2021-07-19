import React, { useState } from "react";
import { Button, Input, Form, Modal, Row, Space, Steps, Typography, Result } from "antd";
import { MailOutlined, KeyOutlined, CheckCircleOutlined, SmileOutlined } from "@ant-design/icons";
import Axios from "axios";
import openNotification from "../../../utils/openAntdNotification";

// const SERVER_URL = "https://localhost:5100";
const axios = Axios.create({
    baseURL: "https://esummitiitm.org/api/esummit-admin",
    // baseURL: "http://localhost:5100/api/esummit-admin",
    withCredentials: true,
});

const { Step } = Steps;

const ForgotLoginModal = ({ visible, setVisible, userType }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const onEmailFinish = async ({email}) => {
        setLoading(true);
        try {
			const res = await axios.get(`/pw-reset-mail?email=${email}`);
			if (res.data && res.data.success) {
				setEmail(email);
				setLoading(false);
				setCurrentStep(1);
			}
        } catch (error) {
            setLoading(false);
            console.log(error);
            openNotification("error", (error.response && error.response.data.msg) || error.message);
        }
    };

    const onPasswordFinish = async (values) => {
        setLoading(true);
        try {
            const dataToPost = { ...values, email };
			const res = await axios.post(`/reset-password/`, dataToPost);
			if (res.data.success) {
				setLoading(false);
				setCurrentStep(2);
			}
        } catch (error) {
            setLoading(false);
            console.log(error);
            openNotification("error", error.response.data.msg || error.message);
        }
    };
    return (
        <Modal visible={visible} closable={false} footer={null} destroyOnClose={true}>
            <Steps current={currentStep}>
                <Step icon={<MailOutlined />} />
                <Step icon={<KeyOutlined />} />
                <Step icon={<CheckCircleOutlined />} />
            </Steps>
            {currentStep === 0 ? (
                <Form
                    name="forgotPasswordModal"
                    onFinish={onEmailFinish}
                    preserve={false}
                    layout="vertical"
                    validateTrigger="onSubmit">
                    <Form.Item
                        name="email"
                        label="Enter the corresponding E-Mail"
                        rules={[
                            { required: true, message: "Please enter your E-Mail" },
                            { type: "email", message: "The input is not a valid E-Mail" },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Row justify="end">
                        <Space>
                            <Button onClick={() => setVisible(false)}>Cancel</Button>
                            <Form.Item style={{ marginBottom: "0" }}>
                                <Button htmlType="submit" type="primary" loading={loading}>
                                    Send Password Reset Code
                                </Button>
                            </Form.Item>
                        </Space>
                    </Row>
                </Form>
            ) : currentStep === 1 ? (
                <Form
                    name="forgotPasswordModal"
                    onFinish={onPasswordFinish}
                    preserve={false}
                    layout="vertical"
                    validateTrigger="onSubmit">
                    <Typography.Text strong>Check your Mail! We've sent you a reset code.</Typography.Text>
                    <Form.Item
                        label="Insert the reset code here"
                        name="resetCode"
                        rules={[{ required: true, message: "Please input the required code." }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Your new password"
                        name="newPassword"
                        rules={[{ required: true, message: "Please input your new password" }]}>
                        <Input.Password />
                    </Form.Item>
                    <Row justify="end">
                        <Space>
                            <Button
                                onClick={() => {
                                    setCurrentStep(0);
                                    setVisible(false);
                                }}>
                                Cancel
                            </Button>
                            <Form.Item style={{ marginBottom: "0" }}>
                                <Button htmlType="submit" type="primary" loading={loading}>
                                    Reset My Password
                                </Button>
                            </Form.Item>
                        </Space>
                    </Row>
                </Form>
            ) : (
                <Result
                    icon={<SmileOutlined />}
                    title="Password reset successful!"
                    extra={
                        <Button type="primary" onClick={() => setVisible(false)}>
                            Close
                        </Button>
                    }
                />
            )}
        </Modal>
    );
};

export default ForgotLoginModal;
