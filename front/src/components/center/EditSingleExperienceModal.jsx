import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleExpAction,
  editExperienceAction,
  getExperiencesAction,
  submitFileData,
} from "../../redux/actions";
import DeleteSingleExpModal from "./DeleteSingleExpModal";
import moment from "moment";

const EditSingleExperienceModal = ({ exp }) => {
  const userId = useSelector((state) => state.myProfile.detailsData._id);

  //checks if a checkbox is checked or not
  const [checked, setChecked] = useState(exp.endDate === null ? true : false);

  //checks if we should disable the end date based on the checkbox
  const [disabledInput, setDisabledInput] = useState(
    checked && checked === true ? true : false
  );

  //checks if we edited an experience
  const isExperienceEdited = useSelector(
    (state) => state.experiences.experienceEdited
  );

  //this is for closing the outer modal when the inner one is open
  //I passed the state as props to the inner modal (see the bottom of the code)
  const [closeOuterModal, setCloseOuterModal] = useState(false);

  //this is the function which I use to change the state of this modal(the outer one)
  //from the inner one. I passed it also as a prop to the inner modal
  //basically, it's state elevation
  const changeStateOfCloseOuterModal = (value) => {
    setCloseOuterModal(value);
  };

  const [image, setImage] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  //changing the status of isExperienceEdited
  useEffect(() => {
    if (userId) {
      dispatch(getExperiencesAction(userId));
      dispatch({
        type: "CHANGE_STATUS_EDITED_EXP",
        payload: false,
      });
    }
  }, [isExperienceEdited]);

  const dispatch = useDispatch();

  //gets the selected experience (we need the data to fill the outer modal)
  const selectedExperience = useSelector(
    (state) => state.experiences.clickedExp
  );

  //we don't have a day input, so I set a default one by 01 (the first day of the month)
  //but this is changing later with a random number between 1-28 (I didn't want to check if a
  //certain month has 30/31 days this is why I put only 28)
  const [day, setDay] = useState("01");

  //those are for closing/opening the modal (it's from react bootstrap)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //this is our experience based on exp info
  //exp is passed as a prop from clicking the pencil button(edit experience)
  const [experience, setExperience] = useState({
    role: exp.role,
    company: exp.company,
    startDate: moment(exp.startDate).format("YYYY-MM-DD"),
    endDate:
      exp.endDate === null
        ? `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`
        : `${moment(exp.endDate).format("YYYY")}-${moment(exp.endDate).format(
            "MM"
          )}-${day}`,
    description: exp.description,
    area: exp.area,
    startYear: moment(exp.startDate).format("YYYY"),
    endYear:
      exp.endDate === null
        ? new Date().getFullYear()
        : moment(exp.endDate).format("YYYY"),
    startMonth: moment(exp.startDate).format("MM"),
    endMonth:
      exp.endDate === null
        ? new Date().getMonth() + 1
        : moment(exp.endDate).format("MM"),
  });

  //function for changing the input fields
  const onChangeHandler = (value, fieldToSet) => {
    setExperience((state) => ({
      // ...experience,
      ...state,
      [fieldToSet]: value,
    }));
  };

  //function for submitting your form
  //creates also the random day between 01-28
  //creates an updatedExperience with the updated info of the input fields
  //so when I created an experience, I had to send something like this: "2022-12-01"
  //so for this, I have some properties in a single experience called endMonth and endYear
  //because we only have to input field on our modal(the month and the year)
  //also, the endDate could be null - this is when you're still working in that place
  const onSubmitHandler = (e) => {
    e.preventDefault();

    let randomDay = Math.floor(Math.random() * 28);
    if (randomDay < 10) {
      setDay(`0${randomDay}`);
    } else {
      setDay(randomDay);
    }

    let updatedExperience = {
      role: experience.role,
      company: experience.company,
      startDate: `${experience.startYear}-${experience.startMonth}-${day}`,
      endDate:
        experience.endMonth !== "" && experience.endYear !== ""
          ? `${experience.endYear}-${experience.endMonth}-${day}`
          : null,
      description: experience.description,
      area: experience.area,
    };

    console.log("updated experience", updatedExperience);

    //PUT method for updating the existing experience with the new data
    dispatch(editExperienceAction(updatedExperience, userId, exp._id));

    if (isImageUploaded === true) {
      // Adding picture to experience
      dispatch(submitFileData(image, exp.user, exp._id));
      setIsImageUploaded(false);
    }

    handleClose();
  };

  return (
    <>
      <div onClick={handleShow}>
        <Icon.Pencil
          className="edit-icon"
          onClick={() => {
            //get's the experience when clicking on the eidt button(pencil icon)
            dispatch(getSingleExpAction(exp));
          }}
        />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={closeOuterModal === true ? "d-none" : "d-block"}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* fills the modal with the data of the selected experience */}
          {selectedExperience !== "" && (
            <Form className="experiencesModal">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Title*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. Retail Sales Manager"
                  required
                  value={experience.role}
                  onChange={(e) => {
                    onChangeHandler(e.target.value, "role");
                  }}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Company name*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. Microsoft"
                  required
                  value={experience.company}
                  onChange={(e) => {
                    onChangeHandler(e.target.value, "company");
                  }}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Location*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. London, United Kingdom"
                  required
                  value={experience.area}
                  onChange={(e) => {
                    onChangeHandler(e.target.value, "area");
                  }}
                />
              </Form.Group>
              <Form.Group className="d-flex align-items-center">
                <Form.Control
                  type="checkbox"
                  className="d-inline-block checkboxInput mr-2"
                  checked={checked}
                  onChange={(e) => {
                    if (checked === true) {
                      setDisabledInput(false);
                    } else {
                      onChangeHandler("", "endDate");
                      onChangeHandler("", "endMonth");
                      onChangeHandler("", "endYear");
                      setDisabledInput(true);
                    }
                    setChecked(e.target.checked);
                  }}
                />
                <Form.Label className="mb-0">
                  I am currently working on this role.
                </Form.Label>
              </Form.Group>
              <Form.Group className="d-flex flex-column">
                <Form.Label>Start date</Form.Label>

                <div className="d-flex flex-row justify-content-between">
                  <Form.Control
                    as="select"
                    className="monthSelectInput"
                    required
                    // value={moment(experience.startDate).format("MM")}
                    value={experience.startMonth}
                    onChange={(e) =>
                      onChangeHandler(e.target.value, "startMonth")
                    }
                  >
                    <option>Month</option>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Form.Control>
                  <Form.Control
                    type="number"
                    min={1900}
                    max={2022}
                    placeholder="Year"
                    className="yearSelectInput"
                    value={experience.startYear}
                    onChange={(e) =>
                      onChangeHandler(e.target.value, "startYear")
                    }
                  ></Form.Control>
                </div>
              </Form.Group>
              <Form.Group className="d-flex flex-column ">
                <Form.Label>End date</Form.Label>
                <div className="d-flex flex-row justify-content-between">
                  <>
                    <Form.Control
                      as="select"
                      disabled={disabledInput}
                      className="monthSelectInput"
                      value={experience.endMonth}
                      onChange={(e) => {
                        onChangeHandler(e.target.value, "endMonth");
                      }}
                    >
                      <option>Month</option>
                      <option>01</option>
                      <option>02</option>
                      <option>03</option>
                      <option>04</option>
                      <option>05</option>
                      <option>06</option>
                      <option>07</option>
                      <option>08</option>
                      <option>09</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </Form.Control>
                    <Form.Control
                      type="number"
                      min={1900}
                      max={2022}
                      placeholder="Year"
                      className="yearSelectInput"
                      disabled={disabledInput}
                      value={experience.endYear}
                      onChange={(e) =>
                        onChangeHandler(e.target.value, "endYear")
                      }
                    ></Form.Control>
                  </>
                </div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={experience.description}
                  onChange={(e) =>
                    onChangeHandler(e.target.value, "description")
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload your Company Logo</Form.Label>
                <Form.File
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setIsImageUploaded(true);
                  }}
                  name="profile"
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <DeleteSingleExpModal
            outerModalClose={handleClose}
            closingChecker={closeOuterModal}
            changeStateOfCloseOuterModal={changeStateOfCloseOuterModal}
          />
          <Button
            variant="primary"
            onClick={onSubmitHandler}
            className="rounded-pill"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditSingleExperienceModal;
