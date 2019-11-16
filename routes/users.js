const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
// Joi validation
const { registerValidation } = require('../Validation');

// User Model
const User = require('../models/Users');

// @route   POST api/users
// @desc    Register a user
// @access  Pulic

router.post('/', async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    //   check is user exists
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // create a new user
    user = new User({
      name,
      email,
      password
    });
    // crpt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // save user
    await user.save();
    const payload = {
      user: {
        id: user.id
      }
    };
    // use json token
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
    ///////////////////////////
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
