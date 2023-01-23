import { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { ChevronDown, ChevronUp, Plus } from "react-bootstrap-icons";

const FeedLeftAccordeon = () => {
  const [isCollapsed1, setIsCollapsed1] = useState(false);
  const [isCollapsed2, setIsCollapsed2] = useState(false);

  return (
    <div
      className="bg-white mt-2"
      style={{
        borderRadius: "10px",
        border: "1px solid lightgrey",
        overflow: "hidden",
      }}
    >
      <Accordion defaultActiveKey="0">
        <Card className="border-0">
          <Accordion.Toggle
            eventKey="0"
            style={{
              backgroundColor: "white",
              padding: "0",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "6px",
              fontSize: "12px",
            }}
            onClick={() =>
              isCollapsed1 ? setIsCollapsed1(false) : setIsCollapsed1(true)
            }
            className="border-0"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>Recent</div>
              <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
                {isCollapsed1 ? (
                  <ChevronDown
                    style={{ fontSize: "16px" }}
                    className="chevronHover"
                  />
                ) : (
                  <ChevronUp
                    style={{ fontSize: "16px" }}
                    className="chevronHover"
                  />
                )}
              </div>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body className="p-0">
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  jobpostings
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  jobcareers
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  careers
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  motivation
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  jobinterviews
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="border-0">
          <Accordion.Toggle
            eventKey="1"
            style={{
              backgroundColor: "white",
              padding: "0",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: isCollapsed1 ? "6px" : "20px",
              fontSize: "12px",
            }}
            className="border-0"
          >
            <div className="d-flex justify-content-between align-items-center text-primary font-weight-bold">
              <div>Groups</div>
            </div>
          </Accordion.Toggle>
          <Accordion.Toggle
            eventKey="2"
            style={{
              backgroundColor: "white",
              padding: "0",
              paddingLeft: "12px",
              paddingRight: "12px",
              paddingTop: "6px",
              fontSize: "12px",
            }}
            className="border-0"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-primary font-weight-bold">Events</div>
              <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
                <Plus style={{ fontSize: "25px" }} className="chevronHover" />
              </div>
            </div>
          </Accordion.Toggle>
          <Accordion.Toggle
            eventKey="3"
            style={{
              backgroundColor: "white",
              padding: "0",
              paddingLeft: "12px",
              paddingRight: "12px",
              fontSize: "12px",
            }}
            onClick={() =>
              isCollapsed2 ? setIsCollapsed2(false) : setIsCollapsed2(true)
            }
            className="border-0"
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="text-primary font-weight-bold">
                Followed Hashtags
              </div>
              <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
                {isCollapsed2 ? (
                  <ChevronUp
                    style={{ fontSize: "16px" }}
                    className="chevronHover"
                  />
                ) : (
                  <ChevronDown
                    style={{ fontSize: "16px" }}
                    className="chevronHover"
                  />
                )}
              </div>
            </div>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body className="p-0">
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  jobpostings
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  jobcareers
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  careers
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  motivation
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  jobinterviews
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  personaldevelopment
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  innovation
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  startups
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div className="font-weight-bold" style={{ fontSize: "18px" }}>
                  #
                </div>
                <div
                  className="p-feed-left"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  humanresources
                </div>
              </div>
              <div className="d-flex align-items-center text-secondary p-feed-x hoverGreyBg">
                <div
                  className="font-weight-bold invisible"
                  style={{ fontSize: "18px" }}
                >
                  #
                </div>
                <div
                  className="p-feed-left pt-2 mb-2"
                  style={{ fontSize: "12px", fontWeight: "500" }}
                >
                  See all
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
          <div
            style={{
              backgroundColor: "white",
              padding: "0",
              paddingLeft: "12px",
              paddingRight: "12px",
              fontSize: "12px",
              width: "100%",
            }}
            className="border-top border-right-0 border-left-0 border-bottom-0 hoverGreyBg"
          >
            <div className="d-flex justify-content-center align-items-center my-3">
              <div
                className="text-secondary font-weight-bold"
                style={{ fontSize: "14px" }}
              >
                Discover more
              </div>
            </div>
          </div>
        </Card>
      </Accordion>
    </div>
  );
};

export default FeedLeftAccordeon;
