import React from "react";
import { Typography, Row, Col, Card, Divider, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getParticipants, } from "../../redux/admin/adminActions";


const { Title } = Typography;

function Greetings() {
    const dispatch = useDispatch();
    const events = useSelector((state) => state.admin.data.events);
    return (
        <div>
            <Row>
                <Col xs={{ offset: 2 }} sm={{ offset: 5 }} md={{ offset: 7 }} lg={{ offset: 10 }} xl={{ offset: 9 }}>
                    <Title style={{ textAlign: "center", paddingTop: 20, paddingLeft: 20 }} level={2}>
                        Welcome to your dashboard
                    </Title>
                </Col>
            </Row>

            <Divider />
            <Title level={2}>Your events</Title>

            <Row gutter={24}>
                {events
                    ? events.map((event) => (
                        <Col
                            xs={{ span: 24, offset: 0 }}
                            sm={{ span: 24, offset: 0 }}
                            md={{ span: 12, offset: 0 }}
                            lg={{ span: 8, offset: 0 }}>
                            <Card hoverable={true} style={{ backgroundColor: "#fffffffa" }}>
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Title level={3}>{event.displayName} {event.isTeamEvent ? <Tag color="#f50">Team Event</Tag> : <Tag color="#87d068">Solo Event</Tag>}</Title>
                                    </Col>
                                    <Col span={4}>
                                        {event.isLive ? <Tag color="#f40606">Live</Tag> : <Tag color="default">Not Live</Tag>}
                                    </Col>
                                    <Col span={24}>
                                        <Link
                                            to={`/admin-p/admin-dashboard/${event._id}`}
                                            onClick={() => {
                                                // console.log("here,.,.,.,,.,")
                                                dispatch(getParticipants(event._id))
                                            }}
                                            style={{ fontSize: "20px" }}>
                                            Go to event
                                          </Link>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    ))
                    : null}
            </Row>
        </div>
    );
}

export default Greetings;
