import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Axios from "axios";
import PreLoader from "../PreLoader";
import Fuse from "fuse.js";
import moment from "moment";
import ModalExample from "../Modal";

const ApplicantList = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [jobs, setJobs] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [displayJobs, setDisplayJobs] = useState();

  const [typeFilter, setTypeFilter] = useState("Any");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(Infinity);
  const [duration, setDuration] = useState(7);
  const [sortType, setSortType] = useState("None");
  const [order, setOrder] = useState("Ascending");
  const [searchTitle, setSearchTitle] = useState("");
  const [sop, setSop] = useState();

  const history = useHistory();

  const sortSalary = (a, b) => {
    return order === "Ascending" ? a.spm - b.spm : b.spm - a.spm;
  };

  const sortDuration = (a, b) => {
    return order === "Ascending"
      ? a.duration - b.duration
      : b.duration - a.duration;
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
    const getJobs = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null || token === "") history.push("/");
      else {
        const job_list = await Axios.get("http://localhost:5000/api/job", {
          headers: { "x-auth-token": token },
        });

        setDisplayJobs(job_list.data);
        setJobs(job_list.data);
        setIsLoading(false);
      }
    };

    getJobs();
  }, []);

  useEffect(() => {
    const sortAndFilter = () => {
      if (isLoading) return;

      const fuse = new Fuse(jobs, {
        includeScore: true,
        keys: ["title"],
      });
      const result = fuse.search(searchTitle);

      let newList = searchTitle
        ? result
            .map((job) => {
              if (job.score <= 0.6) return job.item;
            })
            .filter((job) => job)
        : jobs;

      newList =
        typeFilter === "Any"
          ? newList
          : newList.filter((job) => job.job_type === typeFilter);

      if (!minSalary) setMinSalary(0);
      if (!maxSalary) setMaxSalary(Infinity);
      newList = newList.filter(
        (job) => job.spm >= minSalary && job.spm < maxSalary
      );

      newList = newList.filter((job) => job.duration < duration);

      if (sortType === "Salary") newList.sort(sortSalary);
      else if (sortType === "Duration") newList.sort(sortDuration);
      else if (sortType === "Rating") newList.sort(sortRating);

      setDisplayJobs(newList);
    };

    sortAndFilter();
  }, [
    typeFilter,
    minSalary,
    maxSalary,
    duration,
    sortType,
    order,
    searchTitle,
  ]);

  const applyJob = (job_id, recruiter_id) => {
    const job = jobs.filter((job) => job._id === job_id)[0];

    let tempJob = job;
    tempJob.applied.push(userData.user.id);

    const token = localStorage.getItem("auth-token");

    const application = {
      data: {
        job_id,
        applicant_id: userData.user.id,
        applicant_name: userData.user.name,
        recruiter_id,
        date_of_app: moment().format("DD-MM-YYYY"),
        sop,
      },
      applied: job.applied,
    };

    const status = Axios.post(
      "http://localhost:5000/api/application",
      application,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    ).catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h1 className="display-4 text-center">Job Listings</h1>
      {isLoading ? (
        <PreLoader />
      ) : displayJobs ? (
        <div>
          <div>
            <div className="card mb-3">
              <div className="card-body">
                <p className="lead">Advanced Search</p>
                <div className="row">
                  <div className="col-2">
                    <label htmlFor="jobType">Job Type</label>
                    <select
                      id="jobType"
                      className="form-control"
                      onChange={(e) => {
                        const jobType = e.target.value;
                        setTypeFilter(jobType);
                      }}
                    >
                      <option selected>Any</option>
                      <option>Work From Home</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                    </select>
                  </div>

                  <div className="col-2">
                    <label htmlFor="minsalary">Minimum Salary</label>

                    <input
                      type="number"
                      className="form-control"
                      id="minsalary"
                      placeholder="Min"
                      onChange={(e) => {
                        const min = e.target.value;
                        setMinSalary(min);
                      }}
                    />
                  </div>

                  <div className="col-2">
                    <label htmlFor="maxsalary">Maximum Salary</label>

                    <input
                      type="number"
                      className="form-control"
                      id="maxsalary"
                      placeholder="Max"
                      onChange={(e) => {
                        const max = e.target.value;
                        setMaxSalary(max);
                      }}
                    />
                  </div>

                  <div className="col-2">
                    <label htmlFor="duration">Duration (&lt;)</label>
                    <select
                      id="duration"
                      className="form-control"
                      onChange={(e) => {
                        const duration = e.target.value;
                        setDuration(duration);
                      }}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option selected>7</option>
                    </select>
                  </div>

                  <div className="col-2">
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
                      <option>Salary</option>
                      <option>Duration</option>
                      <option>Rating</option>
                    </select>
                  </div>

                  <div className="col-2">
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
                <div className="row">
                  <div className="col">
                    <div className="form-group mb-2 mt-2">
                      <label htmlFor="title">Search by Job Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        onChange={(e) => {
                          const searchTitle = e.target.value;
                          setSearchTitle(searchTitle);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {displayJobs.map((job) => {
            return (
              <div>
                {moment(job.deadline_date) >= moment(Date.now()) ? (
                  <div className="card mb-3" key={job._id}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <p className="h3 text-left">{job.title}</p>
                        </div>
                        <div className="col">
                          <p className="h4 text-right">
                            Recruiter: {job.recruiter_name}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row justify-content-center">
                        <div className="col-3">
                          <p className="lead">
                            <strong>Salary Per Month:</strong> {job.spm}
                          </p>
                        </div>

                        <div className="col-3">
                          <p className="lead">
                            <strong>Duration:</strong> {job.duration}
                          </p>
                        </div>

                        <div className="col-3">
                          <p className="lead">
                            <strong>Job Type:</strong> {job.job_type}
                          </p>
                        </div>
                      </div>

                      <div className="row justify-content-center">
                        <div className="col-3">
                          <p className="lead">
                            <strong>Deadline:</strong> {job.deadline_date}
                          </p>
                        </div>

                        <div className="col-3">
                          <p className="lead">
                            <strong>Rating:</strong>{" "}
                            {job.rating.length
                              ? job.rating.reduce(
                                  (a, b) => Number(a) + Number(b)
                                ) / job.rating.length
                              : "Not Rated Yet"}
                          </p>
                        </div>

                        <div className="col-3">
                          {job.applied.includes(userData.user?.id) ? (
                            <button
                              type="button"
                              className="btn btn-success"
                              disabled
                            >
                              Applied
                            </button>
                          ) : job.applied.length === job.app_limit ||
                            job.selected.length === job.job_limit ? (
                            <button
                              type="button"
                              className="btn btn-warning"
                              disabled
                            >
                              Full
                            </button>
                          ) : (
                            <div>
                              <ModalExample
                                sop={sop}
                                setSop={setSop}
                                applyJob={applyJob}
                                job_id={job._id}
                                recruiter_id={job.recruiter_id}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="lead text-center">No Job Listings present yet</p>
        </div>
      )}
    </div>
  );
};
export default ApplicantList;
