import express from 'express';
const router = express.Router();
import User from '../users/model.js'; // import database here
import multer from 'multer'
import path from 'path';
import fs from "fs"
import json2csv from 'json2csv';
import mongoose from 'mongoose';




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
router.get('/api/:userId/experiences', (req, res) => {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user.experiences);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
  
  // Create an experience
  router.post('/api/:userId/experiences', (req, res) => {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
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
user.save()
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
router.get('/api/:userId/experiences/:expId', (req, res) => {
    User.findById(req.params.userId)
    .then((user) => {
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    const experience = user.experiences.id(req.params.expId);
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
    router.put('/api/:userId/experiences/:expId', (req, res) => {
    User.findById(req.params.userId)
    .then((user) => {
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    const experience = user.experiences.id(req.params.expId);
    if (!experience) {
    return res.status(404).json({ message: 'Experience not found' });
    }
    experience.role = req.body.role;
    experience.company = req.body.company;
    experience.startDate = req.body.startDate;
    experience.endDate = req.body.endDate;
    experience.area = req.body.area;
    experience.description = req.body.description;
    experience.image = req.body.image;
    // add other fields as required
    user.save()
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
    router.delete('/api/:userId/experiences/:expId', (req, res) => {
    User.findById(req.params.userId)
    .then((user) => {
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    const experience = user.experiences.id(req.params.expId);
    if (!experience) {
    return res.status(404).json({ message: 'Experience not found' });
    }
    experience.remove();
    user.save()
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
      
    // Change the experience picture
router.put('/api/:userId/experiences/:expId/picture', upload.single('experiencePicture'), (req, res) => {
    User.findOne({ userId: req.params.userId })
    .then((user) => {
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    const experience = user.experiences._id(req.params.expId);
    if (!experience) {
    return res.status(404).json({ message: 'Experience not found' });
    }
    experience.image = req.file.path;
    user.save()
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
      
      // Download the experiences as a CSV
router.get('/api/:userId/experiences/CSV', (req, res) => {
    User.findOne({ userId: req.params.userId })
    .then((user) => {
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    try {
    const fields = ['role', 'company', 'startDate', 'endDate', 'description', 'area'];
    const opts = { fields };
    const csv = json2csv.parse(user.experiences, opts);
    res.attachment('experiences-${req.params.userId}.csv');
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