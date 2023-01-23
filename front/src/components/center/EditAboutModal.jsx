import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProfileDetailsAction,
  CHANGE_PROFILE_DETAILS,
} from "../../redux/actions";

function EditAboutModal() {
  // Modal variables
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let pathname = window.location.pathname;

  // Fetching variables
  let details = useSelector((state) => state.myProfile.detailsData);
  let isFetched = useSelector((state) => state.myProfile.isFetched);
  console.log("🚀EditAboutModal ~ details", details);
  let dispatch = useDispatch();

  // Changing Data via Modal submit

  const [name, setName] = useState(`${details.name}`);
  const [surname, setSurname] = useState(`${details.surname}`);
  const [email, setEmail] = useState(`${details.email}`);
  const [bioStr, setBiostr] = useState(`${details.bio}`);
  const [title, setTitle] = useState(`${details.title}`);
  const [area, setArea] = useState(`${details.area}`);
  const [image, setImage] = useState(`${details.image}`);

  const changedDetails = {
    bio: bioStr,
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch({
      type: CHANGE_PROFILE_DETAILS,
      payload: {
        name: name,
        surname: surname,
        email: email,
        bio: bioStr,
        title: title,
        area: area,
        image: image,
      },
    });

    dispatch(changeProfileDetailsAction(changedDetails));
    handleClose();
  };

  const onChangeHandler = (value, fieldToSet) => {
    fieldToSet(value);
  };

  return (
    <>
      {/* Button Open Modal */}
      <div
        className={
          pathname === "/me"
            ? "d-flex justify-content-center alignt-items-center editButtonIconDiv pt-2"
            : "d-none"
        }
        // className="d-flex justify-content-center alignt-items-center editButtonIconDiv pt-2"
        onClick={handleShow}
      >
        <Pencil style={{ fontSize: "20px" }} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "grey" }}>Edit About</Modal.Title>
        </Modal.Header>
        {isFetched ? (
          <Modal.Body>
            <div className="overflow-auto">
              <p className="lightGreyParagraph mb-4">* indicates required</p>
              <Form style={{ color: "grey", height: "30vh" }}>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>About you</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={7}
                    value={bioStr}
                    onChange={(e) => onChangeHandler(e.target.value, setBiostr)}
                  />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
        ) : (
          <Modal.Body></Modal.Body>
        )}
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={onSubmitHandler}
            className="rounded-pill py-0"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAboutModal;
