import "../Components/CSS/LandingPage.css";
import Login from "./Login";
import UserContext from "../Context/UserContext";
import { useContext } from "react";

const LandingPage = () => {
    const { userData } = useContext(UserContext);

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-8 border-right" id="border-5">
                    <h1 className="display-2">
                        In Search for the Perfect Workplace?
                    </h1>
                    <h1 className="display-5">
                        Join <strong>Devspace</strong> to find the workplace
                        perfect for you!
                    </h1>
                </div>
                {userData.user ? (
                    <div className="col-4 ">
                        <h3>
                            You have Access,
                            <small className="text-muted">
                                check the Navbar to navigate!
                            </small>
                        </h3>
                    </div>
                ) : (
                    <div className="col-4">
                        <Login />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
