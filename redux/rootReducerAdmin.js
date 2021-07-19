import { combineReducers } from "redux";

import { loginReducer, adminDataReducer, updateInfoReducer } from "./admin/adminReducers";
// import { avatarReducer } from "./admin/adminReducers";

const admin = combineReducers({
    data: adminDataReducer,
    updateInfoState: updateInfoReducer,
   
});

const rootReducerAdmin = combineReducers({
    loginData: loginReducer,
    admin,

});

export default rootReducerAdmin;
