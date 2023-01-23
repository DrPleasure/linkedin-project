import UserDetails from "../center/UserDetails";
import { Container } from "react-bootstrap";
import AboutComponent from "../center/AboutComponent";
import AnalyticsComponent from "../center/AnalyticsComponent";
import ResourcesComponent from "../center/ResourcesComponent";
import ExperienceComponent from "../center/ExperienceComponent";
import EducationComponent from "../center/EducationComponent";
import Languages from "../center/Languages";
import Activity from "../center/Activity";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUserAction } from "../../redux/actions";
import { useDispatch } from "react-redux";

const RandomUserProfilePage = ({ randomUserDetails }) => {
  const dispatch = useDispatch();

  const params = useParams();
  const currentUserId = params.id;
  useEffect(() => {
    dispatch(getCurrentUserAction(currentUserId));
  }, []);

  return (
    <Container className="profilePageCenterContainer px-0">
      <UserDetails profileData={randomUserDetails} />
      <AboutComponent profileData={randomUserDetails} />
      <Activity profileData={randomUserDetails} />
      <ExperienceComponent profileData={randomUserDetails} />
      <AnalyticsComponent profileData={randomUserDetails} />
      <ResourcesComponent profileData={randomUserDetails} />
      <EducationComponent profileData={randomUserDetails} />
      <Languages profileData={randomUserDetails} />
    </Container>
  );
};

export default RandomUserProfilePage;
