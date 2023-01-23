import { useState } from "react";
import { Accordion, Card, Modal, Row } from "react-bootstrap";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

import { useSelector } from "react-redux";

function EditAddProfileSectionModal() {
  // Modal variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isCollapsed1, setIsCollapsed1] = useState(true);
  const [isCollapsed2, setIsCollapsed2] = useState(false);
  const [isCollapsed3, setIsCollapsed3] = useState(false);

  // Fetching variables
  let isFetched = useSelector((state) => state.myProfile.isFetched);

  // Changing Data via Modal submit
  let pathname = window.location.pathname;

  return (
    <>
      {/* Button Open Modal */}
      <div
        className={
          pathname === "/me"
            ? "addProfileSectionDiv bg-white rounded-pill py-1 px-3 mx-2"
            : "d-none"
        }
        // "addProfileSectionDiv bg-white rounded-pill py-1 px-3 mx-2"
        onClick={handleShow}
      >
        <div> Add profile section</div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark" style={{ fontWeight: "500" }}>
            Add to profile
          </Modal.Title>
        </Modal.Header>
        {isFetched ? (
          <Modal.Body className="py-0 pr-2">
            <Accordion defaultActiveKey="0">
              <Card className="border-0">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="0"
                  className="border-0 px-1 "
                  style={{ backgroundColor: "white" }}
                  onClick={() =>
                    isCollapsed1
                      ? setIsCollapsed1(false)
                      : setIsCollapsed1(true)
                  }
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark" style={{ fontWeight: "500" }}>
                      Core
                    </h5>
                    <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
                      {isCollapsed1 ? (
                        <ChevronUp style={{ fontSize: "20px" }} />
                      ) : (
                        <ChevronDown style={{ fontSize: "20px" }} />
                      )}
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0" className="border-0">
                  <Card.Body className="py-1 px-1 border-0">
                    <Row className=" text-dark">
                      <div className="col">
                        <p
                          className="mt-0"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Start with the basics. Filling out these sections will
                          help you be discovered by recruiters and people you
                          may know
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 pt-1 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add education
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add position
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add career break
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="font-weight-bold"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add skills
                        </p>
                      </div>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border-0">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="1"
                  className="border-0 px-1 "
                  style={{ backgroundColor: "white" }}
                  onClick={() =>
                    isCollapsed2
                      ? setIsCollapsed2(false)
                      : setIsCollapsed2(true)
                  }
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark" style={{ fontWeight: "500" }}>
                      Recommended
                    </h5>
                    <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
                      {isCollapsed2 ? (
                        <ChevronUp style={{ fontSize: "20px" }} />
                      ) : (
                        <ChevronDown style={{ fontSize: "20px" }} />
                      )}
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1" className="border-0">
                  <Card.Body className="py-1 px-1 border-0">
                    <Row className=" text-dark">
                      <div className="col">
                        <p
                          className="mt-0"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Completing these sections will increase your
                          credibility and give you access to more opportunities
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 pt-1 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add feature
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add licenses & certifications
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add courses
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="font-weight-bold"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add recommendations
                        </p>
                      </div>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card className="border-0">
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="2"
                  className="border-0 px-1 "
                  style={{ backgroundColor: "white" }}
                  onClick={() =>
                    isCollapsed3
                      ? setIsCollapsed3(false)
                      : setIsCollapsed3(true)
                  }
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="text-dark" style={{ fontWeight: "500" }}>
                      Additional
                    </h5>
                    <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
                      {isCollapsed3 ? (
                        <ChevronUp style={{ fontSize: "20px" }} />
                      ) : (
                        <ChevronDown style={{ fontSize: "20px" }} />
                      )}
                    </div>
                  </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2" className="border-0">
                  <Card.Body className="py-1 px-1 border-0">
                    <Row className=" text-dark">
                      <div className="col">
                        <p
                          className="mt-0"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add even more personality to your profile. These
                          sections will help your grow your network and build
                          more relationships.
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 pt-1 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add volunteer experience
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add publications
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add patents
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add projects
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add honors & awards
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add test scores
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add languages
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="pb-3 font-weight-bold border-bottom"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add organizations
                        </p>
                      </div>
                    </Row>
                    <Row className="text-dark">
                      <div className="col ">
                        <p
                          className="font-weight-bold"
                          style={{ fontSize: "0.9em", color: "grey" }}
                        >
                          Add causes
                        </p>
                      </div>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Modal.Body>
        ) : (
          <Modal.Body></Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default EditAddProfileSectionModal;
