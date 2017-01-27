const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const axios = require('axios');
const jQuery = require('jQuery');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/weather');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connect', function () {
  console.log('Connected to server');
});

io.on('disconnect', function () {
  console.log('Disconnected from server');
});

// jQuery('#address-form').on('submit', function (e) {
//   e.preventDefault();
//
// socket.emit('createAddress', {
//     from: 'User',
//     text: jQuery('[userAddress=address]').val()
//   }, function () {
//
//   });
// });

var locationButton = jQuery('#send-location');
var encodedAddress = encodeURIComponent(locationButton);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

locationButton.on('click', function () {
  axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var location = response.data.results[0].formatted_address;

  var weatherUrl = `https://api.forecast.io/forecast/518478e31f58ffdcfef37f1c12700881/${lat},${lng}`;
  axios.get(weatherUrl);
  var tmp = response.data.currently.temperature;
  var apprTmp = response.data.currently.apparentTemperature;

  })
}).then((response) => {
  app.get('/', (req, res) => {
    res.render('./weather/home.html', {
      formatAddy: location,
      realTemp: temperature,
      apprTemp: apparentTemperature
    });
  });
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    alert('Unable to connect to API servers.');
  } else {
    alert(e.message);
  }
});

  // socket.emit('addResults', {
  //   formatAddy: location,
  //   realTemp: tmp,
  //   apprTemp: apprTmp
  // });
//
// app.get('/', (req, res) => {
//   res.render('./weather/home.html', {
//     formatAddy: location,
//     realTemp: temperature,
//     apprTemp: apparentTemperature
//   });
// });

server.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});
