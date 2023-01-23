import express from "express";
import createHttpError from "http-errors";
import PostsModel from "./model.js";
import UsersModel from "../users/model.js";
import { checksPostSchema, triggerBadRequest } from "./validator.js";
// import q2m from "query-to-mongo";

const postsRouter = express.Router();

postsRouter.post(
  "/",
  checksPostSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const userId = req.body.user;

      const newPost = new PostsModel(req.body);

      // here it happens validation (thanks to Mongoose) of req.body, if it is not ok Mongoose will throw an error
      // if it is ok the post is not saved yet
      const { _id } = await newPost.save();

      // 1. get the User with id: req.body.user
      const updatedUser = await UsersModel.findByIdAndUpdate(
        userId,
        { $push: { posts: _id } },
        { new: true, runValidators: true }
      );

      res.status(201).send({
        message: `Post with ${_id} created abd user with ${userId} updated!`,
        updatedUser: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.get("/", async (req, res, next) => {
  try {
    let query = {};
    // const page = req.query.page || 1;
    // const limit = req.query.limit || 10;
    // const total = await PostsModel.countDocuments(query);
    const posts = await PostsModel.find(query).populate("user");
    //   .skip((page - 1) * limit)
    //   .limit(limit);

    res.send(
      //   total,
      //   totalPages: Math.ceil(total / limit),
      posts
    );
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostsModel.findById(req.params.postId).populate("user"); // .populate({path:"user"}) 2nd version

    if (post) {
      res.send(post);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.put("/:postId", async (req, res, next) => {
  try {
    const updatedPost = await PostsModel.findByIdAndUpdate(
      req.params.postId, // WHO you want to modify
      req.body, // HOW you want to modify
      { new: true, runValidators: true } // options. By default findByIdAndUpdate returns the record pre-modification. If you want to get back the newly updated record you shall use new:true
      // By default validation is off in the findByIdAndUpdate --> runValidators:true
    );

    if (updatedPost) {
      res.send(updatedPost);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

postsRouter.delete("/:postId", async (req, res, next) => {
  try {
    const deletedPost = await PostsModel.findByIdAndDelete(req.params.postId);

    if (deletedPost) {
      res.status(204).send();
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

export default postsRouter;
