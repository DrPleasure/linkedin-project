import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const userSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name is a mandatory field and needs to be a String.",
    },
  },
  surname: {
    in: ["body"],
    isString: {
      errorMessage: "Surname is a mandatory field and needs to be a String.",
    },
  },
  email: {
    in: ["body"],
    isString: {
      errorMessage:
        "Email is a mandatory field. Please supply a email which is a string.",
    },
  },
  bio: {
    in: ["body"],
    isString: {
      errorMessage:
        "Bio is a mandatory field. Please supply a bio which is a string.",
    },
  },
  title: {
    in: ["body"],
    isString: {
      errorMessage:
        "Title is a mandatory field. Please supply a title which is a string.",
    },
  },
  area: {
    in: ["body"],
    isString: {
      errorMessage:
        "Area is a mandatory field. Please supply an area which is a string.",
    },
  },
  username: {
    in: ["body"],
    isString: {
      errorMessage:
        "Username is a mandatory field. Please supply a username which is a string.",
    },
  },
  "experiences.role": {
    in: ["body"],
    isString: {
      errorMessage:
        "Role is a mandatory field. Please supply a role which is a string.",
    },
  },
  "experiences.company": {
    in: ["body"],
    isString: {
      errorMessage:
        "Company is a mandatory field. Please supply a company which is a string.",
    },
  },
  "experiences.startDate": {
    in: ["body"],
    isString: {
      errorMessage:
        "StartDate is a mandatory field. Please supply a startDate which is a string.",
    },
  },
  "experiences.endDate": {
    in: ["body"],
    isString: {
      errorMessage:
        "EndDate is a mandatory field. Please supply a endDate which is a string.",
    },
  },
  "experiences.description": {
    in: ["body"],
    isString: {
      errorMessage:
        "Description is a mandatory field. Please supply a description which is a string.",
    },
  },
  "experiences.area": {
    in: ["body"],
    isString: {
      errorMessage:
        "Area is a mandatory field. Please supply a area which is a string.",
    },
  },
};

export const checksUserSchema = checkSchema(userSchema);

export const triggerBadRequest = (req, res, next) => {
  // 1. Check if previous middleware ( checksBlogUsersSchema) has detected any error in req.body
  const errors = validationResult(req);

  console.log(errors.array());

  if (!errors.isEmpty()) {
    // 2.1 If we have any error --> trigger error handler 400
    next(
      createHttpError(400, "Errors during User validation", {
        errorsList: errors.array(),
      })
    );
  } else {
    // 2.2 Else (no errors) --> normal flow (next)
    next();
  }
};

// VALIDATION CHAIN 1. checksBlogUsersSchema --> 2. triggerBadRequest
