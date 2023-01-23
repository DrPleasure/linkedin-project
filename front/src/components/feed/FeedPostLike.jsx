import React from "react"
import { BsHandThumbsUp } from "react-icons/bs"
import { FaRegCommentDots } from "react-icons/fa"
import { BiRepost } from "react-icons/bi"
import { RiSendPlaneFill } from "react-icons/ri"

export default function FeedPostLike() {
  return (
    <>
      <div
        id="like-section-wrapper"
        className="small-header-text border-top pt-1 pb-0 mr-2 ml-2"
      >
        <div className="start-a-post-icon-text gray-hover">
          <BsHandThumbsUp style={{ fontSize: "20px" }} />

          <span>Like</span>
        </div>
        <div className="start-a-post-icon-text gray-hover ">
          <FaRegCommentDots style={{ fontSize: "20px" }} />
          <span>Comment</span>
        </div>
        <div className="start-a-post-icon-text gray-hover">
          <BiRepost style={{ fontSize: "20px" }} />
          <span>Repost</span>
        </div>
        <div className="start-a-post-icon-text gray-hover">
          <RiSendPlaneFill style={{ fontSize: "20px" }} />
          <span>Send</span>
        </div>
      </div>
    </>
  )
}
