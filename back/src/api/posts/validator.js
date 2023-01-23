import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const postSchema = {
  text: {
    in: ["body"],
    isString: {
      errorMessage: "Text is a mandatory field and needs to be a String.",
    },
  },
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Username is a mandatory field and needs to be a String.",
    },
  },
  image: {
    in: ["body"],
    isString: {
      errorMessage:
        "Image is a mandatory field and needs to be a URL as a String.",
    },
  },
  user: {
    in: ["body"],
    isString: {
      errorMessage:
        "User is a mandatory field. Please supply a ID which is a string.",
    },
  },
};

export const checksPostSchema = checkSchema(postSchema);

export const triggerBadRequest = (req, res, next) => {
  // 1. Check if previous middleware ( checksBlogPostsSchema) has detected any error in req.body
  const errorsList = validationResult(req);

  console.log(errorsList.array());

  if (!errorsList.isEmpty()) {
    // 2.1 If we have any error --> trigger error handler 400
    next(
      createHttpError(400, "Errors during Post validation", {
        errors: errorsList.array(),
      })
    );
  } else {
    // 2.2 Else (no errors) --> normal flow (next)
    next();
  }
};

// VALIDATION CHAIN 1. checksBlogPostsSchema --> 2. triggerBadRequest
