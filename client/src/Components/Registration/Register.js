import RegisterApp from "./RegisterApp";
import RegisterRec from "./RegisterRec";

const Register = () => {
    return (
        <div className="container mt-5" style={{ maxWidth: "45rem" }}>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                    <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                    >
                        Applicant
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                    >
                        Recruiter
                    </a>
                </li>
            </ul>

            <div className="tab-content" id="myTabContent">
                <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                >
                    <RegisterApp />
                </div>

                <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                >
                    <RegisterRec />
                </div>
            </div>
        </div>
    );
};

export default Register;
