import { useContext, useState } from "react";
import UserContext from "../../Context/UserContext";

const ProfileRec = () => {
    const { userData, setUserData } = useContext(UserContext);

    return (
        <div className="container">
            <h1 className="display-4">{userData.user.name}</h1>
            <small className="text-muted">
                <strong>@</strong>
                {userData.user.email}
            </small>
            <hr />
        </div>
    );
};

export default ProfileRec;
