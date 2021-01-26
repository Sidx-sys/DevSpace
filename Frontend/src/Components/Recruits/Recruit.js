import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import PreLoader from "../PreLoader";
import RecruitModule from "./RecruitModule";
import moment from "moment";
import Axios from "axios";

const Recruits = () => {
  const { userData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState();
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

  const sortTitle = (a, b) => {
    return order === "Ascending"
      ? a.title < b.title
        ? -1
        : 1
      : b.title < a.title
      ? -1
      : 1;
  };

  const sortDate = (a, b) => {
    const left = moment(a.date_of_join);
    const right = moment(b.date_of_join);

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
      ? a.rating.reduce((l, r) => Number(l) + Number(r)) / a.rating.length
      : 0;
    const right = b.rating.length
      ? b.rating.reduce((l, r) => Number(l) + Number(r)) / b.rating.length
      : 0;
    return order === "Ascending" ? left - right : right - left;
  };

  useEffect(() => {
    const getInfo = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null || token === "") history.push("/");
      else {
        const app_list = await Axios.get(
          `http://localhost:5000/api/application/rec/accept/${userData?.user?.id}`,
          {
            headers: { "x-auth-token": token },
          }
        );

        setDisplayList(app_list.data);
        setApplications(app_list.data);
        setIsLoading(false);
      }
    };
    getInfo();
  }, []);

  useEffect(() => {
    const filter = () => {
      if (isLoading) return;

      let newList = applications;

      if (sortType === "Name") newList.sort(sortName);
      else if (sortType === "Job Title") newList.sort(sortTitle);
      else if (sortType === "Date of Joining") newList.sort(sortDate);
      else if (sortType === "Rating") newList.sort(sortRating);

      setDisplayList([...newList]);
    };

    filter();
  }, [sortType, order]);

  return (
    <div>
      <div className="container">
        <h1 className="display-4 text-center mb-4">Recruits</h1>
        {isLoading ? (
          <PreLoader />
        ) : displayList.length ? (
          <div>
            <div className="card mb-3">
              <div className="card-body">
                <div className="row justify-content-center">
                  <div className="col-3">
                    <p className="lead">Sort Options</p>
                  </div>

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
                      <option>Job Title</option>
                      <option>Date of Joining</option>
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
                <div></div>
              </div>
            </div>
            {displayList.map((app) => {
              return <RecruitModule application={app} key={app._id} />;
            })}
          </div>
        ) : (
          <p className="lead text-center mt-2">No one recruited yet</p>
        )}
      </div>
    </div>
  );
};

export default Recruits;
