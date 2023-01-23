const express = require('express');
const router = express.Router();
const db = require('../models'); // import your database
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const json2csv = require('json2csv').parse;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get user experiences
router.get('/api/users/:userId/experiences', (req, res) => {
  db.Experience.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then((experiences) => {
      res.json(experiences);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create an experience
router.post('/api/users/:userId/experiences', (req, res) => {
  db.Experience.create({
    userId: req.params.userId,
    title: req.body.title,
    description: req.body.description,
    // add other fields as required
  })
    .then((experience) => {
      res.status(201).json(experience);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Get a specific experience
experiencesRouter.get('/api/users/:userId/experiences/:expId', (req, res) => {
  db.Experience.findOne({
    where: {
      userId: req.params.userId,
      id: req.params.expId
    }
  })
    .then((experience) => {
      if (!experience) {
        return res.status(404).json({ message: 'Experience not found' });
      }
      res.json(experience);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Edit a specific experience
experiencesRouter.put('/api/users/:userId/experiences/:expId', (req, res) => {
  db.Experience.findOne({
    where: {
      userId: req.params.userId,
      id: req.params.expId
    }
  })
    .then((experience) => {
      if (!experience) {
        return res.status(404).json({ message: 'Experience not found' });
      }
      experience.title = req.body.title;
     
      experience.description = req.body.description;
      // add other fields as required
      experience.save()
      .then((updatedExperience) => {
      res.json(updatedExperience);
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
      router.delete('/api/users/:userId/experiences/:expId', (req, res) => {
      db.Experience.destroy({
      where: {
      userId: req.params.userId,
      id: req.params.expId
      }
      })
      .then(() => {
      res.status(204).end();
      })
      .catch((err) => {
      res.status(500).send(err);
      });
      });
      
      // Change the experience picture
      experiencesRouter.post('/api/profile/:userName/experiences/:expId/picture', upload.single('experiencePicture'), (req, res) => {
      db.Experience.findOne({
      where: {
      userName: req.params.userName,
      id: req.params.expId
      }
      })
      .then((experience) => {
      if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
      }
      experience.picture = req.file.path;
      experience.save()
      .then((updatedExperience) => {
      res.json(updatedExperience);
      })
      .catch((err) => {
      res.status(500).send(err);
      });
      })
      .catch((err) => {
      res.status(500).send(err);
      });
      });
      
      // Download the experiences as a CSV
      router.get('/api/profile/:userName/experiences/CSV', (req, res) => {
        db.Experience.findAll({
          where: {
            userName: req.params.userName
          }
        })
          .then((experiences) => {
            if (!experiences) {
              return res.status(404).json({ message: 'No experiences found for this user' });
            }
            try {
              const csv = json2csv(experiences);
              res.attachment(`experiences-${req.params.userName}.csv`);
              return res.status(200).send(csv);
            } catch (err) {
              return res.status(500).json({ message: 'Error generating CSV' });
            }
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      });

      export default router