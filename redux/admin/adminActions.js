import adminActionTypes from "./adminActionTypes";
import Axios from "axios";
import getCookieToken from "../../utils/getCookieToken";
import store from "../storeAdmin";


const axios = Axios.create({
    baseURL: "https://esummitiitm.org/api/esummit-admin",
    withCredentials: true,
});

// const checkStatus = (student, selectedStudents, shortlistedStudents) => {
//     if (selectedStudents.filter((s) => s._id === student._id)[0]) return "selected";
//     else if (shortlistedStudents.filter((s) => s._id === student._id)[0]) return "shortlisted";
//     else return "none";
// };

const adminLoginRequest = () => ({
    type: adminActionTypes.LOGIN_REQUEST,
});
const adminLoginSuccess = (data) => ({
    type: adminActionTypes.LOGIN_SUCCESS,
    payload: data,
});
const adminLoginFailure = (err) => ({
    type: adminActionTypes.LOGIN_FAILURE,
    payload: err,
});

export const loginAdmin = (dataToPost, handleSuccess, handleError) => {
    return async (dispatch) => {
        dispatch(adminLoginRequest());
        console.log("dfghjk")
        try {
            let res = await axios.post(`/login`, dataToPost);
            // let res2 = await axios.get(`/dashboard/events`);

            if (getCookieToken()) {
                
                const admin = res.data.data
                dispatch(adminLoginSuccess(admin));
                // console.log(admin, "sadhahjkdkcbkjnc")
                handleSuccess();
            } else throw new Error("an error occured");
        } catch (error) {
            console.log(error);
            let errorMsg = error.response ? error.response.data.msg : error.message;
            dispatch(adminLoginFailure(error.response ? error.response.data : error));
            handleError(errorMsg);
        }
    };
};

const adminLogoutRequest = () => ({
    type: adminActionTypes.LOGOUT_REQUEST,
});

const adminLogoutSuccess = () => ({
    type: adminActionTypes.LOGOUT_SUCCESS,
});
const adminLogoutFailure = (err) => ({
    type: adminActionTypes.LOGOUT_FAILURE,
    payload: err,
});

export const logoutAdmin = (handleSuccess = (msg) => console.log(msg), handleError = (msg) => console.log(msg)) => {
    return async (dispatch) => {
        dispatch(adminLogoutRequest());
        try {
            await axios.get(`/logout`);
            dispatch(adminLogoutSuccess());
            handleSuccess();
        } catch (err) {
            console.log(err);
            let error = err.response ? err.response.data : err;
            let errorMsg = error.response ? error.response.msg : error.message;
            dispatch(adminLogoutFailure(error));
            handleError(errorMsg);
        }
    };
};

const getEventsRequest = () => ({
    type: adminActionTypes.GET_EVENTS_REQUEST,
});
const getEventsSuccess = (data) => ({
    type: adminActionTypes.GET_EVENTS_SUCCESS,
    payload: data,
});
const getEventsFailure = (err) => ({
    type: adminActionTypes.GET_EVENTS_FAILURE,
    payload: err,
});

export const getEvents = (
    handleSuccess = (msg) => console.log(msg),
    handleError = (msg) => console.log(msg)
) => {
    return async (dispatch) => {
        dispatch(getEventsRequest());
        try {
            
            let res1 = await axios.get(`/dashboard/events`);
            // let res2 = await axios.get(`/team-up-portal/admin/projects/applied-students?for=${projectID}`);
            // let res3 = await axios.get(`/team-up-portal/admin/projects/selected-students?for=${projectID}`);
            // let res4 = await axios.get(`/team-up-portal/admin/projects/shortlisted-students?for=${projectID}`);

            // const appliedStudents = res2.data.data;
            // const selectedStudents = res3.data.data;
            // const shortlistedStudents = res4.data.data;

            // console.log("yayy! the events")

            if (getCookieToken()) {
                // console.log("yayy! the events", res1)
                // const updatedAppliedStudents = appliedStudents.map((student) => {
                //     return {
                //         ...student,
                //         studentID: student.name.toLowerCase().split(" ").join("-"),
                //         status: checkStatus(student, selectedStudents, shortlistedStudents),
                //     };
                // });
                const events = res1.data.data
                dispatch(getEventsSuccess(events));
                handleSuccess();
            } else throw new Error("an error occured");
        } catch (error) {
            console.log(error);
            let errorMsg = error.response ? error.response.data : error.message;
            dispatch(getEventsFailure(error.response ? error.response : error));
            handleError(errorMsg);
        }
    };
};

