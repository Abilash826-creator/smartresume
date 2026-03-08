// POST /api/ai/improve-text
const improveText = async (req, res) => {
  try {
    const { text, type } = req.body;

    if (!text || text.trim().length < 5) {
      return res.status(400).json({ message: 'Please provide meaningful text to improve' });
    }

    // Mock AI improvement logic
    const improved = mockAIImprove(text, type);

    res.json({
      original: text,
      improved,
      type: type || 'general',
    });
  } catch (error) {
    res.status(500).json({ message: 'AI improvement failed', error: error.message });
  }
};

function mockAIImprove(text, type) {
  const templates = {
    objective: [
      `Results-driven and highly motivated professional with demonstrated expertise in ${extractKeywords(text)}. Committed to leveraging technical skills and innovative thinking to drive organizational success and deliver exceptional outcomes in dynamic environments.`,
      `Ambitious and detail-oriented individual seeking to apply strong ${extractKeywords(text)} skills to contribute meaningfully to a forward-thinking organization. Dedicated to continuous learning and professional excellence.`,
    ],
    project: [
      `Engineered and deployed ${text.split(' ').slice(0, 3).join(' ')} leveraging modern technologies to deliver a scalable, high-performance solution. Demonstrated strong problem-solving abilities and technical acumen throughout the development lifecycle, resulting in improved efficiency and user satisfaction.`,
      `Architected a comprehensive ${text.split(' ').slice(0, 3).join(' ')} solution, incorporating best practices in software design and development. Collaborated cross-functionally to ensure timely delivery while maintaining code quality and performance benchmarks.`,
    ],
    skill: [
      text.split(',').map(s => s.trim()).filter(Boolean).map(s =>
        s.charAt(0).toUpperCase() + s.slice(1)
      ).join(' • '),
    ],
    experience: [
      `Spearheaded ${text.split(' ').slice(0, 4).join(' ')}, driving measurable improvements in team productivity and project outcomes. Collaborated with cross-functional stakeholders to align technical solutions with business objectives, consistently delivering high-quality results within deadline and budget constraints.`,
    ],
    general: [
      `${text.charAt(0).toUpperCase() + text.slice(1).trim()}. Demonstrated exceptional proficiency and commitment to excellence while contributing significantly to organizational goals and team objectives.`,
    ],
  };

  const category = type && templates[type] ? type : 'general';
  const options = templates[category];
  return options[Math.floor(Math.random() * options.length)];
}

function extractKeywords(text) {
  const stopWords = ['the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'is', 'are', 'i', 'my', 'me'];
  return text
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.includes(w.toLowerCase()))
    .slice(0, 4)
    .join(', ') || 'technical and analytical';
}

module.exports = { improveText };
