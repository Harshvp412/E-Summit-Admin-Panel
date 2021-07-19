import React from 'react'
import { Row, Col, Typography, Card, Divider, Avatar, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Submissions from './Submissions';

const { Title } = Typography

function TeamLeader(props) {
    const { teamLeader, event } = props


    return (
        <div>
            {/* {
                 console.log("gfcuuojbhknjkjo")
            } */}
            <div className="site-layout-content">
                <Title level={3}> {teamLeader.teamName} </Title>
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                {
                                    Object.keys(teamLeader).filter((key) => key !== "__v").filter((key) => key !== "eventID").filter((key) => key !== "leaderID").filter((key) => key !== "userID").filter((key) => key !== "creationTime").filter((key) => key !== "lastUpdated").filter((key) => key !== "_id")
                                        .filter((key) => key !== "key").filter((key) => key !== "textSubmissionUrls").filter((key) => key !== "pdfSubmissionUrls").filter((key) => key !== "submissions")
                                        .filter((key) => key !== "teamMates").filter((key) => key !== "isLeader").filter((key) => key !== "name").filter((key) => key !== "email").filter((key) => key !== "summitID")
                                        .filter((key) => key !== "instituteName").filter((key) => key !== "teamName").filter((key) => key !== "paymentDetails").map(key => {
                                            // {
                                            //     console.log(key, "keeeeeeeeeeey")
                                            // }
                                            if (key === "registrationDetails") {
                                                return Object.keys(teamLeader["registrationDetails"]).map(key => {
                                                    return <Row>
                                                        <Col span={12}>
                                                            <p style={{ fontSize: 20 }}>
                                                                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}
                                                            </p>
                                                        </Col>
                                                        <Col span={12}>
                                                            <p style={{ fontSize: 20 }}>
                                                                {(teamLeader.registrationDetails[key])}
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                })
                                            }
                                            else {
                                                return <Row>
                                                    <Col span={12}>
                                                        <p style={{ fontSize: 20 }}>
                                                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}
                                                        </p>
                                                    </Col>
                                                    <Col span={12}>
                                                        <p style={{ fontSize: 20 }}>
                                                            {(teamLeader[key])}
                                                        </p>
                                                    </Col>
                                                </Row>
                                            }
                                        })
                                }
                            </Col>
                        </Row>


                        {
                            <Row>
                                {
                                    teamLeader.teamMates.map(teamMate => {

                                        return <Col>

                                            <Card title={teamMate.summitID}
                                                style={{ width: 600 }} hoverable extra={<Avatar src={teamMate.avatarURL} style={{ backgroundColor: "forestgreen" }} size={80}>
                                                    <UserOutlined size={250} />
                                                </Avatar>} >
                                                {
                                                    Object.keys(teamMate).filter((key) => key !== "__v").filter((key) => key !== "eventID").filter((key) => key !== "leaderID").filter((key) => key !== "userID").filter((key) => key !== "creationTime").filter((key) => key !== "lastUpdated").filter((key) => key !== "_id")
                                                        .filter((key) => key !== "key").filter((key) => key !== "textSubmissionUrls").filter((key) => key !== "pdfSubmissionUrls").filter((key) => key !== "submissions")
                                                        .filter((key) => key !== "teamMates").filter((key) => key !== "isLeader").filter((key) => key !== "summitID")
                                                        .filter((key) => key !== "teamName").filter((key) => key !== "paymentDetails").filter((key) => key !== "registrationDetails").map(key => {
                                                            return <Row>
                                                                <Col span={12}>
                                                                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}
                                                                </Col>
                                                                <Col span={12}>
                                                                    {(teamMate[key])}
                                                                </Col>
                                                            </Row>

                                                        })
                                                }
                                            </Card>
                                        </Col>
                                    })
                                }
                            </Row>
                        }

                        <Divider />
                    </Col>
                    <Col span={12}>
                        <Submissions submissions={teamLeader.submissions} event={event} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TeamLeader
