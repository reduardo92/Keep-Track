const log = console.log;

require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Cors
app.use(cors());
// Init Middleware
app.use(express.json({ extended: false }));

// define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/macros', require('./routes/macros'));
app.use('/api/weights', require('./routes/weights'));
app.use('/api/cardio', require('./routes/cardio'));
app.use('/api/meal', require('./routes/meal'));
app.use('/api/food', require('./routes/food'));

// Server static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => log(`server started on port ${PORT}`));
