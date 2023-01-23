import { Col, Row } from "react-bootstrap";
import { Dot, Linkedin, Pencil, XLg } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

import EditAddProfileSectionModal from "./EditAddProfileSectionModal";
import EditContactInfoModal from "./EditContactInfoModal";
import EditUserDetailsModal from "./EditUserDetailsModal";
import MoreDropDownButton from "./MoreDropdownButton";
import OpenToDropDownButton from "./OpenToDropdownButton";
import ProfileImageModal from "./ProfileImageModal";

const UserDetails = ({ profileData }) => {
  let isFetched = useSelector((state) => state.myProfile.isFetched);

  let pathname = window.location.pathname;

  return (
    <Row className="mt-3">
      {isFetched ? (
        <Col className="firstComponent">
          <div
            className="headerImageDiv"
            style={{ borderRadius: "10px 10px 0 0" }}
          >
            <Row className="justify-content-between">
              {/* User profile Image */}
              <ProfileImageModal profileData={profileData} />

              {/* Edit Button User profile Header */}
              <div
                className={
                  pathname === "/me"
                    ? "editButtonDiv d-flex justify-content-center align-items-center"
                    : "d-none"
                }
              >
                {pathname === "/me" && (
                  <Pencil
                    className="text-dark"
                    style={{ fontSize: "18px" }}
                    // className="text-dark"
                    // style={{ fontSize: "18px" }}
                  />
                )}
              </div>
            </Row>
          </div>
          {/* User Info Section*/}
          <div className="bg-white" style={{ borderRadius: "0 0 10px 10px" }}>
            {/* User Info Edit Button */}
            <Row className="justify-content-end">
              <div className="d-flex align-items-center cursor-on-hover">
                <div className="d-flexjustify-content-center align-items-center pt-3 mr-2">
                  {pathname === "/me" ? (
                    <Linkedin fontSize={"20px"} style={{ color: "#aa7520" }} />
                  ) : (
                    <></>
                  )}
                </div>

                <EditUserDetailsModal />
              </div>
            </Row>

            {/* User Info Content */}
            <Row>
              <Col>
                <div className="col-6 d-flex flex-column align-items-start pb-2 px-4 userInfoDiv ">
                  <h4>
                    {profileData.name} {profileData.surname}
                  </h4>

                  <h6>{profileData.title}</h6>
                  <div className="d-flex align-items-center">
                    <p className="text-secondary my-1">
                      {profileData.area} <Dot />{" "}
                    </p>
                    <div
                      className="text-primary"
                      style={{ fontSize: "0.8em", cursor: "pointer" }}
                    >
                      <EditContactInfoModal />
                    </div>
                  </div>
                  <a href="/">
                    <p>500+ connections</p>
                  </a>

                  {/* Section 3 Links Pills */}
                  <div
                    className={
                      pathname === "/me"
                        ? "col d-flex justify-content-between px-0 my-2"
                        : "col d-flex justify-content-start px-0 my-2"
                    }
                  >
                    <OpenToDropDownButton />
                    <EditAddProfileSectionModal />
                    <MoreDropDownButton />
                  </div>
                </div>
              </Col>
            </Row>

            {/* Open to work section */}
            <Row
              className={
                pathname === "/me"
                  ? "justify-content-between mx-4 pb-4 flex-nowrap"
                  : "d-none"
              }
            >
              {/* Left side */}
              <div className="col-6 d-flex openToWorkDiv px-2 py-2 mr-1">
                <div className="col-11  d-flex flex-column px-0">
                  <p className=" d-flex mb-0 openToWorkParagraph">
                    Open to work
                  </p>

                  <p className="d-flex mb-0 titleParagraph">
                    Frontend Developer, Full Stack Developer
                  </p>
                  <a href="/" className="d-flex seeAllDetailsAnchor">
                    See all details
                  </a>
                </div>
                <div className="col-1 p-0">
                  <div className="iconsOpenToWorkSection">
                    <Pencil />
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div
                className={
                  pathname === "/me"
                    ? "col-6 d-flex shareHiringDiv px-2 py-2 ml-1"
                    : "d-none"
                }
              >
                <div className="col-11  d-flex flex-column px-0">
                  <p className=" d-flex mb-0 openToWorkParagraph">
                    Share that you're hiring and attract qualified candidates
                  </p>

                  <a href="/" className="d-flex seeAllDetailsAnchor">
                    See all details
                  </a>
                </div>
                <div className="col-1 p-0">
                  <div className="iconsOpenToWorkSection">
                    <XLg />
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </Col>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default UserDetails;
