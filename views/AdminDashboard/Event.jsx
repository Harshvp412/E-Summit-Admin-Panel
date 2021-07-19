import React, { Fragment, useEffect, useRef, useState } from "react";
import { Tabs, Card, Button, Typography, Input, Row, Col, Table, Space, Popconfirm, Switch, Tag, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import Highlighter from 'react-highlight-words';
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined, } from '@ant-design/icons';
import { getParticipants, promoteParticipants, registerThroughCSV, toggleEventStatus } from "../../redux/admin/adminActions";
import { Link, Route } from "react-router-dom";
import Statistics from "./Statistics";
import Participant from "./Participant";
import TeamLeader from "./TeamLeader"
import openNotification from "../../utils/openAntdNotification"
import { CSVLink } from "react-csv"
import FileUpload from "./FileUpload";
import Submissions from "./Submissions";
import { useHistory } from "react-router-dom";




const { Paragraph } = Typography;
const { TabPane } = Tabs;


// function makeid(length) {
// 	var result = 0;
// 	var characters = "0123456789";
// 	var charactersLength = characters.length;
// 	for (var i = 0; i < length; i++) {
// 		result += characters.charAt(Math.floor(Math.random() * charactersLength));
// 	}
// 	return result;
// }

const Event = (props) => {
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    // const phoneRef = useRef(null)
    const instituteNameRef = useRef(null)
    const summitIDRef = useRef(null)
    const teamNameRef = useRef(null)

    const hist = useHistory();

    // const [loading, setLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const mainLoading = useSelector(state => state.admin.data.loading)


    const [searchState, setSearchState] = useState({
        searchText: '',
        searchedColumn: '',
    })

    const { eventID } = props;
    const admin = useSelector(
        (state) => state.admin.data
    )
    const event = useSelector(
        (state) => state.admin.data.events.filter((event) => event._id === eventID)[0]
    );
    // const [isLive, setIsLive] = useState(false)
    const [CSVParticipants, setCSVParticipants] = useState([])
    const fileChangeHandler = async (participants) => {
        await setCSVParticipants(participants)
        // console.log(CSVParticipants, "csvparticipanst")
    }

    const handleCSVSubmitSuccess = (msg) => {

        openNotification("success", msg,)
        dispatch(getParticipants(event._id));
        setLoading(false)
        return null
    }

    const handleCSVError = (errMsg) => {
        openNotification("error", errMsg)
        dispatch(getParticipants(event._id));
        setLoading(false)

    }

    const CSVSubmitHandler = () => {


        // const CSVParticipantsWithRandomPhoneNum = CSVParticipants.map(participant =>{ return {...participant, phone : makeid(14)}})
        dispatch(registerThroughCSV({ CSVParticipants, isTeamEvent: event.isTeamEvent, eventID: event._id }, handleCSVSubmitSuccess, handleCSVError))
        // dispatch(getParticipants(event._id));
        setLoading(false)

        // console.log(CSVParticipants, "gsacxhgjhahsbxkjbslcjakjcbkabckjaknlk")
    }

    const [selectionState, setSelectionState] = useState({
        selectedIDs: [], // Check here to configure the default column
        numOfTeams: 0
    })

    const [maxRound, setMaxRound] = useState(0)


    var i = 0
    var j = 0
    const dispatch = useDispatch();

    // const admin = useSelector((state) => state.admin);

    // console.log(admin.data.events, "ertghjjhjknm,")

    // console.log(event.teamLeaders, "teamLeaders")



    // console.log(event, "ertghjjhjknm,")


    // useEffect(() => {
    //     setLoading(true)
    //     dispatch(getParticipants(event._id));
    //     setLoading(false)
    // }, [loading, dispatch, event._id ]);

    const rowSelection = {
        onChange: async (selectedRowKeys, selectedRows) => {
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            if (event.teamLeaders.length !== 0 && event.teamLeaders !== undefined && event.teamLeaders !== null) {
                // console.log(selectedRows.map((row) => {
                //     return [row._id, ...row.teamMates.map(teamMate => teamMate._id)]
                // }).flat(), 'dgfghjklbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')
                await setSelectionState({
                    selectedIDs: [].concat.apply([], selectedRows.map((row) => {
                        setMaxRound(maxRound < row.round ? row.round : maxRound)
                        return [row._id, ...row.teamMates.map(teamMate => teamMate._id)]
                    }))
                    , numOfTeams: selectedRows.length
                })
            }
            else {
                await setSelectionState({
                    selectedIDs: selectedRows.map((row) => {
                        setMaxRound(maxRound < row.round ? row.round : maxRound)
                        return row._id
                    }
                    )
                })
                // console.log(selectionState, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            }
            // console.log(selectionState, "1")
        },

        onSubmit : async (selectedRowKeys, selectedRows) => {
            console.log("done")
            // this.setState({ selectedRowKeys: []})
        }

    };

    const getColumnSearchProps = (dataIndex, ref) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={ref}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
              </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
              </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => {
            return record[dataIndex]
                ? record[dataIndex].toLowerCase().includes(value.toLowerCase())
                : ''
        },
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => ref.current.select(), 100);
            }
        },
        render: text =>
            searchState.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchState.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                    text
                ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setSearchState({ searchText: '' });
    };

    const handleSuccess = () => {
        openNotification("success", "The selected participant(s) were promoted ", "Check the tab coresponding to next round")
        setSelectionState({  selectedIDs: [], // Check here to configure the default column
            numOfTeams: 0})

            setTimeout(() => {
                hist.push(`/`);
            }, 2000);
            setTimeout(() => {
                hist.push(`/admin-p/admin-dashboard/${event._id}`);
            }, 2010);
        dispatch(getParticipants(event._id));
    }
    const handleToggleSuccess = (msg) => {
        openNotification("success", msg,)
    }

    const handleError = (errMsg) => {
        openNotification("error", errMsg)
        dispatch(getParticipants(event._id));
    }

    const handleSubmit = () => {
        // console.log(selectionState, "selected")
        rowSelection.onSubmit()
        setLoading(true)

        if (maxRound === event.numOfRounds) {
            openNotification("warning", "Already reached the final round")
        } else {
            // console.log(selectionState.selectedIDs, "fffffffffffffffffffffffffffffffffffffffffffff")
            dispatch(promoteParticipants(selectionState.selectedIDs, maxRound, eventID, handleSuccess, handleError))
        }
        setSelectionState({
            selectedIDs: [], // Check here to configure the default column
            numOfTeams: 0

        })
        setInterval(() => {
            setLoading(false)
            // dispatch(getParticipants(event._id));

        }, 1000);

    }
    const handleToggle = () => {
        // console.log("toggle")
        dispatch(toggleEventStatus(eventID, handleToggleSuccess, handleError))
    }
    return (

        <Fragment >
            <Route key={event._id} exact path={`/admin-p/admin-dashboard/${event._id}`} >

                {
                    console.log(admin.isEvaluator, " admin.isEvaluator")
                }

                <Row style={{ padding: 10, paddingTop: 20 }}>
                    <Col span={15} >
                        <Title level={3} >
                            {" "}
                            {event.displayName}  {event.isTeamEvent ? <Tag color="#f50">Team Event</Tag> : <Tag color="#87d068">Solo Event</Tag>}
                        </Title>
                    </Col>
                    {
                        admin.isEvaluator ?

                            null
                            : <Col>
                                <Row gutter={10}>
                                    <Col span={8}>
                                        <Title level={5} >
                                            Event Controls :
                </Title>
                                    </Col>
                                    <Col span={4}>
                                        <Switch checkedChildren="Live" unCheckedChildren="Not live" defaultChecked={event.isLive} onChange={handleToggle} />
                                    </Col>
                                    <Col span={8}><FileUpload onChange={fileChangeHandler}> </FileUpload></Col>
                                    <Col span={4}>
                                        <Popconfirm
                                            title="Please re-check the file. Make sure that the correct file is uploaded. This action can't be undone. Submit? "
                                            onConfirm={CSVSubmitHandler}
                                            disabled={!CSVParticipants.length}
                                            okText="Yes"
                                            cancelText="No">
                                            <Button disabled={!CSVParticipants.length}>Submit CSV</Button>
                                        </Popconfirm>
                                    </Col>
                                </Row>
                            </Col>


                    }
                </Row>
                <Spin spinning={mainLoading}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Event Overview" key="1">
                            <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "more" }} style={{ fontSize: "1.5em" }}>
                                {event.description}
                            </Paragraph>
                            <Row jusify="center">
                                <Col span={24}>
                                    {
                                        event.participants.length ?
                                            <Statistics eventID={eventID} /> : null
                                    }

                                </Col>
                            </Row>
                        </TabPane>
                        {
                            (event.isTeamEvent) ?
                                event.roundWiseSelectedTeamLeaders ? event.roundWiseSelectedTeamLeaders.map((thisRoundSelectedTeamLeaders) => {
                                    // console.log(event.isTeamEvent, "event.teamLeaders")
                                    i++;
                                    if (i <= event.numOfRounds) {
                                        return (
                                            <TabPane tab={`Round ${i}`} key={i + 1}>

                                                {/* {
                                                thisRoundSelectedTeamLeaders[i - 1] ? console.log(Object.keys(thisRoundSelectedTeamLeaders[i - 1]), thisRoundSelectedTeamLeaders[i - 1], "{Object.keys(thisRoundSelectedTeamLeaders)") : null
                                            } */}
                                                {
                                                    (thisRoundSelectedTeamLeaders[i - 1] !== undefined) ? console.log(Object.keys(thisRoundSelectedTeamLeaders[i - 1]).filter((key) => key !== "eventID" || key !== "userID").map(key => {
                                                        if (key === "pdfSubmissionUrls") {

                                                            return {
                                                                title: key,
                                                                dataIndex: key,
                                                                key: key,
                                                                render: (text, teamLeader) => (
                                                                    <Space size="middle">
                                                                        <Link to={`/esummmit-admin/dashboard/${event._id}/${teamLeader._id}`}>View Submissions</Link>
                                                                    </Space>
                                                                )
                                                            }
                                                        }
                                                        else if (key === "textSubmissionUrls") {
                                                            return {
                                                                title: key,
                                                                dataIndex: key,
                                                                key: key,
                                                                render: (text, teamLeader) => (
                                                                    <Space size="middle">
                                                                        <Link to={`/esummmit-admin/dashboard/${event._id}/${teamLeader._id}`}>View Submissions</Link>
                                                                    </Space>
                                                                )
                                                            }

                                                        }
                                                        else {
                                                            return {
                                                                title: "Name",
                                                                dataIndex: "name",
                                                                key: "name"
                                                            }
                                                        }
                                                    }), thisRoundSelectedTeamLeaders[i - 1].name) : null
                                                    // console.log("watch me")
                                                }

                                                {/* {

                                                (thisRoundSelectedTeamLeaders !== undefined) ? console.log(thisRoundSelectedTeamLeaders, " thisRoundSelectedTeamLeaders[i-1]") : null
                                            } */}

                                                {/* {
                                                (thisRoundSelectedTeamLeaders !== undefined) ? console.log(thisRoundSelectedTeamLeaders[i - 1] ? thisRoundSelectedTeamLeaders.map(teamLeader => {
                                                    if (teamLeader) {
                                                        j++
                                                        var pdfSubmissionUrls = []
                                                        const concatinater = teamLeader.pdfsubmissionUrls ? teamLeader.pdfsubmissionUrls.map(pdfSubmissionUrl => {
                                                            var pdfSubmissionUrlList = pdfSubmissionUrls.push(<a href={pdfSubmissionUrl}> {pdfSubmissionUrl} </a>, " ")
                                                        }) : ""
                                                        return { ...teamLeader, key: String(j), pdfSubmissionUrlList: teamLeader ? pdfSubmissionUrls : "" }
                                                    }

                                                }) : [], "fdgugjvbmn") : null
                                            } */}
                                                { thisRoundSelectedTeamLeaders !== undefined ?
                                                    <div>
                                                        <div style={{ marginBottom: 16 }}>

                                                            {
                                                                admin.isEvaluator ? null :

                                                                    <Row>
                                                                        <Col>

                                                                        </Col>

                                                                        <Col offset={20}>
                                                                            <Row>
                                                                                <Col >

                                                                                    <Popconfirm
                                                                                        title="Are you sure you want to promote these team(s)? This action can't be undone"
                                                                                        onConfirm={handleSubmit}
                                                                                        okText="Yes"
                                                                                        cancelText="No">
                                                                                        <Button type="primary" disabled={!(selectionState.selectedIDs.length > 0)} >Promote  </Button>
                                                                                    </Popconfirm>
                                                                                </Col>
                                                                                <Col>
                                                                                    <span style={{ marginLeft: 8, fontSize: 15 }}>
                                                                                        {selectionState.selectedIDs.length ? `Selected ${selectionState.numOfTeams} team(s)` : ''}
                                                                                    </span>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                            }
                                                        </div>
                                                        <Table loading={loading}
                                                            rowSelection={{
                                                                type: "checkbox",
                                                                ...rowSelection,
                                                                
                                                            }}
                                                            dataSource={
                                                                thisRoundSelectedTeamLeaders ? thisRoundSelectedTeamLeaders.map(teamLeader => {
                                                                    if (teamLeader) {
                                                                        j++
                                                                        return { ...teamLeader, key: String(j) }
                                                                    }
                                                                    else return null
                                                                }) : []
                                                            }
                                                            columns={thisRoundSelectedTeamLeaders[0] ? Object.keys(thisRoundSelectedTeamLeaders[0]).filter((key) => key === "name" || key === "round" || key === "email" || key === "instituteName"
                                                                //  || key === "phone" 
                                                                || key === "summitID" || key === "teamName").map(key => {
                                                                    if (key === "round") {
                                                                        return {
                                                                            title: "Round",
                                                                            dataIndex: "round",
                                                                            key: "round",
                                                                        }
                                                                    }
                                                                    else if (key === "name") {
                                                                        return {
                                                                            title: "Team Leader",
                                                                            dataIndex: "name",
                                                                            key: "name",
                                                                            ...getColumnSearchProps("name", nameRef),
                                                                        }
                                                                    }
                                                                    else if (key === "teamName") {
                                                                        return {
                                                                            title: "Team Name",
                                                                            dataIndex: "teamName",
                                                                            key: "teamName",
                                                                            ...getColumnSearchProps("teamName", teamNameRef),
                                                                        }
                                                                    }
                                                                    else if (key === "email") {
                                                                        return {
                                                                            title: "Email",
                                                                            dataIndex: "email",
                                                                            key: "email",
                                                                            ...getColumnSearchProps("email", emailRef),
                                                                        }
                                                                    }
                                                                    // else if (key === "phone") {
                                                                    //     return {
                                                                    //         title: "Phone",
                                                                    //         dataIndex: "phone",
                                                                    //         key: "phone",
                                                                    //         ...getColumnSearchProps("phone", phoneRef),
                                                                    //     }
                                                                    // }
                                                                    else if (key === "instituteName") {
                                                                        return {
                                                                            title: "Institute Name",
                                                                            dataIndex: "instituteName",
                                                                            key: "instituteName",
                                                                            ...getColumnSearchProps("instituteName", instituteNameRef),
                                                                        }
                                                                    }
                                                                    else if (key === "summitID") {
                                                                        return {
                                                                            title: "E-Summit ID",
                                                                            dataIndex: "summitID",
                                                                            key: "summitID",
                                                                            ...getColumnSearchProps("summitID", summitIDRef),
                                                                        }
                                                                    }
                                                                    else return null
                                                                }) : null}
                                                            expandable={{
                                                                expandedRowRender: (teamLeader => {
                                                                    if (admin.isEvaluator) {
                                                                        return <Submissions submissions={teamLeader.submissions} event={event} />
                                                                    }
                                                                    else {
                                                                        return <TeamLeader teamLeader={teamLeader} event={event} />
                                                                    }

                                                                }
                                                                ),
                                                            }}
                                                            size="default" />
                                                        <div style={{ marginBottom: 16 }}>

                                                            {
                                                                !admin.isEvaluator ? <Row>
                                                                    <Col offset={20}>
                                                                        <Row>
                                                                            <Col >
                                                                                {
                                                                                    thisRoundSelectedTeamLeaders.length ?
                                                                                        (<Button type="primary"  >
                                                                                            <CSVLink
                                                                                                filename={`E-Cell_${event.name}_round${i}_data.csv`}
                                                                                                data={
                                                                                                    event.participants.filter(participant => participant.round === i).map(participant => {
                                                                                                        j++

                                                                                                        if(participant.registrationDetails){
                                                                                                        return {
                                                                                                            name: participant.name, teamName: participant.teamName, round: participant.round, email: participant.email,
                                                                                                            phone: participant.phone,
                                                                                                            startupName: participant.registrationDetails.startupName,
                                                                                                            designation: participant.registrationDetails.designation,
                                                                                                            yearOfFoundation: participant.registrationDetails.yearOfFoundation,
                                                                                                            capitalRaised: participant.registrationDetails.capitalRaised,
                                                                                                            location: participant.registrationDetails.location,
                                                                                                            source: participant.registrationDetails.source,
                                                                                                            stream: participant.registrationDetails.source,
                                                                                                            website: participant.registrationDetails.website,
                                                                                                            instituteName: participant.instituteName, key: String(j), summitID: participant.summitID

                                                                                                        }}
                                                                                                        else {

                                                                                                            return {
                                                                                                            name: participant.name, teamName: participant.teamName, round: participant.round, email: participant.email,
                                                                                                            phone: participant.phone,
                                                                                                            instituteName: participant.instituteName, key: String(j), summitID: participant.summitID
                                                                                                            }
                                                                                                        }
                                                                                                    })
                                                                                                }
                                                                                                className="btn btn-primary"
                                                                                            >
                                                                                                Download this round's data as CSV
            </CSVLink>
                                                                                        </Button>) : null
                                                                                }

                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                </Row> : null

                                                            }

                                                        </div>
                                                    </div> : <Card> NO DATA AVAILABLE</Card>
                                                }
                                                {/* {
                                                console.log(thisRoundSelectedTeamLeaders, " jhknjnlk;nl,mmmm, , ,m")
                                            } */}
                                            </TabPane>)
                                    }
                                    else return null
                                }) : null :
                                event.roundWiseSelectedParticipants ? event.roundWiseSelectedParticipants.map((thisRoundSelectedParticipants) => {
                                    // console.log(event.teamLeaders, "event.teamLeaders")
                                    i++;
                                    if (i <= event.numOfRounds) {
                                        return (
                                            <TabPane tab={`Round ${i}`} key={i + 1}>

                                                {/* {
                                                thisRoundSelectedParticipants[i - 1] ? console.log(Object.keys(thisRoundSelectedParticipants[i - 1]), thisRoundSelectedParticipants[i - 1], "{Object.keys(thisRoundSelectedParticipants)") : null
                                            }
 */}
                                                {/* {
                                                (thisRoundSelectedParticipants[i - 1] !== undefined) ? console.log(Object.keys(thisRoundSelectedParticipants[i - 1]).filter((key) => key !== "eventID" || key !== "userID").map(key => {
                                                    if (key === "pdfSubmissionUrls") {

                                                        return {
                                                            title: key,
                                                            dataIndex: key,
                                                            key: key,
                                                            render: (text, participant) => (
                                                                <Space size="middle">
                                                                    <Link to={`/esummmit-admin/dashboard/${event._id}/${participant._id}`}>View Submissions</Link>
                                                                </Space>
                                                            )
                                                        }
                                                    }
                                                    else if (key === "textSubmissionUrls") {
                                                        return {
                                                            title: key,
                                                            dataIndex: key,
                                                            key: key,
                                                            render: (text, participant) => (
                                                                <Space size="middle">
                                                                    <Link to={`/esummmit-admin/dashboard/${event._id}/${participant._id}`}>View Submissions</Link>
                                                                </Space>
                                                            )
                                                        }
                                                    }
                                                    else {
                                                        return {
                                                            title: "Name",
                                                            dataIndex: "name",
                                                            key: "name"
                                                        }
                                                    }
                                                }), thisRoundSelectedParticipants[i - 1].name) : null
                                                //  console.log("watch me")
                                            } */}

                                                {/* {

                                                (thisRoundSelectedParticipants !== undefined) ? console.log(thisRoundSelectedParticipants, " thisRoundSelectedParticipants[i-1]") : null
                                            } */}
                                                {/* {

                                                (thisRoundSelectedParticipants !== undefined) ? console.log(thisRoundSelectedParticipants[i - 1] ? thisRoundSelectedParticipants.map(participant => {
                                                    if (participant) {
                                                        j++
                                                        var pdfSubmissionUrls = []
                                                        const concatinater = participant.pdfsubmissionUrls ? participant.pdfsubmissionUrls.map(pdfSubmissionUrl => {
                                                            var pdfSubmissionUrlList = pdfSubmissionUrls.push(<a href={pdfSubmissionUrl}> {pdfSubmissionUrl} </a>, " ")
                                                        }) : ""
                                                        return { ...participant, key: String(j), pdfSubmissionUrlList: participant ? pdfSubmissionUrls : "" }
                                                    }
                                                }) : [], "fdgugjvbmn") : null
                                            }
 */}
                                                { thisRoundSelectedParticipants !== undefined ?
                                                    <div>
                                                        <div style={{ marginBottom: 16 }}>
                                                            <Row>
                                                                <Col>

                                                                </Col>

                                                                <Col offset={20}>
                                                                    <Row>
                                                                        <Col >
                                                                            <Popconfirm
                                                                                title="Are you sure you want to promote these participant(s)? This action can't be undone"
                                                                                onConfirm={handleSubmit}
                                                                                okText="Yes"
                                                                                cancelText="No">
                                                                                <Button type="primary" disabled={!(selectionState.selectedIDs.length > 0)} >Promote</Button>
                                                                            </Popconfirm>
                                                                        </Col>
                                                                        <Col>
                                                                            <span style={{ marginLeft: 8, fontSize: 15 }}>
                                                                                {selectionState.selectedIDs.length ? `Selected ${selectionState.selectedIDs.length} participant(s)` : ''}
                                                                            </span>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </div>

                                                        <Table loading={loading}
                                                            rowSelection={{
                                                                type: "checkbox",
                                                                ...rowSelection,
                                                            }}
                                                            dataSource={
                                                                thisRoundSelectedParticipants ? thisRoundSelectedParticipants.map(participant => {
                                                                    if (participant) {
                                                                        j++
                                                                        return { ...participant, key: String(j) }
                                                                    }
                                                                    else return null

                                                                }) : []
                                                            }
                                                            columns={thisRoundSelectedParticipants[0] ? Object.keys(thisRoundSelectedParticipants[0]).filter((key) => key === "name" || key === "round" || key === "email" || key === "instituteName"
                                                                // || key === "phone" 
                                                                || key === "summitID").map(key => {


                                                                    if (key === "round") {
                                                                        return {
                                                                            title: "Round",
                                                                            dataIndex: "round",
                                                                            key: "round",
                                                                        }
                                                                    }

                                                                    else if (key === "name") {
                                                                        return {


                                                                            title: "Name",
                                                                            dataIndex: "name",
                                                                            key: "name",
                                                                            ...getColumnSearchProps("name", nameRef),
                                                                        }
                                                                    }

                                                                    else if (key === "email") {
                                                                        return {
                                                                            title: "Email",
                                                                            dataIndex: "email",
                                                                            key: "email",
                                                                            ...getColumnSearchProps("email", emailRef),
                                                                        }
                                                                    }
                                                                    // else if (key === "phone") {
                                                                    //     return {
                                                                    //         title: "Phone",
                                                                    //         dataIndex: "phone",
                                                                    //         key: "phone",
                                                                    //         ...getColumnSearchProps("phone", phoneRef),
                                                                    //     }
                                                                    // }
                                                                    else if (key === "instituteName") {
                                                                        return {
                                                                            title: "Institute Name",
                                                                            dataIndex: "instituteName",
                                                                            key: "instituteName",
                                                                            ...getColumnSearchProps("instituteName", instituteNameRef),
                                                                        }

                                                                    }
                                                                    else if (key === "summitID") {
                                                                        return {
                                                                            title: "E-Summit ID",
                                                                            dataIndex: "summitID",
                                                                            key: "summitID",
                                                                            ...getColumnSearchProps("summitID", summitIDRef),
                                                                        }

                                                                    }
                                                                    else return null
                                                                }) : null}
                                                            expandable={{
                                                                expandedRowRender: (participant => {
                                                                    return <Participant participant={participant} event={event} />
                                                                }
                                                                ),
                                                            }}
                                                            size="default" />
                                                        <div style={{ marginBottom: 16 }}>
                                                            <Row>
                                                                <Col offset={20}>
                                                                    <Row>
                                                                        <Col >
                                                                            {
                                                                                thisRoundSelectedParticipants.length ?
                                                                                    (<Button type="primary"  >
                                                                                        <CSVLink
                                                                                            filename={`E-Cell_${event.name}_round${i}_data.csv`}
                                                                                            data={thisRoundSelectedParticipants ? thisRoundSelectedParticipants.map(participant => {
                                                                                                if (participant) {
                                                                                                    j++

                                                                                                    if (participant.registrationDetails){
                                                                                                    return {
                                                                                                        name: participant.name, round: participant.round, email: participant.email,
                                                                                                         phone: participant.phone, 
                                                                                                         startupName: participant.registrationDetails.startupName,
                                                                                                            designation: participant.registrationDetails.designation,
                                                                                                            yearOfFoundation: participant.registrationDetails.yearOfFoundation,
                                                                                                            capitalRaised: participant.registrationDetails.capitalRaised,
                                                                                                            location: participant.registrationDetails.location,
                                                                                                            source: participant.registrationDetails.source,
                                                                                                            stream: participant.registrationDetails.source,
                                                                                                            website: participant.registrationDetails.website,

                                                                                                        instituteName: participant.instituteName, key: String(j), summitID: participant.summitID
                                                                                                    }
                                                                                                }
                                                                                                else {

                                                                                                    return {
                                                                                                    name: participant.name, teamName: participant.teamName, round: participant.round, email: participant.email,
                                                                                                    phone: participant.phone,
                                                                                                    instituteName: participant.instituteName, key: String(j), summitID: participant.summitID
                                                                                                    }
                                                                                                }
                                                                                                }
                                                                                                else return null
                                                                                            }) : []}
                                                                                            className="btn btn-primary"
                                                                                        >
                                                                                            Download this round's data as CSV
            </CSVLink>
                                                                                    </Button>) : null
                                                                            }

                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div> : <Card> NO DATA AVAILABLE</Card>
                                                }
                                                {/* {
                                                console.log(thisRoundSelectedParticipants, " jhknjnlk;nl,mmmm, , ,m")
                                            } */}
                                            </TabPane>)
                                    }
                                    else return null

                                }) : null
                        }
                    </Tabs>
                </Spin>
            </Route>


        </Fragment>

    );
};

export default Event;
