import { useContext, useState, useEffect } from "react";
import UserContext from "../../Context/UserContext";
import { generate } from "shortid";
import Axios from "axios";

const EducationDisplay = () => {
    const { userData, setUserData } = useContext(UserContext);

    const [editEducation, setEditEducation] = useState(false);
    const [institutionName, setInstitutionName] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [academics, setAcademics] = useState(userData.user.academics);

    const modifyEducation = (e) => {
        e.preventDefault();
        e.target.reset();

        const newEducation = {
            institutionName,
            start,
            end,
            id: generate(),
        };

        const newAcademics = [...academics, newEducation];

        setAcademics(newAcademics);

        setInstitutionName(null);
        setStart(null);
        setEnd(null);
    };

    useEffect(() => {
        const updateEducation = () => {
            Axios.put(
                `http://localhost:5000/api/profile/applicant/${userData.user.id}`,
                userData.user,
                {
                    headers: { "x-auth-token": userData.token },
                }
            );
        };
        updateEducation();
    }, [userData]);

    return (
        <div>
            <p className="h4">Education</p>
            {editEducation ? (
                <div>
                    {academics.map((instance) => {
                        return (
                            <div key={instance.id} className="form-inline">
                                <input
                                    type="text"
                                    className="form-control mb-2 mr-sm-2"
                                    value={instance.institutionName}
                                    onChange={(e) => {
                                        const institutionName = e.target.value;
                                        setAcademics((curAcademics) =>
                                            curAcademics.map((x) =>
                                                x.id === instance.id
                                                    ? {
                                                          ...x,
                                                          institutionName,
                                                      }
                                                    : x
                                            )
                                        );
                                    }}
                                />
                                <input
                                    type="text"
                                    value={instance.start}
                                    className="form-control mb-2 mr-sm-2"
                                    onChange={(e) => {
                                        const start = e.target.value;
                                        setAcademics((curAcademics) =>
                                            curAcademics.map((x) =>
                                                x.id === instance.id
                                                    ? {
                                                          ...x,
                                                          start,
                                                      }
                                                    : x
                                            )
                                        );
                                    }}
                                />
                                <input
                                    type="text"
                                    value={instance.end}
                                    className="form-control mb-2 mr-sm-2"
                                    onChange={(e) => {
                                        const end = e.target.value;
                                        setAcademics((curAcademics) =>
                                            curAcademics.map((x) =>
                                                x.id === instance.id
                                                    ? {
                                                          ...x,
                                                          end,
                                                      }
                                                    : x
                                            )
                                        );
                                    }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-sm mb-2"
                                    onClick={() => {
                                        setAcademics((curAcademics) =>
                                            curAcademics.filter(
                                                (x) => x.id !== instance.id
                                            )
                                        );
                                    }}
                                >
                                    🗑️
                                </button>
                            </div>
                        );
                    })}
                    <form className="form-inline" onSubmit={modifyEducation}>
                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Institution Name"
                            required
                            onChange={(e) => setInstitutionName(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="Start Year"
                            required
                            onChange={(e) => setStart(e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control mb-2 mr-sm-2"
                            placeholder="End Year (Optional)"
                            onChange={(e) => setEnd(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="btn btn-sm btn-info mb-2"
                        >
                            Add
                        </button>
                    </form>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-success mb-2"
                        onClick={() => {
                            setUserData({
                                ...userData,
                                user: { ...userData.user, academics },
                            });
                            setEditEducation(false);
                        }}
                    >
                        Done
                    </button>
                </div>
            ) : (
                <div>
                    {academics.length ? (
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Institution Name</th>
                                        <th scope="col">Start Year</th>
                                        <th scope="col">End Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {academics.map((instance) => {
                                        return (
                                            <tr key={instance.id}>
                                                <td>
                                                    {instance.institutionName}
                                                </td>
                                                <td>{instance.start}</td>
                                                <td>{instance.end}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="lead">None filled currently</p>
                    )}
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-primary mb-2"
                        onClick={() => {
                            setEditEducation(true);
                        }}
                    >
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};

export default EducationDisplay;