const getParticipantsRequest = () => ({
    type: adminActionTypes.GET_PARTICIPANTS_REQUEST,
});
const getParticipantsSuccess = (data) => ({
    type: adminActionTypes.GET_PARTICIPANTS_SUCCESS,
    payload: data,
});
const getParticipantsFailure = (err) => ({
    type: adminActionTypes.GET_PARTICIPANTS_FAILURE,
    payload: err,
});

export const getParticipants = (
    eventID,
    handleSuccess = (msg) => console.log(msg),
    handleError = (msg) => console.log(msg)
) => {
    return async (dispatch) => {
        dispatch(getParticipantsRequest());
        try {
            let res1 = await axios.post(`/dashboard/event/participants`, {eventID: eventID});
            // let res2 = await axios.get(`/team-up-portal/admin/projects/applied-students?for=${projectID}`);
            // let res3 = await axios.get(`/team-up-portal/admin/projects/selected-students?for=${projectID}`);
            // let res4 = await axios.get(`/team-up-portal/admin/projects/shortlisted-students?for=${projectID}`);

            // const appliedStudents = res2.data.data;
            // const selectedStudents = res3.data.data;
            // const shortlistedStudents = res4.data.data;

            // console.log("yayy! the participants")

            if (getCookieToken()) {
                // console.log("yayy! the participants", res1)
                // const updatedAppliedStudents = appliedStudents.map((student) => {
                //     return {
                //         ...student,
                //         studentID: student.name.toLowerCase().split(" ").join("-"),
                //         status: checkStatus(student, selectedStudents, shortlistedStudents),
                //     };
                // });
                const participants = res1.data.data
                console.log(participants,"participants")
                dispatch(getParticipantsSuccess({eventID, participants}));
                handleSuccess();
            } else throw new Error("an error occured");
        } catch (error) {
            console.log(error);
            let errorMsg = error.response ? error.response.data : error.message;
            dispatch(getParticipantsFailure(error.response ? error.response : error));
            handleError(errorMsg);
        }
    };
};

const promoteParticipantsRequest = () => ({
    type: adminActionTypes.PROMOTE_PARTICIPANTS_REQUEST,
});

const promoteParticipantsSuccess = (data) => ({
    type: adminActionTypes.PROMOTE_PARTICIPANTS_SUCCESS,
    payload: data,
});

const promoteParticipantsFailure = (err) => ({
    type: adminActionTypes.PROMOTE_PARTICIPANTS_FAILURE,
    payload: err,
});

export const promoteParticipants = (
    promotedIDs,
    maxRound,
    eventID,
    handleSuccess = (msg) => console.log(msg),
    handleError = (msg) => console.log(msg)
) => {
    return async (dispatch) => {
        dispatch(promoteParticipantsRequest());

        ;
        try {
            await axios.post("/dashboard/event/promote-participants", { promotedIDs, maxRound, eventID});
            await dispatch(promoteParticipantsSuccess());
            // await axios.post("team-up-portal/mail/selection", {
            //     projectID,
            //     studentMail,
            // })
            handleSuccess();
            dispatch(promoteParticipantsSuccess());
        } catch (err) {
            let error = err.response ? err.response.data : err;
            let errorMsg = error.data ? error.data.msg : error.message;
            dispatch(promoteParticipantsFailure(error));
            handleError(errorMsg);
        }
    };
};


const registerThroughCSVRequest = () => ({
    type: adminActionTypes.REGISTER_THROUGH_CSV_REQUEST,
});

const registerThroughCSVSuccess  = (data) => ({
    type: adminActionTypes.REGISTER_THROUGH_CSV_SUCCESS ,
    payload: data,
});

const registerThroughCSVFailure  = (err) => ({
    type: adminActionTypes.REGISTER_THROUGH_CSV_FAILURE,
    payload: err,
});


