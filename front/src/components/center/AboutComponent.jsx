import { Row } from "react-bootstrap";
import EditAboutModal from "./EditAboutModal";

const AboutComponent = ({ profileData }) => {
  return (
    <Row className="my-2">
      <div className="col about-container-design p-4 normal-cursor-on-hover">
        <div className="d-flex justify-content-between">
          <h5 className="text-left mb-0 font-weight-bold">About</h5>
          <EditAboutModal />
        </div>
        <div className="text-left mt-3">{profileData.bio}</div>
      </div>
    </Row>
  );
};

export default AboutComponent;
