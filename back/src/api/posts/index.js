import express from "express";
import createHttpError from "http-errors";
import PostsModel from "./model.js";
import UsersModel from "../users/model.js";
import { checksPostSchema, triggerBadRequest } from "./validator.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

const postsRouter = express.Router();

postsRouter.post(
  "/",
  checksPostSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const newPost = new PostsModel(req.body);
      console.log("🚀 ~ file: index.js:19 ~ newPost ", newPost);
      // here it happens validation (thanks to Mongoose) of req.body, if it is not
      // ok Mongoose will throw an error
      // if it is ok the post is not saved yet
      // 1. get the User with id: req.body.user
      const userId = req.body.user;
      const updatedUser = await UsersModel.findByIdAndUpdate(
        userId,
        { $push: { posts: newPost._id } },
        { new: true, runValidators: true }
      );
      if (updatedUser) {
        console.log("🚀 ~ file: index.js:31 ~ updatedUser", updatedUser);
        const { _id } = await newPost.save();

        res.status(201).send({
          message: `Post with ID: ${_id} created and user.posts with ID: ${userId} updated!`,
          updatedUser: updatedUser,
        });
      } else {
        next(createHttpError(404, `User with id ${userId} not found!`));
      }
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
      const userId = deletedPost.user.toString();
      // finding the User
      const user = await UsersModel.findById(userId);
      // finding the index of the post which needs to be deleted
      const indexToDelete = user.posts.findIndex(
        (post) => post._id.toString() === req.params.postId
      );
      // deleting the post from user.posts
      user.posts.splice(indexToDelete, 1);
      // saving user
      await user.save();
      res.status(204).send({
        message: `Post with ID ${req.params.postId} was successfully deleted!`,
      });
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
});

// ************* POST IMAGE w/ CLOUDINARY ************

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "epicode/linkedInMedias",
    },
  }),
}).single("postImage");

postsRouter.post("/:postId", cloudinaryUploader, async (req, res, next) => {
  try {
    const url = req.file.path;
    console.log("🚀 ~ file: index.js:141 ~ postsRouter.post ~ url", url);

    const updatedPost = await PostsModel.findByIdAndUpdate(
      req.params.postId, // WHO you want to modify
      { image: url }, // HOW you want to modify
      { new: true, runValidators: true }
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

postsRouter.put("/:postId/like", async (req, res, next) => {
  try {
      const postId = req.params.postId;
      const userId = req.body.userId;
      // check if the post already has the user's like
      const post = await PostsModel.findById(postId);
      if(post.likes.includes(userId)){
        // if the user has already liked the post, remove the like
        const updatedPost = await PostsModel.findOneAndUpdate(
          { _id: postId },
          { $pull: { likes: userId } },
          { new: true, runValidators: true }
        );
        // remove the post from the user's likedPosts
        const updatedUser = await UsersModel.findOneAndUpdate(
          { _id: userId },
          { $pull: { likedPosts: postId } },
          { new: true, runValidators: true }
        );
        if (updatedPost && updatedUser) {
            console.log("Post and User updated successfully", updatedPost, updatedUser);
            res.status(200).send({ message: "Like removed successfully", updatedPost });
        } else {
            next(createHttpError(404, "Post or User not found"));
        }
      }else{
        //update the post
        const updatedPost = await PostsModel.findOneAndUpdate(
            { _id: postId },
            { $addToSet: { likes: userId } },
            { new: true, runValidators: true }
        );
        //update the user
        const updatedUser = await UsersModel.findOneAndUpdate(
            { _id: userId },
            { $push: { likedPosts: postId } },
            { new: true, runValidators: true }
        );
        //check if the update was successful
        if (updatedPost && updatedUser) {
            console.log("Post and User updated successfully", updatedPost, updatedUser);
            res.status(200).send({ message: "Post liked successfully", updatedPost });
        } else {
            next(createHttpError(404, "Post or User not found"));
        }
      }
  } catch (error) {
      next(error);
  }
});



postsRouter.put("/:postId/dislike", async (req, res, next) => {
  try {
      const postId = req.params.postId;
      const userId = req.body.userId;
      // check if the post already has the user's dislike
      const post = await PostsModel.findById(postId);
      if(post.dislikes.includes(userId)){
        // if the user has already disliked the post, remove the dislike
        const updatedPost = await PostsModel.findOneAndUpdate(
          { _id: postId },
          { $pull: { dislikes: userId } },
          { new: true, runValidators: true }
          );
          // remove the post from the user's dislikedPosts
          const updatedUser = await UsersModel.findOneAndUpdate(
          { _id: userId },
          {$pull: { dislikedPosts: postId } },
          { new: true, runValidators: true }
          );
          if (updatedPost && updatedUser) {
          console.log("Post and User updated successfully", updatedPost, updatedUser);
          res.status(200).send({ message: "Dislike removed successfully", updatedPost });
          } else {
          next(createHttpError(404, "Post or User not found"));
          }
          }else{
          //update the post
          const updatedPost = await PostsModel.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { dislikes: userId } },
          { new: true, runValidators: true }
          );
          //update the user
          const updatedUser = await UsersModel.findOneAndUpdate(
          { _id: userId },
          { $push: { dislikedPosts: postId } },
          { new: true, runValidators: true }
          );
          //check if the update was successful
          if (updatedPost && updatedUser) {
          console.log("Post and User updated successfully", updatedPost, updatedUser);
          res.status(200).send({ message: "Post disliked successfully", updatedPost });
          } else {
          next(createHttpError(404, "Post or User not found"));
          }
          }
          } catch (error) {
          next(error);
          }
          });




export default postsRouter;
