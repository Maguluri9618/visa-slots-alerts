
const twilio = require('twilio');
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

async function sendWhatsApp(toNumber, message) {
  try {
    await client.messages.create({
      body: message,
      from: fromNumber,
      to: `whatsapp:${toNumber}`
    });
    console.log('Sent message to', toNumber);
  } catch (err) {
    console.error('Failed to send message to', toNumber, err.message);
  }
}

module.exports = sendWhatsApp;
