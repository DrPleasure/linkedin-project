import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { BsQuestionCircleFill } from "react-icons/bs";
import { RiSettings3Fill } from "react-icons/ri";
import LinkedinLogo from "../../assets/linkedin-logo-png-transparent.png";
export default function LargeFooter() {
  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col lg={12}>
            <div className="li-logo-container">
              <Image src={LinkedinLogo} className="li-logo" />
            </div>
          </Col>
          <Col lg={2}>
            <div>
              <ul className="footer-text">
                <li>About</li>
                <li>Community Guidelines</li>
                <li>Privacy & Terms</li>
                <li>Sales Solutions</li>
                <li>Safety Center</li>
              </ul>
            </div>
          </Col>
          <Col lg={2}>
            {" "}
            <div>
              <ul className="footer-text">
                <li>Accessibility</li>
                <li>Careers</li>
                <li>Ad Choices</li>
                <li>Mobile</li>
              </ul>
            </div>
          </Col>
          <Col lg={2}>
            {" "}
            <div>
              <ul className="footer-text">
                <li>Talent Solutions </li>
                <li>Marketing Slutions</li>
                <li>Advertising</li>
                <li>Small Business</li>
              </ul>
            </div>
          </Col>
          <Col lg={3}>
            <div className="d-flex footer-text mb-3">
              <div className="mr-2">
                <BsQuestionCircleFill />
              </div>
              <div className="d-flex flex-column">
                <span>Question?</span>
                <span>Visit our Help Center</span>
              </div>
            </div>
            <div className="d-flex footer-text">
              <div className="mr-2">
                <RiSettings3Fill />
              </div>
              <div className="d-flex flex-column">
                <span>Manage your account and privacy</span>
                <span>Go to your settings</span>
              </div>
            </div>
          </Col>
          <Col lg={3}>
            <div className="d-flex flex-column">
              <label className="footer-text">Select Language</label>
              <select id="language" name="language">
                <option value="English">English (English)</option>
                <option value="Italian">Italian</option>
                <option value="German">German</option>
                <option value="Romaian">Romaian</option>
                <option value="Russian">Russian</option>
                <option value="Arabic">Arabic</option>
                <option value="Swahili">Swahili</option>
              </select>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
