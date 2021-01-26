import { useState, useEffect, useContext } from "react";
import UserContext from "../Context/UserContext";
import Axios from "axios";

const ApplicationModule = (props) => {
  const { application } = props;
  const { userData } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState();
  const [toRate, setToRate] = useState(false);
  const [app, setApp] = useState(application);
  const [jRating, setJRating] = useState();

  useEffect(() => {
    const loadJob = async () => {
      const jobId = app?.job_id;
      const jReq = await Axios.get(
        `http://localhost:5000/api/job/info/${jobId}`,
        { headers: { "x-auth-token": userData.token } }
      );

      setJob(jReq.data);
      setIsLoading(false);
    };
    loadJob();
  }, []);

  const submit = async () => {
    let rating = job.rating;
    rating.push(jRating);

    setJob({
      ...job,
      rating,
    });

    setApp({
      ...app,
      rated: true,
    });

    await Axios.put(`http://localhost:5000/api/job/${job._id}`, job, {
      headers: { "x-auth-token": userData.token },
    });

    await Axios.put(
      `http://localhost:5000/api/application/rated/${app._id}`,
      null,
      {
        headers: { "x-auth-token": userData.token },
      }
    );
  };

  return (
    <div>
      {isLoading ? (
        <div className="d-flex justify-content-center m-3">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="card mb-3" key={app._id}>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <p className="h4 text-left">{job.title}</p>
              </div>

              <div className="col">
                {app.date_of_join ? (
                  <p className="lead text-right text-success">
                    Joining Date: {app.date_of_join}
                  </p>
                ) : (
                  <p className="lead text-right text-info">
                    Status: {app.stage}
                  </p>
                )}
              </div>
            </div>

            <hr />
            <div className="row justify-content-center">
              <div className="col-4">
                <p className="lead">
                  <strong>Salary Per Month</strong> {job.spm}
                </p>
              </div>

              <div className="col-4">
                <p className="lead">
                  <strong>Recruiter Name</strong> {job.recruiter_name}
                </p>
              </div>

              <div className="col-4">
                {app.stage !== "Accepted" || app?.rated ? (
                  <p className="lead">
                    <strong>Rating: </strong>{" "}
                    {job.rating.length
                      ? job.rating.reduce((a, b) => Number(a) + Number(b)) /
                        job.rating.length
                      : "Not rated yet"}
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
                      Click to Rate the Job
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
                      You can only rate this job once
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
      )}
    </div>
  );
};

export default ApplicationModule;
