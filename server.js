
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const subscribeRoute = require('./routes/subscribe');
const adminRoute = require('./routes/admin');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/subscribe', subscribeRoute);
app.use('/admin', adminRoute);

app.get('/', (req, res) => {
  res.send('Visa Slot Alerts Server Running');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
