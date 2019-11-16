const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// Joi validation
const { macrosValidation } = require('../Validation');
// Macros Model
const Macros = require('../models/Macros');

// @route   GET api/macros
// @desc    Get all users macros
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const macros = await Macros.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(macros);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/macros
// @desc    add new macros
// @access  Private

router.post('/', auth, async (req, res) => {
  const { error } = macrosValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { calories, fat, carbs, protein } = req.body;

  try {
    const newMacros = new Macros({
      calories,
      fat,
      carbs,
      protein,
      user: req.user.id
    });

    const macros = await newMacros.save();

    res.json(macros);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/macros/:id
// @desc    Update macros
// @access  Private

router.put('/:id', auth, async (req, res) => {
  const { calories, fat, carbs, protein } = req.body;

  // Build macros object
  const macrosFields = {};
  if (calories) macrosFields.calories = calories;
  if (fat) macrosFields.fat = fat;
  if (carbs) macrosFields.carbs = carbs;
  if (protein) macrosFields.protein = protein;

  try {
    let macros = await Macros.findById(req.params.id);

    if (!macros) return res.status(400).json({ msg: 'Macros not found' });

    // Make sure user owns macros
    if (macros.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    macros = await Macros.findByIdAndUpdate(
      req.params.id,
      { $set: macrosFields },
      { new: true }
    );

    res.json(macros);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/macros/:d
// @desc    Delete macros
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let macros = await Macros.findById(req.params.id);

    if (!macros) return res.status(400).json({ msg: 'Macros not found' });

    // Make sure user owns macros
    if (macros.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Macros.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Macros removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
