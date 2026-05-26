const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500,
  },
  links: {
    github:   { type: String, default: '' },
    linkedin: { type: String, default: '' },
    artbook:  { type: String, default: '' },
    website:  { type: String, default: '' },
  },
  cvPath: {
    type: String,
    default: '',
  },
  cvText: {
    type: String,
    default: '',
  },
  profileViews: {
    type: Number,
    default: 0,
  },
  chatCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);