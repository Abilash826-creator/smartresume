const Resume = require('../models/Resume');

// POST /api/resume/create
const createResume = async (req, res) => {
  try {
    const { title, template, personalInfo, education, skills, projects, experience } = req.body;

    const resume = await Resume.create({
      userId: req.user._id,
      title: title || 'My Resume',
      template: template || 'modern',
      personalInfo: personalInfo || {},
      education: education || [],
      skills: skills || [],
      projects: projects || [],
      experience: experience || [],
    });

    res.status(201).json({ message: 'Resume created', resume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create resume', error: error.message });
  }
};

// GET /api/resume/user
const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    res.json({ resumes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
  }
};

// GET /api/resume/:id
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ resume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resume', error: error.message });
  }
};

// PUT /api/resume/update/:id
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    const { title, template, personalInfo, education, skills, projects, experience } = req.body;

    if (title !== undefined) resume.title = title;
    if (template !== undefined) resume.template = template;
    if (personalInfo !== undefined) resume.personalInfo = personalInfo;
    if (education !== undefined) resume.education = education;
    if (skills !== undefined) resume.skills = skills;
    if (projects !== undefined) resume.projects = projects;
    if (experience !== undefined) resume.experience = experience;
    resume.updatedAt = Date.now();

    await resume.save();
    res.json({ message: 'Resume updated', resume });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update resume', error: error.message });
  }
};

// DELETE /api/resume/delete/:id
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete resume', error: error.message });
  }
};

module.exports = { createResume, getUserResumes, getResumeById, updateResume, deleteResume };
