const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { mealValidation } = require('../Validation');

// Meal Model
const Meal = require('../models/Meal');

// @route   GET api/meal
// @desc    Get all users meal
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const meal = await Meal.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(meal);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/meal
// @desc    add new meal
// @access  Private

router.post('/', auth, async (req, res) => {
  const { error } = mealValidation(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const {
    label,
    foodId,
    meal,
    image,
    ENERC_KCAL,
    FAT,
    CHOCDF,
    PROCNT,
    measures,
    servings,
    size
  } = req.body;

  try {
    const newMeal = new Meal({
      label,
      foodId,
      meal,
      image,
      ENERC_KCAL,
      FAT,
      CHOCDF,
      PROCNT,
      measures,
      servings,
      size,
      user: req.user.id
    });

    const meall = await newMeal.save();

    res.json(meall);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/meal/:id
// @desc    Update meal
// @access  Private

router.put('/:id', auth, async (req, res) => {
  const {
    label,
    foodId,
    meal,
    image,
    ENERC_KCAL,
    FAT,
    CHOCDF,
    PROCNT,
    measures,
    servings,
    size
  } = req.body;

  // Build meal object
  const weightsFields = {};
  if (label) weightsFields.label = label;
  if (foodId) weightsFields.foodId = foodId;
  if (meal) weightsFields.meal = meal;
  if (image) weightsFields.image = image;
  if (ENERC_KCAL) weightsFields.ENERC_KCAL = ENERC_KCAL;
  if (FAT) weightsFields.FAT = FAT;
  if (CHOCDF) weightsFields.CHOCDF = CHOCDF;
  if (PROCNT) weightsFields.PROCNT = PROCNT;
  if (measures) weightsFields.measures = measures;
  if (servings) weightsFields.servings = servings;
  if (size) weightsFields.size = size;

  try {
    let meall = await Meal.findById(req.params.id);

    if (!meall) return res.status(400).json({ msg: 'Meal not found' });

    // Make sure user owns meal
    if (meall.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    meall = await Meal.findByIdAndUpdate(
      req.params.id,
      { $set: weightsFields },
      { new: true }
    );

    res.json(meall);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/meal/:d
// @desc    Delete meal
// @access  Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let meal = await Meal.findById(req.params.id);

    if (!meal) return res.status(400).json({ msg: 'Meal not found' });

    // Make sure user owns meal
    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Meal.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Meal removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
