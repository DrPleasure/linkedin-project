import React from "react";
import placeholder from "../../assets/v-team-logo.png";
import { MdPhotoSizeSelectActual, MdOutlineArticle } from "react-icons/md";
import { BsFillPlayBtnFill, BsBriefcaseFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { showAddPostModalAction } from "../../redux/actions";
import WritePostModal from "./WritePostModal";

export default function StartAPost() {
  const showModal = useSelector((state) => state.showPostModal.show);
  let details = useSelector((state) => state.myProfile.detailsData);
  let isFetched = useSelector((state) => state.myProfile.isFetched);
  const dispatch = useDispatch();

  return (
    <>
      <div id="feed-start-a-post-container" className="border p-feed">
        <div id="start-a-post-top">
          <div
            className="border recommended-user-image mr-1"
            style={{ objectFit: "cover" }}
          >
            <img
              src={isFetched ? details.image : placeholder}
              alt="Avatar"
              style={{ height: "100%" }}
            />
          </div>
          <div
            id="start-a-post"
            className="gray-hover small-header-text"
            onClick={() => dispatch(showAddPostModalAction())}
          >
            Start a post
          </div>
        </div>
        <div id="start-a-post-lower" className="small-header-text">
          <div className="start-a-post-icon-text gray-hover">
            <MdPhotoSizeSelectActual
              className="text-primary"
              style={{ fontSize: "20px" }}
            />

            <span>Photo</span>
          </div>
          <div className="start-a-post-icon-text gray-hover ">
            <BsFillPlayBtnFill
              className="text-success"
              style={{ fontSize: "20px" }}
            />
            <span>Video</span>
          </div>
          <div className="start-a-post-icon-text gray-hover">
            <BsBriefcaseFill className="indigo" style={{ fontSize: "20px" }} />
            <span>Job</span>
          </div>
          <div className="start-a-post-icon-text gray-hover">
            <MdOutlineArticle className="orange" style={{ fontSize: "20px" }} />
            <span>Write Article</span>
          </div>
        </div>
      </div>
      {showModal === true ? <WritePostModal /> : null}
    </>
  );
}
