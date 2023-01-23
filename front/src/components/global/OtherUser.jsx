import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import RandomUserProfilePage from "../randomUser/RandomUserProfilePage";
import SideComponentsMyProfile from "../sidebar/SideComponentsMyProfile";
import LargeFooter from "./LargeFooter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCurrentUserAction } from "../../redux/actions";

export default function OtherUser() {
  const otherUser = useSelector((state) => state.otherUser.selectedUser);
  let details = useSelector((state) => state.myProfile.detailsData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.otherUser.currentUserDetails);

  const param = useParams();
  const currentUserId = param.id;
  useEffect(() => {
    dispatch(getCurrentUserAction(currentUserId));
  }, []);

  const params = window.location.pathname;

  if (details._id && params === `/profile/${details._id}`) {
    navigate("/me");
  }

  //component that calls the randomUserProfile page when you search someone in the search input
  return (
    <>
      <Container>
        <Row>
          <Col lg={9}>
            {otherUser.length !== 0 && userData.length !== 0 && (
              <RandomUserProfilePage randomUserDetails={userData} />
            )}
          </Col>
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
