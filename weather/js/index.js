const axios = require('axios');
const jquery = require('jquery');
const express = require('express');
const moment = require('moment');

var socket = io();


// socket.on('connect', function () {
//   console.log('Connected to server');
// });

// socket.on('disconnect', function () {
//   console.log('Disconnected from server');
// });

var location, lat, lng, formatLocation, temp, apprTemp, timeOfReqest;

jquery('#submit').click(function(event) {
  event.preventDefault();

  $.ajax(this.href, {
    success: function(data) {
      $('#addressForm').html($(data).find('#text *'));
      location = data;
    },
    error: function() {
      alert('No address has been entered');
    }
  });

  var encodedAddress = encodeURIComponent(location);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
  var timeStamp = moment.format(MMMM Do YYYY, h:mm:ss);
  $.ajax({
    url: geocodeUrl,
    data: {
        format: 'json'
    },
    error: function() {
      alert('An Error Has Occurred');
    },
    dataType: 'jsonp',
    success: function (data) {
      lat = response.data.results[0].geometry.location.lat;
      lng = response.data.results[0].geometry.location.lng;
      var $time = $('<p>').text(timeStamp);
      var $place = $('<p>').text(response.data.results[0].formatted_address);
      $('#weather')
        .append($time)
        .append($place);
    },
    type: 'GET'

    location.reload(true);
  });

  var weatherUrl = `https://api.forecast.io/forecast/518478e31f58ffdcfef37f1c12700881/${lat},${lng}`;

  $.ajax({
    url: weatherUrl,
    data: {
      format: 'json'
    },
    error: function() {
      alert('An Error Has Occurred Getting the Weather');
    },
    dataType: 'jsonp',
    success: function(data) {
      var $temp = $('<p>It is ').text(response.data.currently.temperature);
      var $appTemp = $('<p>It feels like ').text(response.data.currently.apparentTemperature);
      $('#weather')
        .append($temp),
        .append($appTemp);
    },
    type: 'GET'
  });

  $('#weather').load(this.href + '#weather *')};
)};


  //Call API to get coordinates for given address, if available.
  //   axios.get(geocodeUrl).then((response) => {
  //     if (response.data.status === 'ZERO_RESULTS') {
  //       throw new Error('Unable to find that address.');
  //     }
  //
  //     lat = response.data.results[0].geometry.location.lat;
  //     lng = response.data.results[0].geometry.location.lng;
  //
  //     formatLocation = response.data.results[0].formatted_address;
  //
  //     timeOfReqest = moment.format(MMMM Do YYYY, h:mm:ss);
  // //With Longitude and Latitude, call API to get weather information.
  //     axios.get(weatherUrl).then((response) => {
  //
  //
  //     apprTem = response.data.currently.apparentTemperature;
  //
  //     }).catch((e) => {
  //     if (e.code === 'ENOTFOUND') {
  //       alert('Unable to connect to API servers.');
  //     } else {
  //       alert(e.address);
//       }
//     )}
//   )};
// )};

// socket.on('addressMessage' function (weather) {
//   if (jquery('#weather').isNotEmpty() => jquery('#weather').empty());
//   socket.emit('emitWeather', {
//     res('/').render('./weather/home.html');
//   )};
//   });
// });
