const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { weightsValidation } = require('../Validation');

// Weights Model
const Weights = require('../models/Weights');

// @route   GET api/weights
// @desc    Get all users weights
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const weights = await Weights.find({ user: req.user.id }).sort({
      date: -1
    });

    res.json(weights);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/weights
// @desc    add new weights
// @access  Private

router.post('/', auth, async (req, res) => {
  const { error } = weightsValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const { name, exercise, weight, sets, reps } = req.body;

  try {
    const newWeights = new Weights({
      name,
      exercise,
      sets,
      reps,
      weight,
      user: req.user.id
    });

    const weights = await newWeights.save();

    res.json(weights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/weights/:id
// @desc    Update weights
// @access  Private

router.put('/:id', auth, async (req, res) => {
  const { name, exercise, weight, sets, reps } = req.body;

  // Build weights object
  const weightsFields = {};
  if (name) weightsFields.name = name;
  if (exercise) weightsFields.exercise = exercise;
  if (sets) weightsFields.sets = sets;
  if (reps) weightsFields.reps = reps;
  if (weight) weightsFields.weight = weight;

  try {
    let weights = await Weights.findById(req.params.id);

    if (!weights) return res.status(400).json({ msg: 'Weights not found' });

    // Make sure user owns weights
    if (weights.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    weights = await Weights.findByIdAndUpdate(
      req.params.id,
      { $set: weightsFields },
      { new: true }
    );

    res.json(weights);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/weights/:id
// @desc    Delete weights
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let weights = await Weights.findById(req.params.id);

    if (!weights) return res.status(400).json({ msg: 'Weights not found' });

    // Make sure user owns weights
    if (weights.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Weights.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Weights removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
