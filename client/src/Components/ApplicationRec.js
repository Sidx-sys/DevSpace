import generate from "shortid";

const ApplicationRec = (props) => {
  const {
    application,
    shortlistApplicant,
    acceptApplicant,
    rejectApplicant,
  } = props;

  return (
    <div key={application._id}>
      {application.stage !== "Rejected" && application.stage !== "Accepted" ? (
        <div>
          <div className="card mb-3">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <p className="h4 text-left">{application.applicant_name}</p>
                </div>

                <div className="col">
                  <p className="h5 text-right">Status: {application.stage}</p>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  {application.academics.length ? (
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
                          {application.academics.map((instance) => {
                            return (
                              <tr key={instance.id}>
                                <td>{instance.institutionName}</td>
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
                </div>

                <div className="col">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">SOP</h5>
                      <p class="card-text">{application.sop}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row justify-content-center mt-1">
                <div className="col-3">
                  <p className="h5 ">Skills</p>
                  {application.skills.length ? (
                    <div>
                      {application.skills.map((skill) => {
                        return (
                          <a
                            className="badge badge-primary mr-2"
                            href="#"
                            key={generate()}
                          >
                            {skill}
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="lead">None filled currently</p>
                  )}
                </div>

                <div className="col-3">
                  <p className="h5 ">Date of Application</p>
                  <p className="lead">{application.date_of_app}</p>
                </div>

                <div className="col-3">
                  <p className="h5 ">Rating</p>
                  <p className="lead">
                    {application.rating.length
                      ? application.rating.reduce((a, b) => a + b) /
                        application.rating.length
                      : "Not Rated Yet"}
                  </p>
                </div>
                <div className="col-3">
                  {application.stage === "Applied" ? (
                    <button
                      type="button"
                      class="btn btn-outline-info mr-3 mt-2"
                      onClick={() => {
                        shortlistApplicant(application);
                      }}
                    >
                      Shortlist
                    </button>
                  ) : (
                    <button
                      type="button"
                      class="btn btn-outline-info mr-3 mt-2"
                      onClick={() => {
                        acceptApplicant(application);
                      }}
                    >
                      Accept
                    </button>
                  )}
                  <button
                    type="button"
                    class="btn btn-outline-danger mt-2"
                    onClick={() => rejectApplicant(application)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ApplicationRec;
