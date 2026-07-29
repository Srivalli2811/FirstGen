const User = require('../models/User');
const Mood = require('../models/Mood');

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password');

    const studentsWithMood = await Promise.all(
      students.map(async (student) => {
        const moods = await Mood.find({ userId: student._id })
          .sort({ createdAt: -1 })
          .limit(3);

        const isBurnout = moods.length >= 3 &&
          moods.every(m => m.score <= 2);

        return {
          ...student.toObject(),
          recentMoods: moods,
          burnoutAlert: isBurnout,
          lastMoodDate: moods[0]?.date || 'No entries yet',
          lastMoodScore: moods[0]?.score || null,
        };
      })
    );

    res.json(studentsWithMood);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentMoods = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await User.findById(studentId).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const moods = await Mood.find({ userId: studentId })
      .sort({ createdAt: -1 });

    const isBurnout = moods.length >= 3 &&
      moods.slice(0, 3).every(m => m.score <= 2);

    res.json({
      student,
      moods,
      burnoutAlert: isBurnout,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllStudents, getStudentMoods };