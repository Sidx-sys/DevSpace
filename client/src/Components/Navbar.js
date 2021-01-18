import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../Context/UserContext";

const Navbar = () => {
    const { userData, setUserData } = useContext(UserContext);

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <div>
            <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{ backgroundColor: "#e3f2fd" }}
            >
                <NavLink className="navbar-brand" to="/">
                    <i className="fas fa-laptop-code"></i>&nbsp; DevSpace
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    {!userData.user ? (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/">
                                    Home{" "}
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    ) : userData.user.type === "applicant" ? (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/profile">
                                    My Profile{" "}
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Job Listings
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    My Applications
                                </NavLink>
                            </li>
                            <li className="nav-item" onClick={logout}>
                                <NavLink className="nav-link" to="/">
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    ) : (
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink className="nav-link" to="/profile">
                                    My Profile{" "}
                                    <span className="sr-only">(current)</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/createJob">
                                    Create Job
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">
                                    Recruits
                                </NavLink>
                            </li>
                            <li className="nav-item" onClick={logout}>
                                <NavLink className="nav-link" to="/">
                                    Logout
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
