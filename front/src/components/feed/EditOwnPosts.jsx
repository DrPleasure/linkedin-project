import React from "react"
import {
  BsStar,
  BsBookmark,
  BsPencil,
  BsTrashFill,
  BsEyeFill
} from "react-icons/bs"
import { FaRegCommentDots } from "react-icons/fa"
import { IoIosLink } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import {
  showDeleteModalAction,
  showEditPostModalAction
} from "../../redux/actions"
import ModalDeletePost from "./ModalDeletePost"
import ModalEditPost from "./ModalEditPost"

export default function EditOwnPosts({ id }) {
  const dispatch = useDispatch()
  const showEditModal = useSelector(
    (state) => state.editPostModal.showEditModal
  )
  const editOptions = useSelector((state) => state.editPostModal.openDropdown)
  console.log("edit Options in edit post popup", editOptions)

  const showDeleteModal = useSelector(
    (state) => state.editPostModal.deleteModal
  )
  const onEditClickHandler = () => {
    dispatch(showEditPostModalAction())
    console.log("edit button clicked")
  }

  const onDeleteClickHandler = () => {
    dispatch(showDeleteModalAction())
    console.log("delete button clicked")
  }

  return (
    <div className="editing-feed-post-wrapper border  small-header-text bolder">
      <div className="gray-hover p-feed d-flex">
        <div className="mr-2 d-flex align-items-center">
          <BsStar />
        </div>
        Feature on top of profile
      </div>
      <div className="gray-hover p-feed d-flex ">
        <div className="mr-2 d-flex align-items-center">
          <BsBookmark />
        </div>
        Save
      </div>
      <div className="gray-hover p-feed d-flex">
        <div className="mr-2 d-flex align-items-center">
          <IoIosLink />
        </div>
        Copy link to post
      </div>
      <div className="gray-hover p-feed d-flex">
        <div className="mr-2 d-flex align-items-center">
          <BsStar />
        </div>
        Embed this post
      </div>
      <div className="gray-hover p-feed d-flex" onClick={onEditClickHandler}>
        <div className="mr-2 d-flex align-items-center">
          <BsPencil />
        </div>
        Edit post
      </div>
      <div className="gray-hover p-feed d-flex" onClick={onDeleteClickHandler}>
        <div className="mr-2 d-flex align-items-center">
          <BsTrashFill />
        </div>
        Delete post
      </div>
      <div className="gray-hover p-feed d-flex">
        <div className="mr-2 d-flex align-items-center">
          <FaRegCommentDots />
        </div>
        Who can comment on this
      </div>
      <div className="gray-hover p-feed d-flex">
        <div className="mr-2 d-flex align-items-center">
          <BsEyeFill />
        </div>
        Who can see this post?
      </div>
      {showEditModal && <ModalEditPost />}
      {showDeleteModal && <ModalDeletePost />}
    </div>
  )
}
