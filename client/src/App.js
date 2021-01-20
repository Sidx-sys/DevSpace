import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Axios from "axios";

import Navbar from "./Components/Navbar";
import LandingPage from "./Components/LandingPage";
import Register from "./Components/Registration/Register";
import AboutPage from "./Components/AboutPage";
import Profile from "./Components/Profile/Profile";

import UserContext from "./Context/UserContext";
import CreateJob from "./Components/CreateJob";
import ApplicantList from "./Components/JobListing/ApplicantList";

const App = () => {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
        isLoading: true,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("auth-token");

            if (token === null) {
                localStorage.setItem("auth-token", "");
                token = "";
            }

            const tokenRes = await Axios.post(
                "http://localhost:5000/api/login/tokenIsValid",
                null,
                {
                    headers: { "x-auth-token": token },
                }
            );

            if (tokenRes.data) {
                const userRes = await Axios.get(
                    "http://localhost:5000/api/login",
                    {
                        headers: { "x-auth-token": token },
                    }
                );

                setUserData({
                    token,
                    user: userRes.data,
                    isLoading: false,
                });
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <Navbar />
                    <div className="container">
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/about" component={AboutPage} />
                        <Route path="/register" component={Register} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/createJob" component={CreateJob} />
                        <Route path="/app/jobList" component={ApplicantList} />
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
};

export default App;
