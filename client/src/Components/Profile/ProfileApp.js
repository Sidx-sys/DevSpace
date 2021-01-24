import { useContext, useState, useEffect } from "react";
import { generate } from "shortid";
import UserContext from "../../Context/UserContext";
import EducationDisplay from "./EducationDisplay";

const ProfileApp = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [toEditSkills, setToEditSkills] = useState(false);
  const [skills, editSkills] = useState(userData.user.skills);
  const [skillList, editSkillList] = useState([
    "C",
    "Python",
    "R",
    "Javascript",
    "Flutter",
    "Bash",
  ]);

  const [editName, setEditName] = useState(false);

  useEffect(() => {
    const filter = () => {
      const newSkillList = skillList.filter((skl) => !skills.includes(skl));
      editSkillList(newSkillList);
    };

    filter();
  }, []);

  return (
    <div className="container">
      <h1 className="display-4">{userData.user.name}</h1>
      <p className="lead">{userData.user.email}</p>

      <hr />

      <div className="row mt-2">
        <div className="col-8 border-right border-bottom">
          <EducationDisplay />
        </div>

        <div className="col-4 border-bottom">
          <p className="h4">Rating</p>
          {userData.user.rating.length ? (
            <div></div>
          ) : (
            <p className="lead">Not rated yet</p>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-8 border-right border-bottom">
          <p className="h4">Skills</p>
          {toEditSkills ? (
            <div>
              {skills.length ? (
                <div>
                  {skills.map((skill) => {
                    return (
                      <a
                        key={generate()}
                        className="badge badge-primary mr-2"
                        href="#"
                        onClick={(e) => {
                          editSkillList([...skillList, e.target.innerText]);

                          const newSkills = skills.filter(
                            (skl) => skl !== e.target.innerText
                          );
                          editSkills(newSkills);
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
                    key={generate()}
                    href="#"
                    className="badge badge-primary mr-2"
                    onClick={(e) => {
                      const newSkillList = skillList.filter(
                        (skl) => skl !== e.target.innerText
                      );
                      editSkillList(newSkillList);

                      const newSkills = [...skills, e.target.innerText];
                      editSkills(newSkills);
                    }}
                  >
                    {skill}
                  </a>
                );
              })}
              <button
                type="button"
                href="#"
                className="btn btn-sm btn-outline-success mb-2"
                onClick={() => {
                  setUserData({
                    ...userData,
                    user: {
                      ...userData.user,
                      skills,
                    },
                  });
                  setToEditSkills(false);
                }}
              >
                Done
              </button>
            </div>
          ) : (
            <div>
              {skills.length ? (
                <div>
                  {skills.map((skill) => {
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
              <button
                type="button"
                className="btn btn-sm btn-outline-primary mb-2 mt-2"
                onClick={() => {
                  setToEditSkills(true);
                }}
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <div className="col-4">
          {editName ? (
            <form className="form-inline">
              <input
                type="text"
                value={userData.user.name}
                required
                className="form-control mb-2 mr-sm-2"
                onChange={(e) => {
                  const name = e.target.value;
                  setUserData({
                    ...userData,
                    user: {
                      ...userData.user,
                      name,
                    },
                  });
                }}
              />
              <button
                type="submit"
                className="btn btn-outline-success mb-2"
                onClick={() => {
                  setEditName(false);
                }}
              >
                Done
              </button>
            </form>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline-primary mb-3"
                onClick={() => {
                  setEditName(true);
                }}
              >
                Edit Name
              </button>{" "}
            </>
          )}

          <br />
        </div>
      </div>
    </div>
  );
};

export default ProfileApp;
