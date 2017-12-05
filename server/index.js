const express = require('express');
const http = require('http');

/**
 * Create Express server.
 */
const app = express()
const server = http.Server(app)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/bin/client/index.html');
});

/**
 * Start Express server.
 */
server.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
