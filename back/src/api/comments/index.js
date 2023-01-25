import express from "express";
import createHttpError from "http-errors";
import Posts from "../posts/model.js";
import Users from "../users/model.js";
import Comments from "./model.js";
import { checksCommentSchema, triggerBadRequest } from "./validator.js";

const { NotFound } = createHttpError;

const router = express.Router();

// POST
router.post("/:userId/:postId/comments", async (req, res, next) => {
  try {
    const { userId, postId } = req.params;

    const newComment = new Comments(req.body);

    const selectedUser = await Users.findById(userId);

    if (selectedUser) {
      const selectedPost = await Posts.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment._id } },
        { new: true, runValidators: true }
      );

      if (selectedPost) {
        const updatedUser = await Users.findByIdAndUpdate(
          userId,
          { $push: { comments: newComment._id } },
          { new: true, runValidators: true }
        );

        //  const { _id } = await newComment.save();
        const entireNewComment = await newComment.save();
        res.send(entireNewComment);
      } else {
        next(NotFound(`Post with id: ${postId} not found`));
      }
    } else {
      next(
        NotFound(
          `The user with id: ${userId} is not in our linkedin database. Please create a user account in order to be able to create posts & comments`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

// GET - all comments for a specific post
router.get("/:userId/:postId/comments", async (req, res, next) => {
  try {
    const { userId, postId } = req.params;

    const selectedUser = await Users.findById(userId);

    if (selectedUser) {
      const selectedPost = await Posts.findById(postId);
      // const selectedPost = await Posts.find({ _id: postId }, { comments: 1, _id: 0 }).populate("text");
      console.log("all comments from 1 post: selectedPost", selectedPost);

      if (selectedPost) {
        const allCommentsForSelectedPost = selectedPost.comments;
        console.log("allCommentsForSelectedPost", allCommentsForSelectedPost);

        if (allCommentsForSelectedPost.length > 0) {
          const comments = [];
          for (let comm of allCommentsForSelectedPost) {
            console.log(comm.toString());
          }
          res.send({
            message: `You can find all the comments for the post with id: ${postId} below`,
            comments: allCommentsForSelectedPost,
          });
        } else {
          next(NotFound(`The post with id: ${postId} has 0 comments`));
        }
      } else {
        next(NotFound(`The post with id: ${postId} is not in our linkedin database`));
      }
    } else {
      next(NotFound(`The user with id: ${userId} is not in our linkedin database`));
    }
  } catch (error) {
    next(error);
  }
});

// GET - single comment
router.get("/:userId/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const { userId, postId, commentId } = req.params;

    const selectedUser = await Users.findById(userId);

    if (selectedUser) {
      const selectedPost = await Posts.findById(postId);

      if (selectedPost) {
        const selectedPostComments = selectedPost.comments;
        const selectedComment = selectedPostComments.find((comment) => comment._id.toString() === commentId);

        const searchedComment = await Comments.findById(selectedComment, { _id: 0, __v: 0 });

        console.log("selectedComment", searchedComment);
        if (selectedComment) {
          res.send({
            message: `Below you can find the comment with id: ${commentId}:`,
            searchedComment: searchedComment,
          });
        } else {
          next(NotFound(`The comment with id: ${commentId} is not in our linkedin database`));
        }
        console.log("selected post comments: ", selectedPostComments);
      } else {
        next(NotFound(`The post with id: ${postId} is not in our linkedin database`));
      }
    } else {
      next(NotFound(`The user with id: ${userId} is not in our linkedin database`));
    }
  } catch (error) {
    next(error);
  }
});

// PUT - single comment
router.put("/:userId/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const { userId, postId, commentId } = req.params;

    const selectedUser = await Users.findById(userId);

    if (selectedUser) {
      const selectedPost = await Posts.findById(postId);

      if (selectedPost) {
        const selectedPostComments = selectedPost.comments;
        const selectedComment = selectedPostComments.find((comment) => comment._id.toString() === commentId);

        const searchedComment = await Comments.findByIdAndUpdate(selectedComment, req.body, {
          new: true,
          runValidators: true,
        });

        console.log("selectedComment", searchedComment);
        if (searchedComment) {
          res.send({
            message: `Below you can find the comment with id: ${commentId}:`,
            searchedComment: searchedComment,
          });
        } else {
          next(NotFound(`The comment with id: ${commentId} is not in our linkedin database`));
        }
        console.log("selected post comments: ", selectedPostComments);
      } else {
        next(NotFound(`The post with id: ${postId} is not in our linkedin database`));
      }
    } else {
      next(NotFound(`The user with id: ${userId} is not in our linkedin database`));
    }
  } catch (error) {
    next(error);
  }
});

// // DELETE - single comment
// router.delete("/:userId/:postId/comments/:commentId", async (req, res, next) => {
//   try {
//     const { userId, postId, commentId } = req.params;

//     const selectedUser = await Users.findById(userId);

//     if (selectedUser) {
//       const selectedPost = await Posts.findById(postId);

//       if (selectedPost) {
//         const selectedPostComments = selectedPost.comments;
//         const selectedCommentId = selectedPostComments.find((comment) => comment._id.toString() === commentId);
//         const deletedComment = await Comments.findByIdAndDelete(selectedCommentId);

//         console.log("selectedPostComments", selectedPostComments);
//         if (deletedComment) {
//           res.send({
//             message: `Below you can find the deleted comment with id: ${commentId} and all the remaining comments:`,
//             deletedComment: deletedComment,
//           });
//         } else {
//           next(NotFound(`The comment with id: ${commentId} is not in our linkedin database`));
//         }
//         console.log("selected post comments: ", selectedPostComments);
//       } else {
//         next(NotFound(`The post with id: ${postId} is not in our linkedin database`));
//       }
//     } else {
//       next(NotFound(`The user with id: ${userId} is not in our linkedin database`));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// DELETE - single comment
router.delete("/:userId/:postId/comments/:commentId", async (req, res, next) => {
  try {
    const { userId, postId, commentId } = req.params;

    const selectedUser = await Users.findByIdAndUpdate(
      userId,
      { $pull: { comments: { _id: commentId } } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (selectedUser) {
      const selectedPost = await Posts.findByIdAndUpdate(
        postId,
        { $pull: { comments: { _id: commentId } } },
        {
          new: true,
          runValidators: true,
        }
      );

      if (selectedPost) {
        const deletedComment = await Comments.findByIdAndDelete(commentId);

        if (deletedComment) {
          res.send({
            message: `Below you can find the successfully deleted comment with id: ${commentId}`,
            deletedComment: deletedComment,
          });
        } else {
          next(NotFound(`The comment with id: ${commentId} is not in our linkedin database`));
        }
      } else {
        next(NotFound(`The post with id: ${postId} is not in our linkedin database`));
      }
    } else {
      next(NotFound(`The user with id: ${userId} is not in our linkedin database`));
    }
  } catch (error) {
    next(error);
  }
});
export default router;
