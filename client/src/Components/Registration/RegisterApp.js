import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import UserContext from "../../Context/UserContext";

const RegisterApp = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        try {
            e.preventDefault();

            const newUser = { name, email, password, password2 };
            const registerApp = await Axios.post(
                "http://localhost:5000/api/register/app",
                newUser
            );
            setError(undefined);

            setUserData({
                token: registerApp.data.token,
                user: registerApp.data.applicant,
            });
            localStorage.setItem("auth-token", registerApp.data.token);

            history.push("/profile");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <>
            {error ? (
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <> </>
            )}
            <h3 className="text-center mt-5">Sign up as a Applicant</h3>
            <small id="header" className="form-text text-muted text-center">
                *All the fields have to be filled
            </small>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="nameApp">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameApp"
                        placeholder="Your full name here"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="EmailApp">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailApp"
                        placeholder="user@example.com"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small id="email" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordApp">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordApp"
                        placeholder="Password has to be atleast 5 characters"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2App">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password2App"
                        placeholder="Confirm password"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </>
    );
};

export default RegisterApp;
