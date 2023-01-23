import React, { useEffect, useState } from "react"
import { Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import {
  BsThreeDots,
  BsFillArrowDownCircleFill,
  BsThreeDotsVertical
} from "react-icons/bs"

import {
  editShowToggleAction,
  getFeedPostsAction,
  saveSelectedFeedPostAction,
  myPostUnClickedAction
} from "../../redux/actions"

import FeedPostLike from "./FeedPostLike"
import EditOwnPosts from "./EditOwnPosts"

export default function MainFeedSectionWithPosts() {
  // const [showEdit, setShowEdit] = useState(false)
  const editOptions = useSelector((state) => state.editPostModal.openDropdown)

  const allFeedPosts = useSelector((state) => state.feedPosts.feedPostArray)
  //   reversing the array so we get the newest posts

  const allLatestPosts = allFeedPosts.slice(0).reverse()

  const longerPosts = allLatestPosts.filter((post) => post.text.length > 10)

  const userPresent = longerPosts.filter((post) => {
    return post.user !== null
  })

  const [length, setLength] = useState(25)
  const latestPostSlice = userPresent.slice(0, length)

  const increaseCurrentLength = (e) => {
    const increment = 50
    setLength(length + increment)

    if (
      length.length >= userPresent.length ||
      userPresent.length - length.length < increment
    ) {
      alert("you have read all the posts!")
    }
  }

  const userId = useSelector((state) => state.myProfile.detailsData._id)
  const savedPost = useSelector((state) => state.editThisPost.selectedPost)
  const dispatch = useDispatch()

  const myPostClickedHandler = (post) => {
    console.log("my post is clicked")
    dispatch(editShowToggleAction())
    console.log("saved post----------", post)
    // use this post when editing
    dispatch(saveSelectedFeedPostAction(post))
    console.log("edit Options click", editOptions)
  }

  //unclick the dots button

  const myPostUnClickedHandler = (post) => {
    console.log("my post is UNclicked")
    dispatch(editShowToggleAction())
    dispatch(myPostUnClickedAction(post))
    console.log("unsaved post----------", post)
    console.log("edit Options unclick", editOptions)
  }

  // back to top button

  const backToTop = () => {
    window.scrollTo({ top: 0, behaviour: "smooth" })
  }

  useEffect(() => {
    dispatch(getFeedPostsAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {allFeedPosts && (
        <>
          <div id="feed-main-container">
            {latestPostSlice.map((post) => (
              <div key={post._id}>
                {" "}
                {post.user._id && (
                  <div key={post._id} className="feed-post border p-feed pb-1">
                    {post.user._id === userId ? (
                      <>
                        <div className="d-flex justify-content-between mr-2 ml-2">
                          <div></div>
                          {editOptions ? (
                            editOptions &&
                            (savedPost._id === post._id ? (
                              <div
                                className="post-dots  gray-hover"
                                onClick={myPostUnClickedHandler.bind(
                                  null,
                                  post
                                )}
                              >
                                <BsThreeDotsVertical />
                              </div>
                            ) : (
                              <div
                                className="post-dots  gray-hover"
                                onClick={myPostClickedHandler.bind(null, post)}
                              >
                                <BsThreeDots />
                              </div>
                            ))
                          ) : (
                            <div
                              className="post-dots  gray-hover"
                              onClick={myPostClickedHandler.bind(null, post)}
                            >
                              <BsThreeDots />
                            </div>
                          )}
                        </div>
                        {editOptions &&
                          (savedPost._id === post._id ? (
                            <EditOwnPosts id={post._id} />
                          ) : null)}
                      </>
                    ) : (
                      <div className="d-flex justify-content-between mr-2 ml-2">
                        <div></div>
                        <div className="post-dots  gray-hover">
                          <BsThreeDots />
                        </div>
                      </div>
                    )}
                    <div className=" border-top mr-2 ml-2">
                      <div className="mt-3 d-flex ">
                        <div className="border recommended-user-image">
                          <img src={post.user.image} alt="" />
                        </div>{" "}
                        <div className="feed-text-user-wrapper">
                          <div className="mb-0 small-header-text bolder feed-text-name">
                            <span>{post.user.name} </span>
                            <span>{post.user.surname}</span>
                          </div>
                          <div className="mb-1 small-height">
                            <span className="feed-post-tiny-text truncate-text">
                              {post.user.title}
                            </span>
                          </div>
                          {/* <div className="mb-1 small-height">
                            <span className="feed-post-tiny-text  ">
                              {post.user.createdAt}
                            </span>
                          </div> */}
                        </div>
                      </div>
                      <p className="mt-3 mb-3"> {post.text}</p>

                      {post.image && (
                        <div
                          className="post-image-wrapper p-1"
                          style={{
                            width: "100%",
                            height: "300px",
                            overflow: "hidden",
                            objectFit: "cover"
                          }}
                        >
                          <Image
                            src={post.image}
                            alt="user image"
                            className="feed-post-image"
                          />
                        </div>
                      )}
                    </div>

                    <FeedPostLike />
                  </div>
                )}
              </div>
            ))}
            <div className="d-flex justify-content-center m-5">
              <BsFillArrowDownCircleFill
                onClick={increaseCurrentLength}
                className="text-primary"
                style={{ fontSize: "30px", cursor: "pointer" }}
              />
            </div>
            {length > 25 && (
              <div
                onClick={backToTop}
                id="back-to-top"
                className="gray-hover font-weight-light"
              >
                {" "}
                back to top
              </div>
            )}
          </div>
        </>
      )}
    </>
  )
}
