const mongoose = require('mongoose');

const WeightsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    require: true
  },
  exercise: {
    type: String,
    require: true
  },
  sets: {
    type: String,
    require: true
  },
  reps: {
    type: String,
    require: true
  },
  weight: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('weights', WeightsSchema);
