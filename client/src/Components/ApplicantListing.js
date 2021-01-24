import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import PreLoader from "./PreLoader";
import ApplicationRec from "./ApplicationRec";
import moment from "moment";
import UserContext from "../Context/UserContext";

const ApplicantListing = (props) => {
  const { job, setSelectedJob } = props;
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [appList, setAppList] = useState();
  const [displayList, setDisplayList] = useState();

  const [sortType, setSortType] = useState("None");
  const [order, setOrder] = useState("Ascending");

  const history = useHistory();

  const sortName = (a, b) => {
    return order === "Ascending"
      ? a.applicant_name < b.applicant_name
        ? -1
        : 1
      : b.applicant_name < a.applicant_name
      ? -1
      : 1;
  };

  const sortDate = (a, b) => {
    const left = moment(a.date_of_app);
    const right = moment(b.date_of_app);

    return order === "Ascending"
      ? left < right
        ? 1
        : -1
      : right < left
      ? 1
      : -1;
  };

  const sortRating = (a, b) => {
    const left = a.rating.length
      ? a.rating.reduce((l, r) => l + r) / a.rating.length
      : 0;
    const right = b.rating.length
      ? b.rating.reduce((l, r) => l + r) / b.rating.length
      : 0;
    return order === "Ascending" ? left - right : right - left;
  };

  useEffect(() => {
    const getApplications = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null || token === "") history.push("/");
      else {
        const application_list = await Axios.get(
          `http://localhost:5000/api/application/rec/${job._id}`,
          {
            headers: { "x-auth-token": token },
          }
        );

        setAppList(application_list.data);
        setDisplayList(application_list.data);
        setIsLoading(false);
      }
    };

    getApplications();
  }, []);

  useEffect(() => {
    const filter = () => {
      let newList = appList;

      if (sortType === "Name") newList.sort(sortName);
      else if (sortType === "Date of Application") newList.sort(sortDate);
      else if (sortType === "Rating") newList.sort(sortRating);

      setDisplayList(newList);
    };

    filter();
  }, [sortType, order]);

  const shortlistApplicant = (application) => {
    setDisplayList((curList) =>
      curList.map((app) =>
        app._id === application._id
          ? {
              ...app,
              stage: "shortlisted",
            }
          : app
      )
    );

    Axios.put(
      `http://localhost:5000/api/application/shortlist/${application._id}`,
      null,
      { headers: { "x-auth-token": userData.token } }
    ).catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1 className="display-4 text-center mb-3 mt-2">
        Applications For {job.title}
        <span style={{ marginLeft: "10rem" }} className="">
          <button
            type="button"
            className="btn btn-info mb-2"
            onClick={() => {
              setSelectedJob(null);
            }}
          >
            Go Back
          </button>
        </span>
      </h1>
      {isLoading ? (
        <PreLoader />
      ) : (
        <div>
          <div>
            <div className="card mb-3">
              <div className="card-body">
                <p className="lead text-center">Sorting Options</p>

                <div className="row justify-content-center">
                  <div className="col-3">
                    <label htmlFor="Sorting">Sort By</label>
                    <select
                      id="Sorting"
                      className="form-control"
                      onChange={(e) => {
                        const sortBy = e.target.value;
                        setSortType(sortBy);
                      }}
                    >
                      <option selected>None</option>
                      <option>Name</option>
                      <option>Date of Application</option>
                      <option>Rating</option>
                    </select>
                  </div>

                  <div className="col-3">
                    <label htmlFor="ordering">Order</label>
                    <select
                      id="ordering"
                      className="form-control"
                      onChange={(e) => {
                        const order = e.target.value;
                        setOrder(order);
                      }}
                    >
                      <option selected>Ascending</option>
                      <option>Descending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {displayList.length ? (
            <div>
              {displayList.map((application) => {
                return (
                  <ApplicationRec
                    application={application}
                    shortlistApplicant={shortlistApplicant}
                  />
                );
              })}
            </div>
          ) : (
            <div>
              <p className="lead text-center">No applications recieved yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApplicantListing;
