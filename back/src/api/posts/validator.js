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
  "user.name": {
    in: ["body"],
    isString: {
      errorMessage:
        "User name is a mandatory field. Please supply a name which is a string.",
    },
  },
  "user.surname": {
    in: ["body"],
    isString: {
      errorMessage:
        "User surname is a mandatory field. Please supply a surname which is a string.",
    },
  },
};

export const checksPostSchema = checkSchema(postSchema);

export const triggerBadRequest = (req, res, next) => {
  // 1. Check if previous middleware ( checksBlogPostsSchema) has detected any error in req.body
  const errors = validationResult(req);

  console.log(errors.array());

  if (!errors.isEmpty()) {
    // 2.1 If we have any error --> trigger error handler 400
    next(
      createHttpError(400, "Errors during blogPost validation", {
        errorsList: errors.array(),
      })
    );
  } else {
    // 2.2 Else (no errors) --> normal flow (next)
    next();
  }
};

// VALIDATION CHAIN 1. checksBlogPostsSchema --> 2. triggerBadRequest
