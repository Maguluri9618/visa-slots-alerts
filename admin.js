
const express = require('express');
const fs = require('fs');
const path = require('path');
const sendWhatsApp = require('../utils/sendWhatsApp');
const router = express.Router();

const slotsPath = path.join(__dirname, '../data/slots.json');
const subscribersPath = path.join(__dirname, '../data/subscribers.json');

router.post('/update-slot', async (req, res) => {
  const { visaType, city, availableDate } = req.body;
  if (!visaType || !city || !availableDate) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  let slots = {};
  if (fs.existsSync(slotsPath)) {
    slots = JSON.parse(fs.readFileSync(slotsPath));
  }
  const key = `${visaType}-${city}`;
  slots[key] = availableDate;
  fs.writeFileSync(slotsPath, JSON.stringify(slots, null, 2));

  const subscribers = JSON.parse(fs.readFileSync(subscribersPath));
  const matches = subscribers.filter(
    s => s.visaType === visaType && s.city === city
  );

  for (const sub of matches) {
    await sendWhatsApp(sub.phone, `✅ New visa slot available for ${visaType} in ${city}: ${availableDate}`);
  }

  res.status(200).json({ message: `Slot updated and ${matches.length} alerts sent.` });
});

module.exports = router;
