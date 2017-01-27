const axios = require('axios');
var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

jQuery('#address-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[userAddress=address]').val()
  }, function () {

  });
});

var locationButton = jQuery('#send-location');
var encodedAddress = encodeURIComponent('#userAddress');
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

var locationButton('#send-location');
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
}).then((response) =>

  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;

}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    alert('Unable to connect to API servers.');
  } else {
    alert(e.message);
  }

  socket.emit('addResults', {
    formatAddy: location,
    realTemp: temperature,
    apprTemp: apparentTemperature
  });
});
