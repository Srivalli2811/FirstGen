const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['student', 'counselor'],
    default: 'student',
  },
  college: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    enum: ['english', 'hindi'],
    default: 'english',
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;