const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    default: 'My Resume',
    trim: true,
  },
  template: {
    type: String,
    enum: ['modern', 'professional', 'minimal'],
    default: 'modern',
  },
  personalInfo: {
    fullName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    address: { type: String, default: '' },
    objective: { type: String, default: '' },
  },
  education: [{
    collegeName: { type: String, default: '' },
    degree: { type: String, default: '' },
    year: { type: String, default: '' },
    gpa: { type: String, default: '' },
  }],
  skills: [{ type: String }],
  projects: [{
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    technologies: { type: String, default: '' },
    link: { type: String, default: '' },
  }],
  experience: [{
    company: { type: String, default: '' },
    role: { type: String, default: '' },
    duration: { type: String, default: '' },
    description: { type: String, default: '' },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

resumeSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Resume', resumeSchema);
