import { Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const AnalyticsComponent = ({ profileData }) => {
  return (
    <Row className="my-2">
      <div className="analytics-container-design p-4">
        <h5 className="text-left mb-0 normal-cursor-on-hover font-weight-bold">
          Analytics
        </h5>
        <div className="d-flex mb-2 normal-cursor-on-hover">
          <div className="mr-2">
            <Icon.EyeFill />
          </div>
          <div>Private to you</div>
        </div>
        <div className="d-flex cursor-on-hover">
          <div className="col-4 d-flex px-0">
            <div className="mr-2">
              <Icon.PeopleFill />
            </div>
            <div className="text-left">
              <div className="font-weight-bold">28 profile views</div>
              <div>Discover who's viewed your profile.</div>
            </div>
          </div>
          <div className="col-4 d-flex px-0">
            <div className="mr-2">
              <Icon.Reception3 />
            </div>
            <div className="text-left">
              <div className="font-weight-bold">491 post impressions</div>
              <div>Check out who's engaginng with your posts.</div>
            </div>
          </div>
          <div className="col-4 d-flex px-0">
            <div className="mr-2">
              <Icon.Search />
            </div>
            <div className="text-left">
              <div className="font-weight-bold">27 search appearances</div>
              <div>See how often you appear on search results.</div>
            </div>
          </div>
        </div>
      </div>
    </Row>
  );
};

export default AnalyticsComponent;
