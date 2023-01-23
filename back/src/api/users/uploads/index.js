import Users from "../model.js";

import express from "express";
import multer from "multer";
import createHttpError from "http-errors";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const { NotFound } = createHttpError;

const router = express.Router();

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "LinkedinProject/users",
    },
  }),
}).single("profilePicture");

router.post("/:userId/picture", cloudinaryUploader, async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log("the req.file is: ", req.file);
    const url = req.file.path;

    const updatedUser = await Users.findByIdAndUpdate(userId, { image: url }, { new: true, runValidators: true });

    if (updatedUser) {
      res.send({
        message: `The user with id: ${userId} successfully updated; you can see it below`,
        updatedUser: updatedUser,
      });
    } else {
      next(NotFound(`The user with id: ${userId} is not in the Linkedin archive`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/:userId/picture", cloudinaryUploader, async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log("the req.file is: ", req.file);
    const url = req.file.path;
    // const blogPosts = await getBlogPosts();

    // const updatedUser = await Users.findByIdAndUpdate(
    //   userId,
    //   { $push: { picture: url } },
    //   { new: true, runValidators: true }
    // );
    const selectedUser = await Users.findById(userId);

    if (selectedUser) {
      const updatedUser = { ...selectedUser.toObject(), picture: url, updatedAt: new Date() };
      console.log("updatedUser", updatedUser);
      // await updatedUser.save();

      res.send({
        message: `The user with id: ${userId} successfully updated; you can see it below`,
        updatedUser: updatedUser,
      });
    } else {
      next(NotFound(`The user with id: ${userId} is not in the Linkedin archive`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});
export default router;
