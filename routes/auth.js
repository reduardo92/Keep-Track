const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
const auth = require('../middleware/auth');

// Joi validator
const { loginValidation } = require('../Validation');
// User Model
const User = require('../models/Users');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public

router.post('/', async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

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
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
