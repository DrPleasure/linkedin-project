import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import placeholder from "../../assets/v-team-logo.png";
import { Modal, Form, Button } from "react-bootstrap";
import {
  editMyFeedPostAction,
  editShowToggleAction,
  getFeedPostsAction,
  hideEditPostModalAction,
  updateSelectedFeedPost,
} from "../../redux/actions";
import { AiFillCaretDown } from "react-icons/ai";
import { ImEarth } from "react-icons/im";

export default function ModalEditPost() {
  const dispatch = useDispatch();
  const showEditModal = useSelector(
    (state) => state.editPostModal.showEditModal
  );
  let details = useSelector((state) => state.myProfile.detailsData);
  let isFetched = useSelector((state) => state.myProfile.isFetched);

  const currentText = useSelector((state) => state.editThisPost.selectedPost);
  let textToEdit = currentText.text;
  const postId = currentText._id;

  // Uploading image for POST
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const onChangeHandler = (value, fieldToSet) => {
    setEditFeedPost({
      ...editFeedPost,
      [fieldToSet]: value,
    });
  };
  const [editFeedPost, setEditFeedPost] = useState({
    text: textToEdit,
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(editFeedPost.text);
    dispatch(hideEditPostModalAction());
    dispatch(editMyFeedPostAction(editFeedPost, postId));
    dispatch(updateSelectedFeedPost(editFeedPost));
    dispatch(editShowToggleAction());
    dispatch(getFeedPostsAction());

    if (imageUploaded === true) {
      submitFileData();
      setImageUploaded(false);
    }
  };

  const submitFileData = async () => {
    const formData = new FormData();

    formData.append("post", image);

    const optionsPost = {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzk2ZjAxM2M5NmRmYjAwMTUyMWE1YmEiLCJpYXQiOjE2NzA4MzYyNDMsImV4cCI6MTY3MjA0NTg0M30.y7kED45MhN6V7jWF7PwyZ4DryRe6OJ6b9-so68M-zaE",
      },
    };

    try {
      let res = await fetch(
        `https://striveschool-api.herokuapp.com/api/posts/${postId}`,
        optionsPost
      );
      console.log("sucessfully updated " + res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={showEditModal}
      onHide={() => dispatch(hideEditPostModalAction())}
    >
      <Modal.Header closeButton>
        <h5 className="font-weight-light ml-1 mb-0">Edit your post</h5>
      </Modal.Header>
      <div className="p-feed ml-2 d-flex">
        <div className="border recommended-user-image">
          <img src={isFetched ? details.image : placeholder} alt="avatar" />
        </div>
        <div>
          <div className="small-header-text font-weight-bold">
            Alexander Spomer
          </div>
          <div
            id="select-viewing-options"
            className="font-weight-light recommended-user-job-description-text gray-hover"
          >
            <ImEarth />
            <div className="d-flex align-items-center"> Anyone</div>
            <AiFillCaretDown />
          </div>
        </div>
      </div>
      <div id="feed-modal-form">
        <Form
          onSubmit={onSubmitHandler}
          className="p-feed-left p-feed-right ml-2 mr-2"
          style={{ color: "grey", height: "30vh" }}
        >
          <Form.Group className="mb-3 " controlId="formPostText">
            <Form.Control
              className="border-0"
              as="textarea"
              placeholder={textToEdit}
              value={editFeedPost.text}
              rows={5}
              onChange={(e) => onChangeHandler(e.target.value, "text")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload your Image</Form.Label>
            <Form.File
              onChange={(e) => {
                setImage(e.target.files[0]);
                setImageUploaded(true);
              }}
              name={"post"}
            />
          </Form.Group>
        </Form>
      </div>
      <Modal.Footer>
        <Button variant="primary" onClick={onSubmitHandler}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
