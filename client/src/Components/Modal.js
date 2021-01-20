/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalExample = (props) => {
  const { setSop, applyJob, job_id, recruiter_id } = props;

  const [modal, setModal] = useState(false);
  const [error, setError] = useState();

  const toggle = () => {
    setModal(!modal);
    setError(null);
    setSop(null);
  };

  return (
    <div>
      <Button outline color="primary" onClick={toggle}>
        Apply
      </Button>
      <Modal isOpen={modal} toggle={toggle} style={{ marginTop: "15rem" }}>
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <> </>
        )}
        <ModalHeader toggle={toggle}>Enter SOP</ModalHeader>
        <ModalBody>
          <textarea
            className="form-control"
            aria-label="With textarea"
            style={{ height: "12rem" }}
            onChange={(e) => {
              const text = e.target.value;
              const sopLength = text.split(" ").length;
              if (sopLength <= 5) {
                setError("You have to write atleast 5 words");
              } else if (sopLength > 250) {
                setError("SOP exceeded word limit of 250");
              } else {
                setError(null);
                setSop(text);
              }
            }}
          ></textarea>
        </ModalBody>
        <ModalFooter>
          {error ? (
            <Button
              color="primary"
              disabled
              onClick={() => {
                applyJob(job_id, recruiter_id);
              }}
            >
              Confirm SOP and Apply
            </Button>
          ) : (
            <Button
              color="primary"
              onClick={() => {
                applyJob(job_id, recruiter_id);
                toggle();
              }}
            >
              Confirm SOP and Apply
            </Button>
          )}{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
