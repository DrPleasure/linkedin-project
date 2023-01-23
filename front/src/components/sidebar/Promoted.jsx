import React from "react";
import { Image } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import { SlArrowRight } from "react-icons/sl";
import logoOne from "../../assets/v-team-logo.png";
export default function Promoted() {
  return (
    <div className=" border side-component-border mt-2 bg-white">
      <p className="d-flex justify-content-between mt-1 mb-0">
        <span className="ml-3"> Promoted</span>
        <span className="mr-3">
          <BsThreeDots />
        </span>
      </p>
      <div className="d-flex ml-3 mr-3 align-items-center">
        <div className="promoted-logo-container">
          <Image src={logoOne} alt="verizon logo" className="promoted-logo" />
        </div>
        <div className="ml-2">
          <span className="promoted-text-header text-left">
            Dreamers and doers wanted
          </span>
          <p className="promoted-text-content">
            Drive forward your career and the world forward. Join the V team
            today
          </p>
        </div>
        <span>
          <SlArrowRight />
        </span>
      </div>
    </div>
  );
}
