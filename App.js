import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import { PrivateRoute, PublicRoute } from "./common/SpecialRoutes";

import "./App.css";

import AdminDashboard from "./views/AdminDashboard/AdminDashboard";

import LoginAdmin from "./views/Login/LoginAdmin";

import NotFound from "./views/NotFound";
import ECellFooter from "./common/ECellFooter";
import { Provider } from "react-redux";

import storeAdmin from "./redux/storeAdmin";

const { Footer } = Layout;

function App() {
    const urlArr = ["/", "/admin-p/admin-dashboard", "/admin-p/admin-login"];

    return (
        <Layout className="App">
            <Router>
                <Layout>
                   
                    <Provider store={storeAdmin}>
                        <Switch>
                            <PublicRoute exact path="/admin-p/admin-login" component={LoginAdmin} />
                            <PrivateRoute
                                path="/admin-p/admin-dashboard"
                                component={AdminDashboard}
                                redirectTo="/admin-p/admin-login"
                            />
                        </Switch>
                    </Provider>

                    {/* This was needed because a top level Switch didn't work. */}
                    {!urlArr.find((url) => window.location.pathname.startsWith(url)) && (
                        <Route path={window.location.pathname} component={NotFound} />
                    )}
                </Layout>
            </Router>
            <Footer
                style={{
                    backgroundColor: "white",
                    boxShadow: "0px -1px 20px rgba(85, 85, 85, 0.2)",
                    padding: "20px",
                    marginTop: "1rem",
                    zIndex: 1002,
                }}>
                <ECellFooter
                    developers={[
                        
                        { name: "Ashish", whatsappNum: "+91 9983321407", profileURL: "https://www.linkedin.com/in/ashish-kumar-shroti/" },
                    ]}
                />
            </Footer>
        </Layout>
    );
}

export default App;
