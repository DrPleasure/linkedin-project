import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMyFeedPostAction,
  hideDeleteModalAction,
  getFeedPostsAction,
  hideEditPostModalAction,
  editShowToggleAction,
} from "../../redux/actions";

export default function ModalDeletePost() {
  const dispatch = useDispatch();

  const deleteFeedPost = useSelector(
    (state) => state.editThisPost.selectedPost
  );
  const postId = deleteFeedPost._id;

  const onDeleteHandler = () => {
    console.log("sending for deletion");
    dispatch(hideEditPostModalAction());
    dispatch(deleteMyFeedPostAction(deleteFeedPost, postId));
    dispatch(editShowToggleAction());
    dispatch(getFeedPostsAction());
  };

  const showDeleteModal = useSelector(
    (state) => state.editPostModal.deleteModal
  );

  return (
    <Modal
      show={showDeleteModal}
      onHide={() => dispatch(hideDeleteModalAction())}
    >
      <Modal.Header className="border-0" closeButton>
        <h5 className="ml-1 mb-0 d-flex  text-center">
          <div className="d-flex justify-content-center">Delete post?</div>
        </h5>
      </Modal.Header>
      <div className="p-feed m-3 d-flex text-center">
        Are you sure you want to permanently remove this post from LinkedIn?
      </div>
      <div id="feed-modal-form"></div>
      <Modal.Footer>
        <Button
          variant="muted"
          onClick={() => dispatch(hideDeleteModalAction())}
          className="border"
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={onDeleteHandler}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
