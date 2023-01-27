import express from "express";
const router = express.Router();
import Users from "../users/model.js"; // import database here
import multer from "multer";
import path from "path";
import fs from "fs";
import json2csv from "json2csv";
import mongoose from "mongoose";
import { Parser } from "@json2csv/plainjs"

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Get user experiences
router.get("/:userId/experiences", (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user.experiences);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create an experience
router.post("/:userId/experiences", (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.experiences.push({
        role: req.body.role,
        company: req.body.company,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        area: req.body.area,
        description: req.body.description,
        image: req.body.image,
        // add other fields as required
      });
      user
        .save()
        .then((updatedUser) => {
          res.status(201).json(updatedUser.experiences[updatedUser.experiences.length - 1]);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get a specific experience
router.get("/:userId/experiences/:expId", (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const experience = user.experiences.id(req.params.expId);
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      res.json(experience);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Edit a specific experience
router.put("/:userId/experiences/:expId", (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const experience = user.experiences.id(req.params.expId);
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      // console.log("experience", experience);
      // experience = { ...req.body, updatedAt: new Date() };
      // console.log("experience", experience);

      // experience.area = req.body.area;
      // experience.description = req.body.description;
      // experience.image = req.body.image;
      experience.role = req.body.role;
      // add other fields as required
      // console.log("experince.role", experience.role);
      // console.log("experince.image", experience.image);
      // console.log("user", user);

      user
        .save()
        .then((updatedUser) => {
          res.json(updatedUser.experiences.id(req.params.expId));
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a specific experience
router.delete("/:userId/experiences/:expId", (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const experience = user.experiences.id(req.params.expId);
      if (!experience) {
        return res.status(404).json({ message: "Experience not found" });
      }
      experience.remove();
      user
        .save()
        .then(() => {
          res.status(204).end();
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


router.post(
  "/:userId/experiences/:expId/picture",
  upload.single("experiencePicture"),
  (req, res) => {
    Users.findOne({ userId: req.params.userId })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const experience = user.experiences.id(req.params.expId);
        if (!experience) {
          return res.status(404).json({ message: "Experience not found" });
        }
        experience.image = req.file.path;
        user
          .save()
          .then(() => {
            res.status(204).end();
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  }
);


router.get("/:userId/experiences/all/csv", async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.userId)
    console.log(user)
    if (user) {
      const myData = user.experiences
      console.log(myData)
      const opts = {
        fields: ["role", "company", "startDate"]
      }
      const parser = await new Parser(opts)
      const csv = parser.parse(myData)
      console.log(csv)
      res.setHeader("Content-Disposition", "attachment; filename=experiences.csv")
      res.send(csv)
    } else {
      res.send({ message: "user not found" })
    }

  } catch (err) {
    console.error(err)
  }
})

export default router;
