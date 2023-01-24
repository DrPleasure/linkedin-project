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
      ).populate("comments");

      res.send(selectedPost);
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

export default router;
