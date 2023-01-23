import { ListGroup } from "react-bootstrap";
import moment from "moment";
import EditSingleExperienceModal from "./EditSingleExperienceModal";

const SingleExperience = ({ exp }) => {
  return (
    <div className="d-flex align-items-start">
      <div
        className="d-flex justify-content-center align-items center rounded-circle mr-3 mt-3"
        style={{
          overflow: "hidden",
          width: "50px",
          aspectRatio: "1/1",
          objectFit: "cover",
        }}
      >
        <img
          src={exp.image ? exp.image : "https://placekitten.com/300/300"}
          style={{ height: "100%" }}
          alt="company"
        />
      </div>
      <div className="col border-top px-0 d-flex justify-content-between">
        <ListGroup.Item className="px-0 border-0">
          <h6 className="font-weight-bold">{exp.role}</h6>
          <div>{exp.company}</div>
          <div className="light-grey-color">
            {exp.endDate !== null
              ? `${moment(exp.startDate).format("MMMM YYYY")} - ${moment(
                  exp.endDate
                ).format("MMMM YYYY")}`
              : `${moment(exp.startDate).format("MMMM YYYY")} - Present`}
          </div>
          <div className="light-grey-color">{exp.area}</div>
        </ListGroup.Item>
        <div className="d-flex justify-content-center align-items-center editButtonIconDiv mt-2 mr-2">
          <EditSingleExperienceModal exp={exp} />
        </div>
      </div>
    </div>
  );
};

export default SingleExperience;
