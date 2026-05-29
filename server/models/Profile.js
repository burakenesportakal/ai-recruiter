const mongoose = require('mongoose');
const { isValidSkillCategory } = require('../data/skillCategories');

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
  title: {
    type: String,
    default: '',
    maxlength: 100,
  },
  avatarPath: {
    type: String,
    default: '',
  },
  links: {
    github:     { type: String, default: '' },
    linkedin:   { type: String, default: '' },
    artstation: { type: String, default: '' },
    website:    { type: String, default: '' },
  },
  skills: [{
    category: {
      type: String,
      required: true,
      validate: {
        validator: isValidSkillCategory,
        message: 'Geçersiz yetenek kategorisi',
      },
    },
    name: {
      type: String,
      required: true,
      maxlength: 80,
    },
  }],
  experience: [{
    company: {
      type: String,
      required: true,
      maxlength: 100,
    },
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    description: {
      type: String,
      default: '',
      maxlength: 1000,
    },
  }],
  education: [{
    institution: {
      type: String,
      required: true,
      maxlength: 150,
    },
    degree: {
      type: String,
      required: true,
      maxlength: 100,
    },
    fieldOfStudy: {
      type: String,
      required: true,
      maxlength: 100,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
  }],
  projects: [{
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    technologies: [{
      type: String,
      maxlength: 30,
    }],
    githubUrl: {
      type: String,
      default: '',
      maxlength: 200,
    },
  }],
  cvPath: {
    type: String,
    default: '',
  },
  cvText: {
    type: String,
    default: '',
  },
  linkContext: {
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
  suggestedQuestions: [{
    type: String,
    maxlength: 200,
  }],
  suggestedQuestionsHash: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Profile', ProfileSchema);