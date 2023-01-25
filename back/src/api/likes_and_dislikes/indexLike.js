import express from "express";
import createHttpError from "http-errors";
import Posts from "../posts/model.js";
import Users from "../users/model.js";
import Likes from "./likeModel.js";
import { checksCommentSchema, triggerBadRequest } from "./validator.js";

const { NotFound } = createHttpError;

const router = express.Router();

// POST - like
router.post("/:userId/:postId/likes", async (req, res, next) => {
  try {
    const { userId, postId } = req.params;

    const newLike = new Likes(req.body);

    const selectedUser = await Users.findByIdAndUpdate(
      userId,
      { $push: { likes: newLike._id } },
      { new: true, runValidators: true }
    );

    if (selectedUser) {
      const selectedPost = await Posts.findByIdAndUpdate(
        postId,
        { $push: { likes: newLike._id } },
        { new: true, runValidators: true }
      );

      if (selectedPost) {
        //  const { _id } = await newComment.save();
        const like = await newLike.save();
        res.send(like);
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

// GET - all likes for a specific post
router.get("/:userId/:postId/likes", async (req, res, next) => {
  try {
    const { userId, postId } = req.params;

    const selectedUser = await Users.findById(userId);

    if (selectedUser) {
      const selectedPost = await Posts.findById(postId);

      if (selectedPost) {
        const allLikes = selectedPost.likes;
        console.log("allLikes", allLikes);

        if (allLikes.length > 0) {
          res.send({
            message: `You can find all the likes for the post with id: ${postId} below`,
            likes: allLikes,
          });
        } else {
          next(NotFound(`The post with id: ${postId} has 0 likes`));
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

// GET - single like
router.get("/:userId/:postId/likes/:likeId", async (req, res, next) => {
  try {
    const { userId, postId, likeId } = req.params;

    const selectedUser = await Users.findById(userId);

    if (selectedUser) {
      const selectedPost = await Posts.findById(postId);
      console.log("selectedPost", selectedPost);
      if (selectedPost) {
        const selectedPostLikes = selectedPost.likes;
        console.log("selectedPost.likes", selectedPost.likes);
        const selectedLikeId = selectedPostLikes.find((like) => like._id.toString() === likeId);
        console.log("selectedLikeId", selectedLikeId);
        const searchedLike = await Likes.findById(selectedLikeId);

        console.log("searchedLike", searchedLike);
        if (searchedLike) {
          res.send({
            message: `Below you can find the comment with id: ${likeId}:`,
            searchedLike: searchedLike,
          });
        } else {
          next(NotFound(`The like with id: ${likeId} is not in our linkedin database`));
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

// PUT - single like
router.put("/:userId/:postId/likes/:likeId", async (req, res, next) => {
  try {
    const { userId, postId, likeId } = req.params;

    const selectedUser = await Users.findById(userId);

    if (selectedUser) {
      const selectedPost = await Posts.findById(postId);

      if (selectedPost) {
        const selectedPostLikes = selectedPost.likes;
        const selectedLike = selectedPostLikes.find((like) => like._id.toString() === likeId);

        const updatedLike = await Likes.findByIdAndUpdate(selectedLike, req.body, {
          new: true,
          runValidators: true,
        });

        console.log("updatedLike", updatedLike);
        if (updatedLike) {
          res.send({
            message: `Below you can find the like with id: ${likeId}:`,
            updatedLike: updatedLike,
          });
        } else {
          next(NotFound(`The like with id: ${likeId} is not in our linkedin database`));
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
router.delete("/:userId/:postId/likes/:likeId", async (req, res, next) => {
  try {
    const { userId, postId, likeId } = req.params;

    const selectedUser = await Users.findByIdAndUpdate(
      userId,
      { $pull: { likes: { _id: likeId } } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (selectedUser) {
      const selectedPost = await Posts.findByIdAndUpdate(
        postId,
        { $pull: { likes: { _id: likeId } } },
        {
          new: true,
          runValidators: true,
        }
      );

      if (selectedPost) {
        const deletedLike = await Likes.findByIdAndDelete(likeId);

        if (deletedLike) {
          res.send({
            message: `Below you can find the successfully deleted comment with id: ${likeId}`,
            deletedLike: deletedLike,
          });
        } else {
          next(NotFound(`The like with id: ${deletedLike} is not in our linkedin database`));
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
