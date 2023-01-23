import { Row, ListGroup, Badge } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const ResourcesComponent = ({ profileData }) => {
  const navigate = useNavigate();
  return (
    <Row className="my-2">
      <div className=" col resources-container-design p-4">
        <h5 className="text-left mb-0 normal-cursor-on-hover font-weight-bold">
          Resources
        </h5>
        <div className="d-flex mb-2 normal-cursor-on-hover">
          <div className="mr-2">
            <Icon.EyeFill />
          </div>
          <div>Private to you</div>
        </div>
        <div className=" ">
          <ListGroup variant="flush" className="px-0 text-left">
            <ListGroup.Item className="px-0 d-flex">
              <div className="mr-2 cursor-on-hover">
                <Icon.BroadcastPin />
              </div>
              <div>
                <div className="d-flex cursor-on-hover">
                  <div className="font-weight-bold mr-2">Creator mode</div>
                  <div className="off-badge-resources-comp d-flex align-items-center justify-content-center px-1">
                    <Badge>Off</Badge>
                  </div>
                </div>
                <div className="cursor-on-hover">
                  Get discovered, showcase content on your profile and get
                  access to creator tools
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 d-flex">
              <div className="mr-2">
                <Icon.PeopleFill />
              </div>
              <div className="cursor-on-hover">
                <div className="font-weight-bold">My Network</div>
                <div>See and manage your connections and interests.</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 text-center pb-0">
              <div
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                  navigate("/details/resources");
                }}
              >
                <div className="cursor-on-hover">Show all 5 resources</div>
                <Icon.ArrowRight className="font-weight-bold ml-2 cursor-on-hover" />
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
    </Row>
  );
};

export default ResourcesComponent;
