import { useState } from "react";
import { Form, Modal, Row } from "react-bootstrap";
import {
  Envelope,
  GeoAltFill,
  Linkedin,
  Pencil,
  TelephoneFill,
} from "react-bootstrap-icons";
import { useSelector } from "react-redux";

function EditContactInfoModal() {
  // Modal variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Fetching variables
  let details = useSelector((state) => state.myProfile.detailsData);
  let isFetched = useSelector((state) => state.myProfile.isFetched);

  // Changing Data via Modal submit

  return (
    <>
      {/* Button Open Modal */}
      <b onClick={handleShow}>Contact info</b>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark" style={{ "font-weight": "500" }}>
            {details.name} {details.surname}
          </Modal.Title>
        </Modal.Header>
        {isFetched ? (
          <Modal.Body>
            <Form style={{ color: "grey", height: "48vh" }}>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="text-dark" style={{ "font-weight": "500" }}>
                  Contact Info
                </h5>
                <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
                  <Pencil style={{ "font-size": "20px" }} />
                </div>
              </div>
              <Row className="mt-2 text-dark">
                <div
                  className="col-1 d-flex align-items-start p-0 pl-3"
                  style={{ "font-size": "20px" }}
                >
                  <Linkedin />
                </div>
                <div className="col-11">
                  <h6 className="mb-0">Your Profile ID</h6>
                  <p className="mt-1 text-primary font-weight-bold">
                    6396f013c96dfb001521a5ba
                  </p>
                </div>
              </Row>
              <Row className="mt-2 text-dark">
                <div
                  className="col-1 d-flex align-items-start p-0 pl-3"
                  style={{ "font-size": "20px" }}
                >
                  <TelephoneFill />
                </div>
                <div className="col-11">
                  <h6 className="mb-0">Phone</h6>
                  <p className="mt-1">+49171 / 21 11 775</p>
                </div>
              </Row>
              <Row className="mt-2 text-dark">
                <div
                  className="col-1 d-flex align-items-start p-0 pl-3"
                  style={{ "font-size": "20px" }}
                >
                  <GeoAltFill />
                </div>
                <div className="col-11">
                  <h6 className="mb-0">Address</h6>
                  <p className="mt-1 text-primary font-weight-bold">
                    Feldbergstraße 57, 61440 Oberursel
                  </p>
                </div>
              </Row>
              <Row className="mt-2 text-dark">
                <div
                  className="col-1 d-flex align-items-start p-0 pl-3"
                  style={{ "font-size": "20px" }}
                >
                  <Envelope />
                </div>
                <div className="col-11">
                  <h6 className="mb-0">Email</h6>
                  <p className="mt-1 text-primary font-weight-bold">
                    {details.email}
                  </p>
                </div>
              </Row>
              <Row className="mt-2 text-dark">
                <div
                  className="col-1 d-flex align-items-start p-0 pl-3"
                  style={{ "font-size": "20px" }}
                >
                  <Linkedin />
                </div>
                <div className="col-11">
                  <h6 className="mb-0">Birthday</h6>
                  <p className="mt-1">April 7</p>
                </div>
              </Row>
            </Form>
          </Modal.Body>
        ) : (
          <Modal.Body></Modal.Body>
        )}
      </Modal>
    </>
  );
}

export default EditContactInfoModal;
