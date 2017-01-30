const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const axios = require('axios');
const moment = require('moment');
const mustache = require('mustache');
const jquery = require('jquery');
const njs = require('njs');
const infrajs = require('infrajs');
const HTMLpaser = require('htmlparser');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = (express.static(__dirname + '/weather'));
app.set('views', publicPath);
app.engine('html', require('ejs').renderfile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('home.html');
});

server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});
