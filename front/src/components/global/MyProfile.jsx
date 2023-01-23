import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SideComponentsMyProfile from "../sidebar/SideComponentsMyProfile";
import LargeFooter from "./LargeFooter";
import ProfilePageCenter from "../center/ProfilePageCenter";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfileDetailsAction } from "../../redux/actions";
import { useEffect } from "react";

export default function MyProfile() {
  let details = useSelector((state) => state.myProfile.detailsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMyProfileDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Row>
          {details.length !== 0 && (
            <Col lg={9}>
              <ProfilePageCenter profileDetails={details} />
            </Col>
          )}
          <Col lg={3} className=" mt-3 p-0 ">
            {" "}
            <SideComponentsMyProfile />
          </Col>
        </Row>
      </Container>
      <LargeFooter />
    </>
  );
}
