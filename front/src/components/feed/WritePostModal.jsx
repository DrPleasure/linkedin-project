import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  hideAddPostModalAction,
  addingNewFeedPostAction,
  getFeedPostsAction,
} from "../../redux/actions";
import placeholder from "../../assets/v-team-logo.png";
import { AiFillCaretDown } from "react-icons/ai";
import { ImEarth } from "react-icons/im";

export default function WritePostModal() {
  const showModal = useSelector((state) => state.showPostModal.show);
  let details = useSelector((state) => state.myProfile.detailsData);
  let isFetched = useSelector((state) => state.myProfile.isFetched);
  const dispatch = useDispatch();

  const [newFeedPost, setNewFeedPost] = useState({
    text: "",
  });

  // the basic structure of the post
  //   {
  //     "_id": "5d93ac84b86e220017e76ae1", 				// server generated
  //     "text": "this is a post text",  		// the only property you need to send
  //     "username": "admin", 											// server generated
  //     "createdAt": "2019-10-01T19:44:04.496Z", 	// server generated
  //     "updatedAt": "2019-10-01T19:44:04.496Z", 	// server generated
  //     "__v": 0 																	// server generated
  // }
  const onChangeHandler = (value, fieldToSet) => {
    setNewFeedPost({
      ...newFeedPost,
      [fieldToSet]: value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(newFeedPost.text);
    dispatch(hideAddPostModalAction());
    dispatch(addingNewFeedPostAction(newFeedPost));
    dispatch(getFeedPostsAction());
  };

  return (
    <Modal show={showModal} onHide={() => dispatch(hideAddPostModalAction())}>
      <Modal.Header closeButton>
        <h5 className="font-weight-light ml-1 mb-0">Create a post</h5>
      </Modal.Header>
      <div className="p-feed ml-2 d-flex">
        {" "}
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
          style={{ color: "grey", height: "20vh" }}
        >
          <Form.Group className="mb-3 " controlId="formPostText">
            <Form.Control
              className="border-0"
              as="textarea"
              placeholder="What do you want to talk about?"
              value={newFeedPost.text}
              rows={5}
              onChange={(e) => onChangeHandler(e.target.value, "text")}
            />
          </Form.Group>
        </Form>
      </div>
      <Modal.Footer>
        <Button variant="primary" onClick={onSubmitHandler}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
