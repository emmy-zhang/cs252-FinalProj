const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

/**
 * Create Express server.
 */
const app = express()
const server = http.Server(app)

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
    process.exit(1);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/bin/client/index.html');
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
