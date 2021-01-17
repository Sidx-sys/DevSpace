import { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";
import EducationDisplay from "./EducationDisplay";

const ProfileApp = () => {
    const { userData, setUserData } = useContext(UserContext);

    const [editSkills, setEditSkills] = useState(false);
    const [editName, setEditName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [user, setUser] = useState({
        ...userData.user,
    });

    return (
        <div className="container">
            <h1 className="display-4">{user.name}</h1>
            <p className="lead">{user.email}</p>

            <hr />

            <div className="row mt-2">
                <div className="col-8 border-right border-bottom">
                    <EducationDisplay />
                </div>

                <div className="col-4 border-bottom">
                    <p className="h4">Rating</p>
                    {user.rating.length ? (
                        <div></div>
                    ) : (
                        <p className="lead">Not rated yet</p>
                    )}
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-8 border-right border-bottom">
                    <p className="h4">Skills</p>
                    {user.skills.length ? (
                        <div></div>
                    ) : (
                        <p className="lead">None filled currently</p>
                    )}
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary mb-2"
                        onClick={() => {
                            setEditSkills(true);
                        }}
                    >
                        Edit
                    </button>
                </div>

                <div className="col-4">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary mb-3"
                        onClick={() => {
                            setEditName(true);
                        }}
                    >
                        Edit Name
                    </button>
                    <br />
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                            setEditEmail(true);
                        }}
                    >
                        Edit Email
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileApp;
