import React from "react";
import { Container } from "react-bootstrap";
import Activity from "./Activity";
import Languages from "./Languages";
import UserDetails from "./UserDetails";
import AnalyticsComponent from "./AnalyticsComponent";
import ResourcesComponent from "./ResourcesComponent";
import AboutComponent from "./AboutComponent";
import ExperienceComponent from "./ExperienceComponent";
import EducationComponent from "./EducationComponent";

const ProfilePageCenter = ({ profileDetails }) => {
  return (
    <Container className="profilePageCenterContainer px-0">
      <UserDetails profileData={profileDetails} />
      <AnalyticsComponent profileData={profileDetails} />
      <ResourcesComponent profileData={profileDetails} />
      <AboutComponent profileData={profileDetails} />
      <Activity profileData={profileDetails} />
      <ExperienceComponent profileData={profileDetails} />
      <EducationComponent profileData={profileDetails} />
      <Languages profileData={profileDetails} />
    </Container>
  );
};

export default ProfilePageCenter;
