import { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";

const RegisterRec = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const [contact, setContact] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        try {
            e.preventDefault();

            const newUser = { name, email, password, password2, contact };
            const registerRes = await Axios.post(
                "http://localhost:5000/api/register/rec",
                newUser
            );
            setError(undefined);

            setUserData({
                token: registerRes.data.token,
                user: registerRes.data.Recruiter,
                isLoading: false,
            });
            localStorage.setItem("auth-token", registerRes.data.token);

            history.push("/profile");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <>
            {error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <> </>
            )}
            <h3 className="text-center mt-5">Sign up as a Recruiter</h3>
            <small id="header" className="form-text text-muted text-center">
                *All the fields have to be filled
            </small>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="nameRec">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nameRec"
                        placeholder="Your full name here"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emailRec">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailRec"
                        placeholder="user@example.com"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contactRec">Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        id="contactRec"
                        placeholder="9899203455"
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordRec">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordRec"
                        placeholder="Password has to be atleast 5 characters"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2Rec">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password2Rec"
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

export default RegisterRec;
