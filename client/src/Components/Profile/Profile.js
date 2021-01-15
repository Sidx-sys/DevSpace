import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import ProfileApp from "./ProfileApp";
import ProfileRec from "./ProfileRec";
import PreLoader from "../PreLoader";

const Profile = () => {
    const [isLoading, setIsLoading] = useState({
        loading: true,
    });

    const { userData } = useContext(UserContext);
    let history = useHistory();

    useEffect(() => {
        const unAuthorized = () => {
            let token = localStorage.getItem("auth-token");
            if (token === null || token === "") history.push("/");
        };

        unAuthorized();
    });

    useEffect(() => {
        const userLoaded = () => {
            if (userData.user !== null)
                setIsLoading({
                    loading: false,
                });
        };

        userLoaded();
    }, [userData]);

    return (
        <>
            {isLoading.loading ? (
                <PreLoader />
            ) : userData.user.type === "applicant" ? (
                <ProfileApp />
            ) : (
                <ProfileRec />
            )}
        </>
    );
};

export default Profile;
