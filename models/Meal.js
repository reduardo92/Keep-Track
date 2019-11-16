const mongoose = require('mongoose');

const MealSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  label: {
    type: String,
    require: true
  },
  foodId: {
    type: String,
    require: true
  },
  image: String,
  ENERC_KCAL: {
    type: String,
    require: true
  },
  FAT: {
    type: String,
    require: true
  },
  CHOCDF: {
    type: String,
    require: true
  },
  PROCNT: {
    type: String,
    require: true
  },
  meal: {
    type: String,
    require: true
  },
  measures: {
    type: Array,
    require: true
  },
  servings: {
    type: String,
    require: true
  },
  size: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('meals', MealSchema);