export const registerThroughCSV = (
    participants,
    
    handleSuccess = (msg) => console.log(msg),
    handleError = (msg) => console.log(msg)
) => {
    return async (dispatch) => {
        dispatch(registerThroughCSVRequest());

        
        try {
            const res = await axios.post("/dashboard/event/register-through-csv", {participants});
            
            await dispatch(registerThroughCSVSuccess());

            // await axios.post("team-up-portal/mail/selection", {
            //     projectID,
            //     studentMail,
            // })
            handleSuccess(res.data.data.msg);
        } catch (err) {
            let error = err.response ? err.response.data : err;
            let errorMsg = error.data ? error.data.msg : error.msg;
            dispatch(registerThroughCSVFailure(error));
            // console.log(err.response.data.msg, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrryhgjhhhhhhhhhhhhhhhhhhhhh")
            console.log(err, "errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrryhgjhhhhhhhhhhhhhhhhhhhhh")
            handleError(errorMsg);
        }
    };
};


const toggleEventStatusRequest = () => ({
    type: adminActionTypes.TOGGLE_EVENT_STATUS_REQUEST,
});

const toggleEventStatusSuccess  = (data) => ({
    type: adminActionTypes.TOGGLE_EVENT_STATUS_SUCCESS ,
    payload: data,
});

const toggleEventStatusFailure  = (err) => ({
    type: adminActionTypes.TOGGLE_EVENT_STATUS_FAILURE,
    payload: err,
});


export const toggleEventStatus = (
   
    eventID,
    handleSuccess = (msg) => console.log(msg),
    handleError = (msg) => console.log(msg)
) => {
    return async (dispatch) => {
        dispatch(toggleEventStatusRequest());

        
        try {
           const res = await axios.post("/dashboard/event/toggle-event-status", {eventID});
           console.log(res, "res")
            await dispatch(toggleEventStatusSuccess({isLive: res.data.data.isLive, eventID}));

            // await axios.post("team-up-portal/mail/selection", {
            //     projectID,
            //     studentMail,
            // })
            handleSuccess(res.data.data.msg);
        } catch (err) {
            let error = err.response ? err.response.data : err;
            let errorMsg = error.data ? error.data.msg : error.message;
            dispatch(toggleEventStatusFailure(error));
            handleError(errorMsg);
        }
    };
};


const getEventStatusRequest = () => ({
    type: adminActionTypes.GET_EVENT_STATUS_REQUEST,
});

const getEventStatusSuccess  = (data) => ({
    type: adminActionTypes.GET_EVENT_STATUS_SUCCESS ,
    payload: data,
});

const getEventStatusFailure  = (err) => ({
    type: adminActionTypes.GET_EVENT_STATUS_FAILURE,
    payload: err,
});

export const getEventStatus = (
   
    eventID,
    handleSuccess = (msg) => console.log(msg),
    handleError = (msg) => console.log(msg)
) => {
    return async (dispatch) => {
        dispatch(getEventStatusRequest());

        
        try {
            await axios.post("/dashboard/event/get-event-status", {eventID});
            await dispatch(getEventStatusSuccess());

            // await axios.post("team-up-portal/mail/selection", {
            //     projectID,
            //     studentMail,
            // })
            handleSuccess();
        } catch (err) {
            let error = err.response ? err.response.data : err;
            let errorMsg = error.data ? error.data.msg : error.message;
            dispatch(getEventStatusFailure(error));
            handleError(errorMsg);
        }
    };
};

// const shortlistStudentRequest = () => ({
//     type: adminActionTypes.SHORTLIST_STUDENT_REQUEST,
// });

// const shortlistStudentSuccess = (data) => ({
//     type: adminActionTypes.SHORTLIST_STUDENT_SUCCESS,
//     payload: data,
// });

// const shortlistStudentFailure = (err) => ({
//     type: adminActionTypes.SHORTLIST_STUDENT_FAILURE,
//     payload: err,
// });
// export const selectStudent = (
//     student,
//     project,
//     handleSuccess = (msg) => console.log(msg),
//     handleError = (msg) => console.log(msg)
// ) => {
//     return async (dispatch) => {
//         dispatch(selectStudentRequest());

