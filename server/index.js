const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/**
 * Import models.
 */
const Leaderboard = require('./leaderboard');

/**
 * Load environment variables from .env file.
 */
dotenv.load({ path: '.env' });

/**
 * Create Express server.
 */
const app = express()
const server = http.Server(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

// Use build files
app.use(express.static(path.join(__dirname, '../build')));

// Get leaderboard
app.get('/leaderboard', (req, res) => {
  Leaderboard
    .find()
    .sort({ score: 1 })
    .limit(5)
    .exec((err, scores) => {
      if (err) {
        return res.status(500).json({ error: err })
      }
      return res.status(200).json({
        scores
      })
    })
});

// Add to leaderboard
app.post('/leaderboard', (req, res) => {
  const score = req.body.score;
  if (score === undefined) {
    return res.status(400).json({ error: 'score undefined' })
  }
  const leaderboard = Leaderboard({ score })
  leaderboard.save((err) => {
    if (err) {
      return res.status(500).json({ error: err })
    }
    return res.status(200).json('Success!')
  })
});

/**
 * Express confidguration.
 */
app.set('port', process.env.PORT || 3000);

/**
 * Start Express server.
 */
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
