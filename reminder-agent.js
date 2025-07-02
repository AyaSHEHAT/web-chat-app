require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

console.log('Loaded OpenAI Key:', process.env.OPENAI_API_KEY ? 'YES' : 'NO');

// Helper: parse reminder request using OpenAI
async function parseReminder(text) {
  const prompt = `Extract the reminder task and datetime from this message:\n"${text}"\nReturn as JSON: { "task": "...", "datetime": "YYYY-MM-DD HH:mm:ss" }`;
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  });
  try {
    const json = completion.choices[0].message.content.match(/\{[\s\S]*\}/)[0];
    return JSON.parse(json);
  } catch {
    return null;
  }
}

// Schedule reminder
function scheduleReminder({ task, datetime, email }) {
  const remindAt = new Date(datetime.replace(' ', 'T'));
  const now = new Date();
  const ms = remindAt - now;
  if (ms <= 0) return false;

  setTimeout(() => {
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'AI Reminder',
      text: `Reminder: ${task} (Scheduled for ${datetime})`
    }, (err, info) => {
      if (err) console.error('Email error:', err);
      else console.log('Reminder sent:', info.response);
    });
  }, ms);
  return true;
}

// API endpoint
app.post('/api/reminder', async (req, res) => {
  const { message, email } = req.body;
  const parsed = await parseReminder(message);
  if (!parsed) return res.status(400).json({ error: 'Could not parse reminder.' });

  const ok = scheduleReminder({ ...parsed, email });
  if (!ok) return res.status(400).json({ error: 'Time must be in the future.' });

  res.json({ success: true, reminder: parsed });
});

app.listen(4000, () => console.log('Reminder agent running on http://localhost:4000'));