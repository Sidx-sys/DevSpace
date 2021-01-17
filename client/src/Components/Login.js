import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../Context/UserContext";

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        try {
            e.preventDefault();

            const user = { email, password };
            const loginRes = await Axios.post(
                "http://localhost:5000/api/login/",
                user
            );
            setError(undefined);

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);

            history.push("/profile");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div>
            {error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <> </>
            )}
            <h2 className="display-5 text-center">Login</h2>
            <form className="px-4 py-3" onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="exampleDropdownFormEmail1">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleDropdownFormEmail1"
                        placeholder="user@example.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleDropdownFormPassword1">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleDropdownFormPassword1"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign in
                </button>
            </form>
            <div className="dropdown-divider"></div>
            <span className="text-center px-4 py-3 font-weight-bold">
                New around here?{" "}
            </span>
            <button className="btn btn-light">
                <Link to="/register">Sign Up</Link>
            </button>
        </div>
    );
};

export default Login;
