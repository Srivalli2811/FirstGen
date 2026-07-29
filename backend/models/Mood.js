const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  note: {
    type: String,
    default: '',
    trim: true,
  },
  date: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;