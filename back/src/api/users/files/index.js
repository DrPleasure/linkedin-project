import Users from "../model.js";

import express from "express";
import multer from "multer";
import createHttpError from "http-errors";

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

import { getPdfReadableStream } from "../../../lib/pdf-tools.js";
import { pipeline } from "stream";

const { NotFound } = createHttpError;

export const pictureUploadRouter = express.Router();
export const pdfDownloadRouter = express.Router();
export const csvRouter = express.Router();

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "LinkedinProject/users",
    },
  }),
}).single("profilePicture");

// PICTURE upload
pictureUploadRouter.post("/:userId/picture", cloudinaryUploader, async (req, res, next) => {
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

// GET - PDF download
pdfDownloadRouter.get("/:userId/cv", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await Users.findById(userId);
    // console.log("user", user);

    if (user) {
      res.setHeader("Content-Disposition", "attachment; cv.pdf");

      const source = getPdfReadableStream(user);
      const destination = res;

      pipeline(source, destination, (err) => {
        if (err) console.log(err);
      });
    } else {
      console.log(`There is no user with this id: ${userId}`);
    }
  } catch (error) {
    next(error);
  }
});

// CSV
//
csvRouter.get("/postsCSV", (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", "attachment; filename=posts.csv");

    const source = getPostsJSONReadableStream();
    const transform = new json2csv.Transform({ fields: ["category", "title", "content"] });
    const destination = res;

    pipeline(source, transform, destination, (err) => {
      if (err) console.log(err);
    });
  } catch (error) {
    next(error);
  }
});
