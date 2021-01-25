import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Axios from "axios";
import PreLoader from "../PreLoader";
import ApplicantListing from "../ApplicantListing";

const RecruiterList = () => {
  const { userData } = useContext(UserContext);
  const [jobs, setJobs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const getJobs = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null || token === "") history.push("/");
      else {
        const job_list = await Axios.get(
          `http://localhost:5000/api/job/rec/${userData?.user.id}`,
          {
            headers: { "x-auth-token": token },
          }
        );

        setJobs(job_list.data);
        setIsLoading(false);
      }
    };

    getJobs();
  }, []);

  const updateJobs = (job) => {
    Axios.put(`http://localhost:5000/api/job/${job.job_id}`, job, {
      headers: { "x-auth-token": userData.token },
    });
  };

  const deleteJob = (job_id) => {
    const jobList = jobs.filter((job) => job._id !== job_id);
    setJobs(jobList);

    Axios.delete(`http://localhost:5000/api/job/${job_id}`, {
      headers: { "x-auth-token": userData.token },
    });
  };

  return (
    <div className="container">
      {selectedJob !== null ? (
        <ApplicantListing job={selectedJob} setSelectedJob={setSelectedJob} />
      ) : (
        <div>
          <h1 className="display-4 text-center mb-3 mb-2">Jobs Listed</h1>
          {isLoading ? (
            <PreLoader />
          ) : jobs.length ? (
            <div>
              {jobs.map((job) => {
                return (
                  <div className="card mb-3" key={job._id}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <p className="h3 text-left">{job.title}</p>
                        </div>
                      </div>
                      <hr />
                      <div className="row justify-content-center">
                        <div className="col">
                          <p className="lead">
                            <strong>Date of Posting</strong> {job.posting_date}
                          </p>
                        </div>

                        <div className="col">
                          <p className="lead">
                            <strong>No. of Applicants</strong>{" "}
                            {job.applied.length}
                          </p>
                        </div>
                      </div>

                      <div className="row justify-content-center">
                        <div className="col">
                          <span className="lead mr-1">
                            <strong>Max No. of Positions</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={job.job_limit}
                            onChange={(e) => {
                              const job_limit = e.target.value;
                              setJobs((curJobs) =>
                                curJobs.map((x) =>
                                  x._id === job._id
                                    ? {
                                        ...x,
                                        job_limit,
                                      }
                                    : x
                                )
                              );
                            }}
                          />
                        </div>
                        <div className="col">
                          <span className="lead mr-1">
                            <strong>Application Deadline</strong>
                          </span>
                          <input
                            type="date"
                            className="form-control"
                            value={job.deadline_date}
                            onChange={(e) => {
                              const deadline_date = e.target.value;
                              setJobs((curJobs) =>
                                curJobs.map((x) =>
                                  x._id === job._id
                                    ? {
                                        ...x,
                                        deadline_date,
                                      }
                                    : x
                                )
                              );
                            }}
                          />
                        </div>
                      </div>

                      <div className="row justify-content-center">
                        <div className="col">
                          <span className="lead mr-1">
                            <strong>Max No. of Applicants</strong>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            value={job.app_limit}
                            onChange={(e) => {
                              const app_limit = e.target.value;
                              setJobs((curJobs) =>
                                curJobs.map((x) =>
                                  x._id === job._id
                                    ? {
                                        ...x,
                                        app_limit,
                                      }
                                    : x
                                )
                              );
                            }}
                          />
                        </div>
                        <div className="col">
                          <button
                            type="button"
                            className="btn btn-outline-danger mt-4"
                            onClick={() => {
                              deleteJob(job._id);
                            }}
                          >
                            Delete
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-success mt-4 ml-2"
                            onClick={() => {
                              updateJobs(job);
                            }}
                          >
                            Save Edits
                          </button>

                          <button
                            type="button"
                            className="btn btn-outline-info mt-4 ml-2"
                            onClick={() => {
                              setSelectedJob(job);
                            }}
                          >
                            See Applicants
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <p className="h3 text-center">No Jobs Listed Yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecruiterList;
