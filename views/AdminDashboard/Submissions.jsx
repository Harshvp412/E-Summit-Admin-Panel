import React from 'react'
import { Row, Col, Typography, Card, } from 'antd';
import { CSVLink } from "react-csv"
const { Title } = Typography


function Submissions(props) {
    const { submissions, event } = props
    // console.log(submissions, "submissions")
    const roundWiseSubmissions = [[], [], [], [], [], []]

    if (submissions) {
        submissions.map((submission) => {
            if (submission) { roundWiseSubmissions[submission.round - 1].push(submission) }
        return null
        })
    }

    // console.log(roundWiseSubmissions, "roundWiseSubmissions")
    var i = 0

    return (
        <div>
            <Row>
                <Col>
                    <Title level={4}>Submissions</Title></Col>
            </Row>
            <Row>
                {
                    roundWiseSubmissions ? roundWiseSubmissions.map(thisRoundSubmissions => {
                        i++;
                        if (thisRoundSubmissions.length) {
                            const thisRoundFields = thisRoundSubmissions.map(submission => submission.name)
                            var uniqueThisRoundFields = []
                            thisRoundFields.map(field => {
                                if (!uniqueThisRoundFields.includes(field)) {
                                    uniqueThisRoundFields.push(field)

                                }
                            return null
                            })
                            return <Col>

                                <Card title={`Round ${i}`}>
                                    {/* {
                                        console.log(uniqueThisRoundFields, "uniqueThisRoundFields")
                                    } */}
                                    {
                                        uniqueThisRoundFields.map(field => {
                                            var k = 0
                                            const thisRoundSortedSubmissions = thisRoundSubmissions.filter(submission => submission.name === field).sort(function (a, b) { return a.timestamp - b.timestamp })
                                            // console.log(thisRoundSortedSubmissions, "thisRoundSortedSubmissions")
                                            return <Col>
                                                {
                                                    thisRoundSortedSubmissions.filter(submission => submission.name === field).map(submission => {
                                                        k++;
                                                        if (submission.name !== "questionnaire") {
                                                            return <Row gutter={8}>
                                                                <Col>
                                                                    <Row>
                                                                        <a href={submission.submission} target="_blank" rel="noopener noreferrer">{submission.name.charAt(0).toUpperCase() + submission.name.slice(1).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")}  {k} </a>
                                                                    </Row>
                                                                    <Row>
                                                                        {(new Date(submission.timestamp)).toDateString().split("1970")[0]}  {(new Date(submission.timestamp)).toTimeString().split("GMT")[0]}
                                                                    </Row>
                                                                </Col>

                                                            </Row>
                                                        }
                                                        else {
                                                            return <Row gutter={8}>
                                                                <Col>
                                                                    <Row>
                                                                        {/* {
                                                                            console.log(Object.keys(submission.submission), Object.keys(submission.submission).map(key => submission.submission[key]), "submission.submission")
                                                                        } */}
                                                                        <CSVLink
                                                                            filename={`E-Cell_${event.name}_${submission.name}_round${i}_data.csv`}
                                                                            data={
                                                                                [
                                                                                    Object.keys(submission.submission), Object.keys(submission.submission).map(key => submission.submission[key])
                                                                                ]}
                                                                            className="btn btn-primary"
                                                                        >
                                                                            {submission.name.charAt(0).toUpperCase() + submission.name.slice(1).replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")} {k}
                                                                        </CSVLink></Row>
                                                                    <Row>
                                                                        {(new Date(submission.timestamp)).toDateString().split("1970")[0]}  {(new Date(submission.timestamp)).toTimeString().split("GMT")[0]}
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        }
                                                    })
                                                }

                                            </Col>
                                        })
                                    }
                                </Card>
                            </Col>
                        }
                        else  return null
                    }) : <p> No submissions</p>
                }

            </Row>
        </div>
    )
}

export default Submissions
