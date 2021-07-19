import React from "react";
import { useSelector } from "react-redux";
import {  SmileOutlined } from "@ant-design/icons";
import { Statistic, Row, Col, Card } from "antd";
import Title from "antd/lib/typography/Title";

function Statistics(props) {
    const { eventID } = props;
    const admin = useSelector((state) => state.admin);
    const event = useSelector(state => state.admin.data.events.filter((event) => event._id === eventID)[0])
   // console.log(admin.data.events.filter((event) => event._id === eventID)[0].roundWiseSelectedParticipants, "admin.data.events.filter((event) => event._id === eventID)[0].roundWiseSelectedParticipants")
    const stats = admin.data.events.filter((event) => event._id === eventID)[0].roundWiseSelectedParticipants
    const isTeamEvent = Boolean(admin.data.events.filter((event) => event._id === eventID)[0].teamLeaders ? admin.data.events.filter((event) => event._id === eventID)[0].teamLeaders.length : admin.data.events.filter((event) => event._id === eventID)[0].teamLeaders)


    var i = 0
    var j = 0

    return (
        <div
            className="site-statistic-demo-card"
            style={{
                background: "#ececec",
                padding: "10px",
                textAlign: "center",
            }}>
            <Row gutter={16} justify="center" >
                <Col>
                    <Row justify="center">
                        <Title level={5}>Participants</Title></Row>
                    <Row gutter={8} justify="center">
                        {/* {
                            console.log(statisticsState, "statisticsState.selectedParticipants")
                        } */}
                        {
                            (stats !== undefined) ? stats.map((participantsForThisRound) => {
                                // console.log(participantsForThisRound, "noOfParticipantsForThisRound")
                                i++;
                                if (participantsForThisRound.length) {
                                    return (<div><Col >
                                        <Card >
                                            <Row justify="center">
                                                <Statistic          
                                                    value={participantsForThisRound.length}
                                                    precision={0}
                                                    valueStyle={{ color: event.round !== i ? "#d38027" : "#706b6b", fontSize: "50px" }}
                                                    prefix={<SmileOutlined />}     
                                                    style={{ textAlign: "center", minHeight: "50px" }}
                                                />
                                            </Row>
                                            <Row justify="center">
                                                <Title level={5} style={{ color: event.round !== i ? "#d38027" : "#706b6b" }}>
                                                    Round {i}
                                                </Title>
                                            </Row>
                                        </Card>
                                    </Col>
                                    </div>)
                                }

                                else return null
                            }) : null
                        }
                    </Row>
                </Col>

                <Col>
                    <Row justify="center">
                        {
                            isTeamEvent ? <Title level={5}>Teams</Title> : null
                        } </Row>
                    <Row gutter={8} justify="center">
                        {/* {
                            console.log(statisticsState, "statisticsState.selectedParticipants")
                        } */}
                        {
                            (stats !== undefined) ? stats.map((participantsForThisRound) => {
                                // console.log(participantsForThisRound, "noOfParticipantsForThisRound")
                                j++;
                                if (participantsForThisRound.length) {
                                    return (<div> {
                                        isTeamEvent ? <Col >
                                            <Card >
                                                <Row justify="center">
                                                    <Statistic
                                                        value={participantsForThisRound.filter(participant => participant.isLeader === true).length}
                                                        precision={0}
                                                        valueStyle={{ color: event.round !== j ? "#d38027" : "#706b6b", fontSize: "50px" }}
                                                        prefix={<SmileOutlined />}
                                                        style={{ textAlign: "center", minHeight: "50px" }}
                                                    />
                                                </Row>
                                                <Row justify="center">
                                                    <Title level={5} style={{ color: event.round !== j ? "#d38027" : "#706b6b" }}>
                                                        Round {j}
                                                    </Title>
                                                </Row>
                                            </Card>
                                        </Col> : null
                                    }
                                    </div>)
                                }

                                else return null
                            }) : null
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default Statistics;
