import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext";
import ApplicationModule from "./ApplicationModule";
import PreLoader from "./PreLoader";
import Axios from "axios";

const MyApplications = () => {
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState();

  const history = useHistory();

  useEffect(() => {
    const getApplications = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null || token === "") history.push("/");
      else {
        const app_list = await Axios.get(
          `http://localhost:5000/api/application/app/${userData?.user.id}`,
          {
            headers: { "x-auth-token": token },
          }
        );

        setApplications(app_list.data);
        setIsLoading(false);
      }
    };
    getApplications();
  }, []);

  return (
    <div className="container">
      <h1 className="display-4 text-center mb-4">My Applications</h1>
      {isLoading ? (
        <PreLoader />
      ) : applications.length ? (
        <div>
          {applications.map((app) => {
            return <ApplicationModule application={app} />;
          })}
        </div>
      ) : (
        <p className="lead">No Applications exists</p>
      )}
    </div>
  );
};

export default MyApplications;
