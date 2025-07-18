const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken  = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

app.post('/send-alert', async (req, res) => {
  const { to, message } = req.body;

  try {
    const msg = await client.messages.create({
      body: message,
      from: fromNumber,
      to
    });
    res.status(200).json({ success: true, sid: msg.sid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));