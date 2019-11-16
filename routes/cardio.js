const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { cardioValidation } = require('../Validation');

// Cardio Model
const Cardio = require('../models/Cardio');

// @route   GET api/cardio
// @desc    Get all users cardio
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const cardio = await Cardio.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(cardio);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/cardio
// @desc    add new cardio
// @access  Private

router.post('/', auth, async (req, res) => {
  const { error } = cardioValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, exercise, time, calories } = req.body;

  try {
    const newWeights = new Cardio({
      name,
      exercise,
      time,
      calories,
      user: req.user.id
    });

    const cardio = await newWeights.save();

    res.json(cardio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/cardio/:id
// @desc    Update cardio
// @access  Private

router.put('/:id', auth, async (req, res) => {
  const { name, exercise, time, calories } = req.body;

  // Build cardio object
  const weightsFields = {};
  if (name) weightsFields.name = name;
  if (exercise) weightsFields.exercise = exercise;
  if (time) weightsFields.time = time;
  if (calories) weightsFields.calories = calories;

  try {
    let cardio = await Cardio.findById(req.params.id);

    if (!cardio) return res.status(400).json({ msg: 'Cardio not found' });

    // Make sure user owns cardio
    if (cardio.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    cardio = await Cardio.findByIdAndUpdate(
      req.params.id,
      { $set: weightsFields },
      { new: true }
    );

    res.json(cardio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/cardio/:id
// @desc    Delete cardio
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let cardio = await Cardio.findById(req.params.id);

    if (!cardio) return res.status(400).json({ msg: 'Cardio not found' });

    // Make sure user owns cardio
    if (cardio.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Cardio.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Cardio removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
