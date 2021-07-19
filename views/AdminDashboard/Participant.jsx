import React from 'react'


import {  Row, Col, Typography,  Divider,  Avatar, } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Submissions from "./Submissions"

const { Title } = Typography
function Participant(props) {
    const { participant, event} = props
    return (
        <div>
            {/* {
                 console.log("gfcuuojbhknjkjo")
            } */} 
                        <div className="site-layout-content">
                            <Row>
                                <Col span = {16}>
                                <Title level={3}> {participant.name} </Title>
                            <Row>
                                <Col span={4}>
                                    <Avatar src={participant.avatarURL} style={{ backgroundColor: "forestgreen" }} size={200}>
                                        <UserOutlined size={250} />
                                    </Avatar>
                                </Col>
                                <Col span = {20}>
                                {
                              Object.keys(participant).filter((key) => key!== "__v" ).filter((key) => key!== "eventID" ).filter((key) => key!== "userID" ).filter((key) => key!== "creationTime" ).filter((key) => key!== "lastUpdated" ).filter((key) => key!== "_id" )
                              .filter((key) => key!== "key" ).filter((key) => key!== "textSubmissionUrls" ).filter((key) => key!== "pdfSubmissionUrls" ).filter((key) => key!== "submissions" ).filter((key) => key!== "paymentDetails" ).map(key => {
                                if(key!== "registrationDetails" ){
                                return <Row>
                                    <Col span ={12}>
                                   <p style ={{fontSize: 20}}> 
                                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}
                                  </p>
                                    </Col>
                                    <Col span ={12}>
                                    <p style ={{fontSize: 20}}>
                                  { (participant[key] )}
                                  </p>
                                    </Col>
                              </Row> }
                              else  return null
                              })
                          }

                          {
                               Object.keys(participant).filter((key) => key!== "__v" ).filter((key) => key!== "eventID" ).filter((key) => key!== "userID" ).filter((key) => key!== "creationTime" ).filter((key) => key!== "lastUpdated" ).filter((key) => key!== "_id" )
                               .filter((key) => key!== "key" ).filter((key) => key!== "textSubmissionUrls" ).filter((key) => key!== "pdfSubmissionUrls" ).filter((key) => key!== "submissions" ).filter((key) => key!== "paymentDetails" ).map(key => {
                                 if(key=== "registrationDetails" ){
                                     return Object.keys(participant["registrationDetails"]).map(key => {
                                        return <Row>
                                     <Col span ={12}>
                                    <p style ={{fontSize: 20}}> 
                                   {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}
                                   </p>
                                     </Col>
                                     <Col span ={12}>
                                     <p style ={{fontSize: 20}}>    
                                   {(participant.registrationDetails[key])}
                                   </p>
                                     </Col>
                               </Row> 
 
                                     })
 
                                 }
                                 else  return null
                                })
                                 
                          }
                                </Col>
                               
                            </Row>
                                </Col>
                                <Col span = {8}>
    <Submissions submissions = {participant.submissions} event = {event}/>
</Col>
                            </Row>
                            
                            <Divider />
                        </div>
            
        </div>
    )
}

export default Participant
