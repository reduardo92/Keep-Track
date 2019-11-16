const mongoose = require('mongoose');

const CardioSchema = mongoose.Schema({
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
  time: {
    type: String,
    require: true
  },
  calories: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('cardio', CardioSchema);
