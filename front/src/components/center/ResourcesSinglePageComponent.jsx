import { Container, ListGroup, Badge } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const ResourcesSinglePageComponent = () => {
  return (
    <Container className="profilePageCenterContainer px-0 mt-2">
      {/* <Row> */}
      <div className="resources-container-design p-4">
        <div className="d-flex align-items-center">
          {/* this goes back to the previous page depending not just back to profile page */}
          <Link to={-1} className="text-decoration-none text-secondary">
            <div
              className="d-flex rounded-circle justify-content-center align-items-center mr-2 cursor-on-hover hoverGreyBg"
              style={{ height: "30px", width: "30px", aspectRatio: "1/1" }}
            >
              <Icon.ArrowLeft style={{ fontSize: "20px" }} />
            </div>
          </Link>
          <h5 className=" d-flex justify-content-center align-items-centertext-left mb-0 normal-cursor-on-hover font-weight-bold">
            Resources
          </h5>
        </div>
        <div className="d-flex mb-2 mt-3 normal-cursor-on-hover pl-2">
          <div className="mr-3">
            <Icon.EyeFill />
          </div>
          <div>Private to you</div>
        </div>
        <div className=" pl-2 ">
          <ListGroup variant="flush" className="px-0 text-left">
            <ListGroup.Item className="px-0 d-flex">
              <div className="mr-3">
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
              <div className="mr-3">
                <Icon.PeopleFill />
              </div>
              <div className="cursor-on-hover">
                <div className="font-weight-bold">My Network</div>
                <div>See and manage your connections and interests.</div>
              </div>
            </ListGroup.Item>

            <ListGroup.Item className="px-0 d-flex">
              <div className="mr-3">
                <Icon.PersonFill />
              </div>
              <div className="cursor-on-hover">
                <div className="font-weight-bold">
                  Personal demographic information
                </div>
                <div>Add or manage your information.</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 d-flex">
              <div className="mr-3">
                <Icon.CardChecklist />
              </div>
              <div className="cursor-on-hover">
                <div className="font-weight-bold">Activity</div>
                <div>
                  See what you've shared with your network, such as posts,
                  articles and comments.
                </div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="px-0 d-flex pb-0">
              <div className="mr-3">
                <Icon.BookmarkFill />
              </div>
              <div className="cursor-on-hover">
                <div className="font-weight-bold">My items</div>
                <div>Keep track of your jobs, courses and articles.</div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </div>
      </div>
      {/* </Row> */}
    </Container>
  );
};

export default ResourcesSinglePageComponent;
