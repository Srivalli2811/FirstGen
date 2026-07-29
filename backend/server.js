const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const moodRoutes = require('./routes/mood');
const chatRoutes = require('./routes/chat');
const counselorRoutes = require('./routes/counselor');

const app = express();

connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/counselor', counselorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const User = require("./models/User");

app.get("/debug/users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});