//         const studentCode = student.studentID;
//         const projectCode = project.projectID;
//         const studentID = student._id;
//         const studentMail = student.email ;
//         const projectID = project._id;
//         try {
//             await axios.put("team-up-portal/admin/update-project-info/select-student", {
//                 projectID,
//                 studentID,
//             });
//             await dispatch(selectStudentSuccess({ studentCode, projectCode }));
//             await axios.post("team-up-portal/mail/selection", {
//                 projectID,
//                 studentMail,
//             })
//             handleSuccess();
//         } catch (err) {
//             let error = err.response ? err.response.data : err;
//             let errorMsg = error.data ? error.data.msg : error.message;
//             dispatch(selectStudentFailure(error));
//             handleError(errorMsg);
//         }
//     };
// };

// export const shortlistStudent = (
//     student,
//     project,
//     handleSuccess = (msg) => console.log(msg),
//     handleError = (msg) => console.log(msg)
// ) => {
//     return async (dispatch) => {
//         dispatch(shortlistStudentRequest());

//         const studentCode = student.studentID;
//         const projectCode = project.projectID;
//         const studentID = student._id;
//         const projectID = project._id;

//         try {
//             await axios.put("team-up-portal/admin/update-project-info/shortlist-student", {
//                 projectID,
//                 studentID,
//             });
//             await dispatch(shortlistStudentSuccess({ studentCode, projectCode }));
//             handleSuccess();
//         } catch (err) {
//             let error = err.response ? err.response.data : err;
//             let errorMsg = error.data ? error.data.msg : error.message;
//             dispatch(shortlistStudentFailure(error));
//             handleError(errorMsg);
//         }
//     };
// };



// const getStudentsRequest = () => ({
//     type: adminActionTypes.GET_STUDENTS_REQUEST,
// });
// const getStudentsSuccess = (data) => ({
//     type: adminActionTypes.GET_STUDENTS_SUCCESS,
//     payload: data,
// });
// const getStudentsFailure = (err) => ({
//     type: adminActionTypes.GET_STUDENTS_FAILURE,
//     payload: err,
// });

// export const getStudents = (
//     projectID,
//     handleSuccess = (msg) => console.log(msg),
//     handleError = (msg) => console.log(msg)
// ) => {
//     return async (dispatch) => {
//         dispatch(getStudentsRequest());
//         try {
//             let res1 = await axios.get(`/team-up-portal/admin/projects`);
//             let res2 = await axios.get(`/team-up-portal/admin/projects/applied-students?for=${projectID}`);
//             let res3 = await axios.get(`/team-up-portal/admin/projects/selected-students?for=${projectID}`);
//             let res4 = await axios.get(`/team-up-portal/admin/projects/shortlisted-students?for=${projectID}`);

//             const appliedStudents = res2.data.data;
//             const selectedStudents = res3.data.data;
//             const shortlistedStudents = res4.data.data;

//             if (getCookieToken()) {
//                 const updatedAppliedStudents = appliedStudents.map((student) => {
//                     return {
//                         ...student,
//                         studentID: student.name.toLowerCase().split(" ").join("-"),
//                         status: checkStatus(student, selectedStudents, shortlistedStudents),
//                     };
//                 });
//                 const projects = res1.data.data.map((project) => {
//                     return {
//                         ...project,
//                         projectID: project.title.toLowerCase().split(" ").join("-"),
//                         appliedStudents: updatedAppliedStudents,
//                         name: project.title,
//                     };
//                 });
//                 dispatch(getStudentsSuccess(projects));
//                 handleSuccess();
//             } else throw new Error("an error occured");
//         } catch (error) {
//             console.log(error);
//             let errorMsg = error.response ? error.response.data : error.message;
//             dispatch(getStudentsFailure(error.response ? error.response : error));
//             handleError(errorMsg);
//         }
//     };
// };

const updatePasswordRequest = () => ({
    type: adminActionTypes.UPDATE_PASSWORD_REQUEST,
});

const updatePasswordSuccess = () => ({
    type: adminActionTypes.UPDATE_PASSWORD_SUCCESS,
});

