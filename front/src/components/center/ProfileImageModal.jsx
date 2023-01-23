import { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  CameraFill,
  EyeFill,
  Image,
  Pencil,
  TrashFill,
} from "react-bootstrap-icons";

function ProfileImageModal({ profileData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="profileImageDiv d-flex justify-content-center align-items-center"
        onClick={handleShow}
      >
        <img
          src={profileData.image}
          alt="User profile img"
          className="profileImage"
        />
      </div>

      <Modal show={show} onHide={handleClose} className="text-white">
        <Modal.Header
          closeButton
          variant="white"
          style={{
            backgroundColor: "#1D2226",
          }}
          className="border-0"
        >
          <Modal.Title>Profile photo</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1D2226" }}>
          <div className="d-flex justify-content-center align-items-center">
            <div
              className="d-flex justify-content-center align-items-center rounded-circle"
              style={{
                height: "280px",
                width: "280px",
                overflow: "hidden",
              }}
            >
              <img
                src={profileData.image}
                alt="avatar"
                style={{ height: "100%" }}
              />
            </div>
          </div>
          <div className="d-flex">
            {profileData._id === "6396f013c96dfb001521a5ba" ? (
              <div className="hoverWhiteBorder d-flex justify-content-center align-items-center border px-3 py-1 rounded-pill text-white font-weight-bold">
                <EyeFill className="mr-3" /> Anyone
              </div>
            ) : (
              <div className="p-2" style={{ height: "30px" }}></div>
            )}
          </div>
        </Modal.Body>
        {profileData._id === "6396f013c96dfb001521a5ba" ? (
          <Modal.Footer
            style={{ backgroundColor: "#1D2226" }}
            className="justify-content-between p-0"
          >
            <div className="d-flex align-items-center">
              <div className="mx-4 hoverLightGreyBG p-2">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <Pencil style={{ fontSize: "20px" }} />
                </div>
                <div>Edit</div>
              </div>
              <div className="mr-4 hoverLightGreyBG p-2">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <CameraFill style={{ fontSize: "20px" }} />
                </div>
                <div>Add photo</div>
              </div>
              <div className="mr-4 hoverLightGreyBG p-2">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <Image style={{ fontSize: "20px" }} />
                </div>
                <div>Frames</div>
              </div>
            </div>
            <div>
              <div className="mr-4 hoverLightGreyBG p-2">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <TrashFill style={{ fontSize: "20px" }} />
                </div>
                <div>Add photo</div>
              </div>
            </div>
          </Modal.Footer>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}

export default ProfileImageModal;
