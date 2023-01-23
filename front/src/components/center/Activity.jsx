import { Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";

const Activity = ({ profileData }) => {
  let pathname = window.location.pathname;
  return (
    <Row className="my-2 ">
      <Col className="activityComponent pt-4 flex-nowrap bg-white">
        <Row className="px-4">
          <div className="col-6 d-flex flex-column align-items-start">
            <h5 className="mb-0">
              <b>Aktivity</b>
            </h5>
            <a href="/" className="anchorSmall">
              2,957 Followers
            </a>
            <p className="lightGreyParagraph mt-2 mb-1">
              <b>
                {profileData.name} {profileData.surname}
              </b>{" "}
              has shared this <b>·</b> 1 month
            </p>
            <div className="activityPreviewDiv mb-3">
              <img
                src="https://images.pexels.com/photos/1387037/pexels-photo-1387037.jpeg?cs=srgb&dl=pexels-bayu-jefri-1387037.jpg&fm=jpg"
                alt="preview foto"
                width={"100%"}
                height={"100%"}
              />
            </div>
          </div>
          <div
            className={
              pathname === "/me" ? "col-6 d-flex justify-content-end" : "d-none"
            }
          >
            <div>
              <div className="startAPostDiv d-flex justify-content-center align-items-center rounded-pill">
                <a href="/" className="mb-0 px-3 py-1">
                  Start a post
                </a>
              </div>
            </div>
          </div>
        </Row>
        <Row className="border-top showAllActivityDiv">
          <Col>
            <div className="showAllActivityDiv">
              <h6 className="mt-2 greyTextColor">
                Show all activities <ArrowRight />
              </h6>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Activity;
