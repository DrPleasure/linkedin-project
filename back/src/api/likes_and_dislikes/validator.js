import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const { BadRequest } = createHttpError;

const commentSchema = {
  text: {
    in: ["body"],
    isString: {
      errorMessage: "The comment text field is mandatory and it needs to be a String.",
    },
  },
};

export const checksCommentSchema = checkSchema(commentSchema);

export const triggerBadRequest = (req, res, next) => {
  const errorList = validationResult(req);

  if (!errorList.isEmpty()) {
    next(
      BadRequest({
        message: "Error during post validation",
        errors: errorList.array(),
      })
    );
  } else {
    next();
  }
};
