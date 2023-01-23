import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-bootstrap-icons";
import { Button, Modal, Form } from "react-bootstrap";

import { addExperienceAction } from "../../redux/actions";

const ExperienceModal = () => {
  //this is for the modal
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  //this is for the checkbox
  // const [checkedInput, setCheckedInput] = useState("");

  //this is for the end date experience inputs
  const [disabledInput, setDisabledInput] = useState("");

  const userId = useSelector((state) => state.myProfile.detailsData._id);

  const [day, setDay] = useState("01");
  const [checked, setChecked] = useState(false);

  //this is the template for adding a new experience
  //the end/startMonth/Year is because we have to send something like "2022-12-01" when adding
  //a new experience and we only have 2 input fields(for month and year)
  const [experience, setExperience] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
    startYear: "",
    endYear: "",
    startMonth: "",
    endMonth: "",
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //changes the value of the inputs
  const onChangeHandler = (value, fieldToSet) => {
    // setExperience((currentState) => ({ ...currentState, [fieldToSet]: value }));

    setExperience({
      ...experience,
      [fieldToSet]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let randomDay = Math.floor(Math.random() * 28);
    if (randomDay < 10) {
      setDay(`0${randomDay}`);
    } else {
      setDay(randomDay);
    }

    //this is the newExperience which wwe will send to the API
    let newExperience = {
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

    console.log("new experience", newExperience);

    //fetch function with POST method
    dispatch(addExperienceAction(newExperience, userId));

    //we make the experience template empty again for the next exp we want to add
    setExperience({
      role: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      area: "",
      startYear: "",
      endYear: "",
      startMonth: "",
      endMonth: "",
    });
    handleClose();
  };

  //if the checkbox is checked, than disable the end date inputs
  //and if the checkbox is not checked, than enable the end date inputs
  //it is because the endDate can be null, and if this is null
  //this means that the checkbox is checked(still working at this role) and
  //we don't have an end date; I will put it with "null" in the POST

  return (
    <>
      <div
        className="d-flex mb-1 add-position-experience-effect-on-hover"
        onClick={handleShow}
      >
        <div className="mr-2">
          <Icon.BriefcaseFill />
        </div>
        <div>Add position</div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                  onChange={(e) => onChangeHandler(e.target.value, "startYear")}
                ></Form.Control>
              </div>
            </Form.Group>
            <Form.Group className="d-flex flex-column ">
              <Form.Label>End date</Form.Label>
              <div className="d-flex flex-row justify-content-between">
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
                  onChange={(e) => onChangeHandler(e.target.value, "endYear")}
                ></Form.Control>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={experience.description}
                onChange={(e) => onChangeHandler(e.target.value, "description")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="saveButtonExperiencesModal"
            onClick={onSubmitHandler}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExperienceModal;
