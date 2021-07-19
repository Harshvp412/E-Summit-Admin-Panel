import adminActionTypes from "./adminActionTypes";
import { initialLoginState, initialAdminState, } from "./initialAdminState";
import { saveAdminState } from "../loadPersistedStateAdmin";


export const loginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case adminActionTypes.LOGIN_REQUEST:
            return {
                loggingIn: true,
                error: {},
            };
        case adminActionTypes.LOGIN_SUCCESS:
            return {
                loggingIn: false,
                error: {},
            };
        case adminActionTypes.LOGIN_FAILURE:
            return {
                loggingIn: false,
                error: { ...action.payload },
            };
        default:
            return state;
    }
};

export const adminDataReducer = (state = initialAdminState, action) => {
    switch (action.type) {
        case adminActionTypes.LOGIN_SUCCESS:
            saveAdminState(action.payload);
            return {
                ...action.payload,
            };

        case adminActionTypes.GET_EVENTS_SUCCESS:
            const updatedAdmin = { ...state, events: action.payload, loading: false };
            saveAdminState(updatedAdmin);
            return updatedAdmin;

        case adminActionTypes.GET_EVENTS_REQUEST:
            saveAdminState({ ...state, loading: true });
            return { ...state, loading: true };

        case adminActionTypes.GET_PARTICIPANTS_SUCCESS:
            let roundWiseSelectedParticipants = [[], [], [], [], [], []]
            let roundWiseSelectedTeamLeaders = [[], [], [], [], [], []]

            const participants = action.payload.participants
            participants.map((participant) => {
                roundWiseSelectedParticipants[participant.round - 1].push(participant)
                return null
            })
            // console.log(roundWiseSelectedParticipants, "selectedParticipants")

            // console.log(state, "state.e")
            // console.log(action.payload, "action.payload")

            const teamLeaders = participants.filter((participant) => participant.isLeader === true)
                .map((leader) => {
                    // console.log(leader, "leader")
                    const teamMates = participants.filter((participant) => participant.leaderID === leader.leaderID  )
                    // console.log(teamMates, "teamMates")
                    return { ...leader, teamMates: teamMates }
                })

                teamLeaders.map((teamLeader) => {
                    roundWiseSelectedTeamLeaders[teamLeader.round - 1].push(teamLeader)
                    return null
                })
            const updatedEvent = {
                ...state.events.filter((event) => {
                    if (event._id === action.payload.eventID) {
                        // console.log(event._id === action.payload.eventID, event._id, action.payload.eventID, "check")
                        return event;
                    }
                    else  return null

                })[0], participants: action.payload.participants, roundWiseSelectedParticipants, teamLeaders, roundWiseSelectedTeamLeaders
            }
            // console.log(updatedEvent, "updatedEvent")
            const updatedAdmin2 = {
                ...state, events: [...(state.events.filter((event) => {
                    if (event._id !== action.payload.eventID) {
                        return event
                    }
                    else  return null
                })), updatedEvent], loading: false
            };
            // console.log(updatedAdmin2, "updatedAdmin2")
            saveAdminState(updatedAdmin2);
            return updatedAdmin2;

        case adminActionTypes.GET_PARTICIPANTS_REQUEST:
            saveAdminState({ ...state, loading: true });
            return { ...state, loading: true };

        case adminActionTypes.LOGOUT_SUCCESS:
            return initialAdminState;

        case adminActionTypes.PROMOTE_PARTICIPANTS_REQUEST: {
            saveAdminState({ ...state, loading: true });
            return { ...state, loading: true };
        }

        case adminActionTypes.PROMOTE_PARTICIPANTS_SUCCESS: {
            saveAdminState({ ...state, loading: false });
            return { ...state, loading: false };
        }

        case adminActionTypes.REGISTER_THROUGH_CSV_REQUEST: {
            saveAdminState({ ...state, loading: true });
            return { ...state, loading: true };
        }

        case adminActionTypes.REGISTER_THROUGH_CSV_SUCCESS: {
            saveAdminState({ ...state, loading: false });
            return { ...state, loading: false };
        }

        case adminActionTypes.TOGGLE_EVENT_STATUS_REQUEST:  {
            saveAdminState({ ...state, loading: true });
            return { ...state, loading: true };
        }

        case adminActionTypes.TOGGLE_EVENT_STATUS_SUCCESS: {
            // console.log(action.payload, "action.payload")
            const updatedEvent = {
                ...state.events.filter((event) => {
                    if (event._id === action.payload.eventID) {
                        // console.log(event._id === action.payload.eventID, event._id, action.payload.eventID, "check")
                        return event;
                    }
                    else return null

                })[0], isLive: action.payload.isLive
            }

            const updatedAdmin = {
                ...state, events: [...(state.events.filter((event) => {
                    if (event._id !== action.payload.eventID) {
                        return event
                    }
                    else  return null
                })), updatedEvent], loading: false
            };
            saveAdminState(updatedAdmin);
            return updatedAdmin;
        }
            
        
       

        case adminActionTypes.GET_EVENT_STATUS_REQUEST: {
            saveAdminState({ ...state, loading: true });
            return { ...state, loading: true };
        }

        case adminActionTypes.GET_EVENT_STATUS_SUCCESS: {
            saveAdminState({ ...state, loading: false });
            return { ...state, loading: true };
        }


        // case adminActionTypes.SELECT_STUDENT_SUCCESS: {
        //     const updatedStudent = {
        //         ...state.projects
        //             .filter((project) => project.projectID === action.payload.projectCode)[0]
        //             .appliedStudents.filter((student) => student.studentID === action.payload.studentCode)[0],
        //         status: "selected",
        //     };
        //     const updatedStudents = [
        //         ...state.projects
        //             .filter((project) => project.projectID === action.payload.projectCode)[0]
        //             .appliedStudents.filter((student) => student.studentID !== action.payload.studentCode),
        //         updatedStudent,
        //     ];
        //     const updatedProject = {
        //         ...state.projects.filter((project) => project.projectID === action.payload.projectCode)[0],
        //         appliedStudents: updatedStudents,
        //     };
        //     const updatedProjects = [
        //         ...state.projects.filter((project) => project.projectID !== action.payload.projectCode),
        //         updatedProject,
        //     ];
        //     const updatedState = { ...state, projects: updatedProjects };

        //     saveAdminState(updatedState);
        //     return updatedState;
        // }

        // case adminActionTypes.SHORTLIST_STUDENT_SUCCESS: {
        //     const updatedStudent = {
        //         ...state.projects
        //             .filter((project) => project.projectID === action.payload.projectCode)[0]
        //             .appliedStudents.filter((student) => student.studentID === action.payload.studentCode)[0],
        //         status: "shortlisted",
        //     };
        //     const updatedStudents = [
        //         ...state.projects
        //             .filter((project) => project.projectID === action.payload.projectCode)[0]
        //             .appliedStudents.filter((student) => student.studentID !== action.payload.studentCode),
        //         updatedStudent,
        //     ];
        //     const updatedProject = {
        //         ...state.projects.filter((project) => project.projectID === action.payload.projectCode)[0],
        //         appliedStudents: updatedStudents,
        //     };
        //     const updatedProjects = [
        //         ...state.projects.filter((project) => project.projectID !== action.payload.projectCode),
        //         updatedProject,
        //     ];
        //     const updatedState = { ...state, projects: updatedProjects };

        //     saveAdminState(updatedState);
        //     return updatedState;
        // }
        // case adminActionTypes.GET_STUDENTS_SUCCESS:
        //     const updatedAdmin = { ...state, projects: action.payload, loading: false };
        //     saveAdminState(updatedAdmin);
        //     return updatedAdmin;

        // case adminActionTypes.GET_STUDENTS_REQUEST:
        //     saveAdminState({ ...state, loading: true });
        //     return { ...state, loading: true };

        case adminActionTypes.GET_AVATAR_SUCCESS:
            // console.log(state)
            const updatedAdminWithAvatar = { ...state, avatarURL: action.payload, loading: false, };
            saveAdminState(updatedAdminWithAvatar);
            return updatedAdminWithAvatar;



        default:
            return state;
    }
};

export const updateInfoReducer = (state = initialAdminState, action) => {
    switch (action.type) {

        case adminActionTypes.UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                isUpdating: true,
            };


        case adminActionTypes.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                isUpdating: false,
            };


        case adminActionTypes.UPDATE_PASSWORD_FAILURE:
            return {
                isUpdating: false,
                error: { ...action.payload },
            };

        default:
            return state;
    }
};

// export const avatarReducer = (state = initialAdminState, action) => {
//     console.log("hello", action.payload)
//     switch (action.type) {
//         case adminActionTypes.AVATAR_REQUEST:
//             return {
//                 ...state,
//                 isUploading: true,
//             };
//         case adminActionTypes.AVATAR_SUCCESS:

//             return {
//                 ...state,
//                 num: state.num + 1,

//                 isUploading: false,
//             };
//         case adminActionTypes.AVATAR_FAILURE:
//             return {
//                 isUploading: false,
//                 error: { ...action.payload },
//             };
//         default:
//             return state;
//     }
// };

