import React, { useState } from "react"
import { BsHandThumbsUp } from "react-icons/bs"
import { FaRegCommentDots } from "react-icons/fa"
import { BiRepost } from "react-icons/bi"
import { RiSendPlaneFill } from "react-icons/ri"

export default function FeedPostLike({ props }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <div
        id="like-section-wrapper"
        className="small-header-text border-top pt-1 pb-0 mr-2 ml-2"
      >
        <div className="start-a-post-icon-text gray-hover">
          <BsHandThumbsUp style={{ fontSize: "20px" }} />

          <span>{props.likes.length} Like</span>
        </div>
        <div className="start-a-post-icon-text gray-hover " onClick={() => setShowComments(!showComments)}>
          <FaRegCommentDots style={{ fontSize: "20px" }} />
          <span>{props.comments.length} Comment</span>
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
      {showComments && 
        <div>
          {props.map((comment, index) => <div key={index}>{comment.text}</div>)}
        </div>
      }
    </>
  )
}
