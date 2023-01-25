import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const { BadRequest } = createHttpError;

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
      errorMessage: "Email is a mandatory field. Please supply a email which is a string.",
    },
  },
  bio: {
    in: ["body"],
    isString: {
      errorMessage: "Bio is a mandatory field. Please supply a bio which is a string.",
    },
  },
  title: {
    in: ["body"],
    isString: {
      errorMessage: "Title is a mandatory field. Please supply a title which is a string.",
    },
  },
  area: {
    in: ["body"],
    isString: {
      errorMessage: "Area is a mandatory field. Please supply an area which is a string.",
    },
  },
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Username is a mandatory field. Please supply a username which is a string.",
    },
  },
  "experiences.role": {
    in: ["body"],
    isString: {
      errorMessage: "Role is a mandatory field. Please supply a role which is a string.",
    },
  },
  "experiences.company": {
    in: ["body"],
    isString: {
      errorMessage: "Company is a mandatory field. Please supply a company which is a string.",
    },
  },
  "experiences.startDate": {
    in: ["body"],
    isString: {
      errorMessage: "StartDate is a mandatory field. Please supply a startDate which is a string.",
    },
  },
  "experiences.endDate": {
    in: ["body"],
    isString: {
      errorMessage: "EndDate is a mandatory field. Please supply a endDate which is a string.",
    },
  },
  "experiences.description": {
    in: ["body"],
    isString: {
      errorMessage: "Description is a mandatory field. Please supply a description which is a string.",
    },
  },
  "experiences.area": {
    in: ["body"],
    isString: {
      errorMessage: "Area is a mandatory field. Please supply a area which is a string.",
    },
  },
  image: {
    in: ["body"],
    isString: {
      errorMessage: "Image is a mandatory field. Please supply an image link, which is a string.",
    },
  },
};

const filteredUserSchema = {
  name: {
    in: ["query"],
    isString: {
      errorMessage: "name must be in query and type must be string to search!",
    },
  },
  email: {
    in: ["query"],
    isString: {
      errorMessage: "email must be in query and type must be a string to search!",
    },
  },
};

export const checkFilteredUserSchema = checkSchema(filteredUserSchema);

export const checksUserSchema = checkSchema(userSchema);

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

// VALIDATION CHAIN 1. checksBlogUsersSchema --> 2. triggerBadRequest
