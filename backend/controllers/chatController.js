const OpenAI = require('openai');
const Chat = require('../models/Chat');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful academic and career guidance counselor for first generation college students in India. Your role is to:
- Help students with college admissions, scholarships, and career paths
- Explain things in simple language that anyone can understand
- Be encouraging and supportive — these students carry a lot of pressure
- Give practical, actionable advice specific to Indian colleges and opportunities
- If asked in Hindi, respond in Hindi
Keep responses concise and friendly. You are like a knowledgeable elder sibling!`;

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    let chat = await Chat.findOne({ userId: req.user.id });
    if (!chat) {
      chat = new Chat({ userId: req.user.id, messages: [] });
    }

    chat.messages.push({ role: 'user', content: message });

    const openAIMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...chat.messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content,
      }))
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: openAIMessages,
      max_tokens: 500,
    });

    const reply = completion.choices[0].message.content;

    chat.messages.push({ role: 'assistant', content: reply });
    await chat.save();

    res.json({ reply, messages: chat.messages });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getChatHistory = async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.user.id });
    res.json(chat ? chat.messages : []);
  } catch (error) {
  console.error(error);

  if (error.code === "insufficient_quota") {
    return res.status(503).json({
      reply:
        "🚧 AI Mentor is temporarily unavailable because the API usage limit has been reached. Please try again later.",
      messages: [],
    });
  }

  res.status(500).json({
    reply: "Something went wrong. Please try again later.",
    messages: [],
  });
}
};

module.exports = { sendMessage, getChatHistory };