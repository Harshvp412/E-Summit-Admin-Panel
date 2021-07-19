import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { loadPersistedAdminState } from "./loadPersistedStateAdmin";
import rootReducerAdmin from "./rootReducerAdmin";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedStateAdmin = loadPersistedAdminState();

const store = createStore(rootReducerAdmin, persistedStateAdmin, composeEnhancers(applyMiddleware(thunk)));

export default store;
