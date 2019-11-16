const mongoose = require('mongoose');

const MacrosSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  calories: {
    type: String,
    require: true
  },
  fat: {
    type: String,
    require: true
  },
  carbs: {
    type: String,
    require: true
  },
  protein: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('macros', MacrosSchema);
