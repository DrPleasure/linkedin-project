import express from "express";
import createHttpError from "http-errors";
import q2m from "query-to-mongo";
import {
  checksUserSchema,
  checkFilteredUserSchema,
  triggerBadRequest,
} from "./validator.js";
import Users from "./model.js";
import uniqid from "uniqid";
const { NotFound } = createHttpError;
const router = express.Router();
// POST
router.post(`/`, checksUserSchema, async (req, res, next) => {
  try {
    let { surname } = req.body;
    const uniqueString = `${surname + uniqid()}`;

    // come back to it - make a proper function
    const body = {
      ...req.body,
      username: uniqueString.slice(0, uniqueString.length - 12),
    };

    const newUser = new Users(body);
    const user = await newUser.save();

    res.status(201).send({
      message: `The new user has been successfully created; you can see it below`,
      newUser: user,
    });
  } catch (error) {
    next(error);
  }
});
// GET
router.get("/", async (req, res, next) => {
  try {
    const users = await Users.find({}, { name: 1, posts: 1, experiences: 1 });
    res.send(users);
  } catch (error) {
    next(error);
  }
});
// GET with PAGINATION
router.get("/pagination", async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const total = await Users.countDocuments(mongoQuery.criteria);
    const users = await Users.find(
      mongoQuery.criteria,
      mongoQuery.options.fields
    )
      .limit(mongoQuery.options.limit) // No matter the order of usage of these 3 options, Mongo will ALWAYS go with SORT, then SKIP, then LIMIT
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort);
    res.send({
      links: mongoQuery.links("http://localhost:3013/users/pagination", total),
      totalPages: Math.ceil(total / mongoQuery.options.limit),
      message: `there are ${total} users in our database and displayed: ${users.length} / page `,
      users,
    });
  } catch (error) {
    next(error);
  }
});
// FILTER by user.name
router.get(
  "/filter",
  checkFilteredUserSchema,
  triggerBadRequest,
  async (req, res, next) => {
    try {
      const { name, email } = req.query;
      const filteredUsers = await Users.find(
        { name, email },
        { title: 1, bio: 1 }
      );
      if (filteredUsers.length > 0) {
        res.send(filteredUsers);
      } else {
        next(
          createHttpError(
            404,
            `There are no users that match these 2 criteria: name='${name}' AND email='${email}'`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);
// GET - single user
router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Users.findById(userId);
    if (user) {
      res.send(user);
    } else {
      next(createHttpError(404, `User with id ${userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
// PUT
router.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = await Users.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (updatedUser) {
      res.send(updatedUser);
    } else {
      next(createHttpError(404, `User with id ${userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
// DELETE
router.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (deletedUser) {
      res.send({
        message: `The user with id: ${userId} has been successfully deleted`,
      });
    } else {
      next(createHttpError(404, `Product with id ${userId} not found!`));
    }
  } catch (error) {
    next(error);
  }
});
export default router;
