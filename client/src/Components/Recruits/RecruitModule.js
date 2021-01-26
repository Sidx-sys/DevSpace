import { useState, useContext } from "react";
import UserContext from "../../Context/UserContext";
import Axios from "axios";

const RecruitModule = (props) => {
  const { application } = props;
  const { userData } = useContext(UserContext);
  const [toRate, setToRate] = useState(false);
  const [app, setApp] = useState(application);
  const [jRating, setJRating] = useState();

  const submit = async () => {
    let rating = app.rating;
    rating.push(jRating);

    setApp({
      ...app,
      rated_app: true,
      rating,
    });

    await Axios.put(
      `http://localhost:5000/api/profile/rating/${app.applicant_id}`,
      { rating, app_id: app._id },
      {
        headers: { "x-auth-token": userData.token },
      }
    );
  };

  return (
    <div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <p className="h4 text-left">{app.applicant_name}</p>
            </div>

            <div className="col">
              <p className="lead text-right text-success">
                Joining Date: {app.date_of_join}
              </p>
            </div>
          </div>

          <hr />
          <div className="row justify-content-center">
            <div className="col-3">
              <p className="lead">
                <strong>Job Type: </strong> {app.job_type}
              </p>
            </div>

            <div className="col-3">
              <p className="lead">
                <strong>Job Title: </strong> {app.title}
              </p>
            </div>

            <div className="col-3">
              {app.rated_app ? (
                <p className="lead">
                  <strong>Rating: </strong>{" "}
                  {app.rating.reduce((a, b) => Number(a) + Number(b)) /
                    app.rating.length}
                </p>
              ) : !toRate ? (
                <p className="lead">
                  <strong>Rating: </strong> &nbsp;
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setToRate(true);
                    }}
                  >
                    Rate the Applicant
                  </button>
                </p>
              ) : (
                <div>
                  <input
                    type="number"
                    className="form-control"
                    min="0"
                    max="5"
                    aria-describedby="emailHelp"
                    onChange={(e) => {
                      let val = e.target.value;
                      setJRating(val);
                    }}
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    You can only rate the applicant once
                  </small>
                  <button
                    type="submit"
                    className="btn btn-outline btn-success btn-sm"
                    onClick={submit}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitModule;
