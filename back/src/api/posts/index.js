import express from "express";
import createHttpError from "http-errors";
import PostsModel from "./model.js";
import { checksPostSchema, triggerBadRequest } from "./validator.js";
// import q2m from "query-to-mongo";

const postsRouter = express.Router();

postsRouter.post(
  "/",
  checksPostSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newPost = new PostsModel(req.body);
      // here it happens validation (thanks to Mongoose) of req.body, if it is not ok Mongoose will throw an error
      // if it is ok the post is not saved yet
      const { _id } = await newPost.save();
      res.status(201).send({ _id });
    } catch (error) {
      next(error);
    }
  }
);

postsRouter.get("/", async (req, res, next) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.price) {
      query.price = { $lt: req.query.price };
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const total = await PostsModel.countDocuments(query);
    const posts = await PostsModel.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("reviews");
    res.send({
      total,
      totalPages: Math.ceil(total / limit),
      posts,
    });
  } catch (error) {
    next(error);
  }
});

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await PostsModel.findById(req.params.postId).populate(
      "reviews"
    ); // .populate({path:"reviews"}) 2nd version

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

    // ****** ALTERNATIVE METHOD ******
    /*     const post = await PostsModel.findById(req.params.postId)
    // When you do a findById, findOne,.... you get back a MONGOOSE DOCUMENT which is NOT a normal object
    // It is an object with superpowers, for instance it has the .save() method that will be very useful in some cases
    post.age = 100
    await post.save() */

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
