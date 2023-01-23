import React from "react";
// import placeholder from "../../assets/v-team-logo.png";

export default function UserMessages() {
  return (
    <>
      <div className="message-wrapper gray-hover">
        <div className="d-flex align-items-center">
          <div className="border recommended-user-image ml-1">
            <img
              src={"https://random.imagecdn.app/v1/image?width=300&height=300"}
              alt="avatar"
            />
          </div>
          <div className="message">
            <div className="small-header-text">Olaf Glad</div>
            <div className="font-weight-light recommended-user-job-description-text ">
              Olaf: Why am I getting an empty array?
            </div>
          </div>
        </div>
        <div className="font-weight-light recommended-user-job-description-text mr-2 ">
          Dec 17
        </div>
      </div>
      <div className="message-wrapper gray-hover">
        <div className="d-flex align-items-center">
          <div className="border recommended-user-image ml-1">
            <img src={"https://placekitten.com/300/300"} alt="avatar" />
          </div>
          <div className="message ">
            <div className="small-header-text">Akbar Rahimov</div>
            <div className="font-weight-light recommended-user-job-description-text">
              You: Are you still looking for a job?
            </div>
          </div>
        </div>
        <div className="font-weight-light recommended-user-job-description-text mr-2">
          Dec 17
        </div>
      </div>
      <div className="message-wrapper gray-hover">
        <div className="d-flex align-items-center">
          <div className="border recommended-user-image ml-1">
            <img src={"https://picsum.photos/300"} alt="Avatar" />
          </div>
          <div className="message">
            <div className="small-header-text">Abiodun A</div>
            <div className="font-weight-light recommended-user-job-description-text">
              Abiodun: Report your location
            </div>
          </div>
        </div>
        <div className="font-weight-light recommended-user-job-description-text mr-2">
          Dec 17
        </div>
      </div>
    </>
  );
}
