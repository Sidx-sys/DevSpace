import { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";
import UserContext from "../Context/UserContext";

const CreateJob = () => {
    const { userData } = useContext(UserContext);

    const [title, setTitle] = useState();
    const [appLimit, setAppLimit] = useState();
    const [jobLimit, setJobLimit] = useState();
    const [deadlineDate, setDeadlineDate] = useState();
    const [skillsRequired, setSkillsRequired] = useState([]);
    const [jobType, setJobType] = useState("Work From Home");
    const [duration, setDuration] = useState(0);
    const [spm, setSpm] = useState();

    const [error, setError] = useState();

    const [skillList, editSkillList] = useState([
        "C",
        "Python",
        "R",
        "Javascript",
        "Flutter",
        "Bash",
    ]);

    const history = useHistory();

    useEffect(() => {
        const unAuthorized = () => {
            let token = localStorage.getItem("auth-token");
            if (token === null || token === "") history.push("/");
        };

        unAuthorized();
    }, []);

    const submit = async (e) => {
        try {
            e.preventDefault();

            const token = localStorage.getItem("auth-token");

            const newJob = {
                title,
                recruiter_id: userData.user.id,
                recruiter_name: userData.user.name,
                app_limit: appLimit,
                job_limit: jobLimit,
                posting_date: moment().format("DD-MM-YYYY"),
                deadline_date: deadlineDate,
                skills_required: skillsRequired,
                job_type: jobType,
                duration,
                spm,
            };
            const job_id = await Axios.post(
                "http://localhost:5000/api/job/",
                newJob,
                {
                    headers: { "x-auth-token": token },
                }
            );

            setError(undefined);
            setTitle(null);
            setAppLimit(null);
            setDeadlineDate(null);
            setSkillsRequired([]);
            setJobType("Work From Home");
            setDuration(0);
            setSpm(null);
            editSkillList([
                ["C", "Python", "R", "Javascript", "Flutter", "Bash"],
            ]);
            e.target.reset();
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div className="container mb-3">
            {error ? (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            ) : (
                <> </>
            )}
            <h3 className="text-center mt-5">Add a new Job Listing</h3>
            <small id="header" className="form-text text-muted text-center">
                *All the fields have to be filled
            </small>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="title">Job Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Junior Developer"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="appLimit">Applicant Limit</label>
                    <input
                        type="number"
                        className="form-control"
                        id="appLimit"
                        aria-describedby="emailHelp"
                        required
                        min="1"
                        max="10"
                        onChange={(e) => setAppLimit(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="jobLimit">Jobs Available</label>
                    <input
                        type="number"
                        className="form-control"
                        id="jobLimit"
                        required
                        min="1"
                        max="5"
                        onChange={(e) => setJobLimit(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="deadlineDate">Deadline Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="deadlineDate"
                        placeholder="DD-MM-YYYY (20-03-2021)"
                        required
                        onChange={(e) => setDeadlineDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <div>
                        {skillsRequired.length ? (
                            <div>
                                <span className="lead mr-2">
                                    Required Skills:{" "}
                                </span>
                                {skillsRequired.map((skill) => {
                                    return (
                                        <a
                                            className="badge badge-primary mr-2"
                                            href="#"
                                            onClick={(e) => {
                                                editSkillList([
                                                    ...skillList,
                                                    e.target.innerText,
                                                ]);

                                                const newSkills = skillsRequired.filter(
                                                    (skl) =>
                                                        skl !==
                                                        e.target.innerText
                                                );
                                                setSkillsRequired(newSkills);
                                            }}
                                        >
                                            {skill}
                                        </a>
                                    );
                                })}
                                <p className="text-center">
                                    (Click on above skills to remove)
                                </p>
                            </div>
                        ) : (
                            <p className="lead">Add Skills</p>
                        )}
                        {skillList.map((skill) => {
                            return (
                                <a
                                    href="#"
                                    className="badge badge-primary mr-2"
                                    value
                                    onClick={(e) => {
                                        const newSkillList = skillList.filter(
                                            (skl) => skl !== e.target.innerText
                                        );
                                        editSkillList(newSkillList);

                                        const newSkills = [
                                            ...skillsRequired,
                                            e.target.innerText,
                                        ];
                                        setSkillsRequired(newSkills);
                                    }}
                                >
                                    {skill}
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="jobType">Job Type</label>
                    <select
                        className="form-control"
                        id="jobType"
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option selected>Work From Home</option>
                        <option>Part-time</option>
                        <option>Full-time</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <select
                        class="form-control"
                        id="duration"
                        onChange={(e) => setDuration(e.target.value)}
                        aria-describedby="durationHelp"
                    >
                        <option selected>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                    <small id="emailHelp" className="form-text text-muted">
                        Default 0 duration means indefinite.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="spm">Salary Per Month</label>
                    <input
                        type="number"
                        className="form-control"
                        id="spm"
                        placeholder="30000"
                        required
                        onChange={(e) => setSpm(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateJob;
