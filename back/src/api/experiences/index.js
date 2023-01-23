const express = require('express');
const router = express.Router();
const User = require('../users/model.js'); // import database here
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const json2csv = require('json2csv').parse;
const mongoose = require('mongoose');



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
experiencesRouter.get('/api/users/:userId/experiences', (req, res) => {
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
  experiencesRouter.post('/api/users/:userId/experiences', (req, res) => {
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
experiencesRouter.get('/api/users/:userId/experiences/:expId', (req, res) => {
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
    experiencesRouter.put('/api/users/:userId/experiences/:expId', (req, res) => {
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
    experiencesRouter.delete('/api/users/:userId/experiences/:expId', (req, res) => {
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
experiencesRouter.post('/api/profile/:userName/experiences/:expId/picture', upload.single('experiencePicture'), (req, res) => {
    User.findOne({ userName: req.params.userName })
    .then((user) => {
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    const experience = user.experiences.id(req.params.expId);
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
experiencesRouter.get('/api/profile/:userName/experiences/CSV', (req, res) => {
    User.findOne({ userName: req.params.userName })
    .then((user) => {
    if (!user) {
    return res.status(404).json({ message: 'User not found' });
    }
    try {
    const fields = ['role', 'company', 'startDate', 'endDate', 'description', 'area', 'image'];
    const opts = { fields };
    const csv = json2csv.parse(user.experiences, opts);
    res.attachment('experiences-${req.params.userName}.csv');
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