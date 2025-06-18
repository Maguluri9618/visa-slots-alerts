
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const subscribersPath = path.join(__dirname, '../data/subscribers.json');

router.post('/', (req, res) => {
  const { name, visaType, city, phone } = req.body;
  if (!name || !visaType || !city || !phone) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const subscriber = { name, visaType, city, phone };

  let subscribers = [];
  if (fs.existsSync(subscribersPath)) {
    subscribers = JSON.parse(fs.readFileSync(subscribersPath));
  }
  subscribers.push(subscriber);
  fs.writeFileSync(subscribersPath, JSON.stringify(subscribers, null, 2));

  res.status(200).json({ message: 'Subscribed successfully' });
});

module.exports = router;
