import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import Axios from "axios";

const ProfileRec = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [error, setError] = useState();

    const [editName, setEditName] = useState(false);
    const [editContact, setEditContact] = useState(false);
    const [editBio, setEditBio] = useState(false);

    useEffect(() => {
        const updateEducation = () => {
            Axios.put(
                `http://localhost:5000/api/profile/recruiter/${userData.user.id}`,
                userData.user,
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
        };
        updateEducation();
    }, [userData]);

    return (
        <div className="container">
            {error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <> </>
            )}
            <h1 className="display-4">{userData.user.name}</h1>
            <p className="lead">{userData.user.email}</p>

            <hr />
            <div className="row mt-2">
                <div className="col-8 border-right border-bottom">
                    {editBio ? (
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Bio</span>
                            </div>
                            <textarea
                                className="form-control"
                                aria-label="With textarea"
                                value={userData.user.bio}
                                onChange={(e) => {
                                    const bio = e.target.value;
                                    const bioLength = bio.split(" ").length;
                                    if (bioLength <= 250) {
                                        setError(null);
                                        setUserData({
                                            ...userData,
                                            user: {
                                                ...userData.user,
                                                bio,
                                            },
                                        });
                                    } else {
                                        setError(
                                            "Bio exceeded word limit of 250"
                                        );
                                    }
                                }}
                            ></textarea>
                            <button
                                type="submit"
                                className="btn btn-outline-success mb-2"
                                onClick={() => {
                                    setEditBio(false);
                                }}
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="h4">Bio</p>
                            {userData.user.bio ? (
                                <>
                                    {" "}
                                    <p className="lead">{userData.user.bio}</p>
                                </>
                            ) : (
                                <>
                                    {" "}
                                    <p className="lead">Bio not filled yet</p>
                                </>
                            )}
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary mb-3"
                                onClick={() => {
                                    setEditBio(true);
                                }}
                            >
                                Edit Bio
                            </button>{" "}
                        </>
                    )}
                </div>

                <div className="col-4 border-bottom">
                    {editContact ? (
                        <div>
                            <input
                                type="text"
                                className="form-control mb-2"
                                value={userData.user.contact}
                                onChange={(e) => {
                                    const contact = e.target.value;
                                    setUserData({
                                        ...userData,
                                        user: {
                                            ...userData.user,
                                            contact,
                                        },
                                    });
                                }}
                            />
                            <button
                                type="submit"
                                className="btn btn-outline-success mb-2"
                                onClick={() => {
                                    setEditContact(false);
                                }}
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="h4">Contact</p>
                            <p className="lead">{userData.user.contact}</p>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary mb-3"
                                onClick={() => {
                                    setEditContact(true);
                                }}
                            >
                                Edit Contact
                            </button>{" "}
                        </div>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col-8 mt-3 border-bottom">
                    <p className="h4">Rating</p>
                    {userData.user.rating.length ? (
                        <div></div>
                    ) : (
                        <p className="lead">Not rated yet</p>
                    )}
                </div>

                <div className="col-4 mt-3 border-left">
                    {editName ? (
                        <form className="form-inline">
                            <input
                                type="text"
                                value={userData.user.name}
                                required
                                className="form-control mb-2 mr-sm-2"
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setUserData({
                                        ...userData,
                                        user: {
                                            ...userData.user,
                                            name,
                                        },
                                    });
                                }}
                            />
                            <button
                                type="submit"
                                className="btn btn-outline-success mb-2"
                                onClick={() => {
                                    setEditName(false);
                                }}
                            >
                                Done
                            </button>
                        </form>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="btn btn-sm btn-outline-primary mb-3"
                                onClick={() => {
                                    setEditName(true);
                                }}
                            >
                                Edit Name
                            </button>{" "}
                        </>
                    )}

                    <br />
                </div>
            </div>
        </div>
    );
};

export default ProfileRec;
