const Mood = require('../models/Mood');

function detectBurnout(moods) {
  if (moods.length < 3) return false;
  const recentMoods = moods.slice(0, 3);
  const allLow = recentMoods.every(mood => mood.score <= 2);
  return allLow;
}

const logMood = async (req, res) => {
  try {
    const { score, note } = req.body;
    const today = new Date().toDateString();

    const existingMood = await Mood.findOne({
      userId: req.user.id,
      date: today,
    });

    if (existingMood) {
      existingMood.score = score;
      existingMood.note = note;
      await existingMood.save();
      return res.json({ message: 'Mood updated!', mood: existingMood });
    }

    const mood = new Mood({
      userId: req.user.id,
      score,
      note,
      date: today,
    });

    await mood.save();
    res.status(201).json({ message: 'Mood logged!', mood });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    const isBurnout = detectBurnout(moods);

    res.json({
      moods,
      burnoutAlert: isBurnout,
      burnoutMessage: isBurnout
        ? "⚠️ You've been feeling low for several days. Please talk to a counselor or trusted person!"
        : null
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodayMood = async (req, res) => {
  try {
    const today = new Date().toDateString();
    const mood = await Mood.findOne({
      userId: req.user.id,
      date: today,
    });
    res.json(mood || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { logMood, getMoods, getTodayMood };