const updatePasswordFailure = (err) => ({
    type: adminActionTypes.UPDATE_PASSWORD_FAILURE,
    payload: err,
});

export const updateAdminPassword = (passwords, handleError, handleSuccess) => {
    return async (dispatch) => {
        dispatch(updatePasswordRequest());

        try {
            await axios.put("/team-up-portal/admin/update-admin-info/password", { passwords });

            dispatch(updatePasswordSuccess());
            handleSuccess();
        } catch (err) {
            console.log(err);
            let error = err.response ? err.response.data : err;
            dispatch(updatePasswordFailure(error));
            handleError(error.msg);
            console.log(error);
        }
    };
};



const uploadRequest = (type) => ({
    type: adminActionTypes[`${type.toUpperCase()}_REQUEST`],
});

const uploadSuccess = (type, data) => ({
    type: adminActionTypes[`${type.toUpperCase()}_SUCCESS`],
    payload: data,
});

const uploadFailure = (type, err) => ({
    type: adminActionTypes[`${type.toUpperCase()}_FAILURE`],
    payload: err,
});
/**
 *
 * @param {string} type
 * @param {File} file
 */
export const upload = (type, file) => {
    return async (dispatch) => {
        dispatch(uploadRequest(type));
        try {
            const res = await axios.get(`/team-up-portal/s3-signed-policy/team-up-admin-${type}s`);

            let S3SignedPolicyObject = { ...res.data.data };
            let bucketWriteUrl = `https://${S3SignedPolicyObject.bucket}.s3.ap-south-1.amazonaws.com/`;

            const { _id: adminID, name } = store.getState().admin.data;
            const filename = `${name.replace(/ /g, "")}-${type.toUpperCase()}.${file.name.split(".").pop()}`;

            async function makeFormdataAndUpload() {
                var fd = new FormData();

                fd.append("x-amz-algorithm", "AWS4-HMAC-SHA256");
                fd.append("acl", S3SignedPolicyObject.bucketAcl);
                fd.append("policy", S3SignedPolicyObject.encodedPolicy);
                fd.append("x-amz-credential", S3SignedPolicyObject.amzCred);
                fd.append("x-amz-date", S3SignedPolicyObject.expirationStrClean);
                fd.append("X-Amz-Signature", S3SignedPolicyObject.sign);

                fd.append("key", filename);
                fd.append("Content-Type", file.type);

                fd.append("file", file);

                await axios.post(bucketWriteUrl, fd, { withCredentials: false });
            }
            await makeFormdataAndUpload();

            let URL = `${bucketWriteUrl}${filename}`;

            await axios.put(`/team-up-portal/admin/update-admin-info/${type}`, { adminID, [`${type}URL`]: URL });

            dispatch(uploadSuccess(type, URL));

            // dispatch(avatarSuccess(type,URL));
        } catch (err) {
            console.log(err);
            let error = err.response ? err.response.data : err;
            dispatch(uploadFailure(type, error));
        }
    };
};

// const getAvatarRequest = () => ({
//     type: adminActionTypes.GET_AVATAR_REQUEST,
// });
// const getAvatarSuccess = (data) => ({
//     type: adminActionTypes.GET_AVATAR_SUCCESS,
//     payload: data,
// });
// const getAvatarFailure = (err) => ({
//     type: adminActionTypes.GET_AVATAR_FAILURE,
//     payload: err,
// });

// export const getAvatar = (

//     handleSuccess = (msg) => console.log(msg),
//     handleError = (msg) => console.log(msg)
// ) => {
//     return async (dispatch) => {
//         dispatch(getAvatarRequest());
//         try {
//             let res = await axios.get(`/team-up-portal/admin/avatar`);


//             const adminAvatar = res.data.data;

//             if (getCookieToken()) {
//                 const updatedAvatar = adminAvatar

//                 dispatch(getAvatarSuccess(updatedAvatar));
//                 handleSuccess();
//             } else throw new Error("an error occured");
//         } catch (error) {
//             console.log(error);
//             let errorMsg = error.response ? error.response.data : error.message;
//             dispatch(getAvatarFailure(error.response ? error.response : error));
//             handleError(errorMsg);
//         }
//     };
// };

