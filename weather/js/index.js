const axios = require('axios');
const jquery = require('jquery');
const express = require('express');
const moment = require('moment');

var socket = io();


socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

var lat, lng, formatLocation, temp, apprTemp, timeOfReqest;

jquery('#addressForm').on('submit', function (e) {
  e.preventDefault();
  var location = jquery('#text').val();
  var encodedAddress = encodeURIComponent(location);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
  var weatherUrl = `https://api.forecast.io/forecast/518478e31f58ffdcfef37f1c12700881/${lat},${lng}`;

  //Call API to get coordinates for given address, if available.
    axios.get(geocodeUrl).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
      }

      lat = response.data.results[0].geometry.location.lat;
      lng = response.data.results[0].geometry.location.lng;

      formatLocation = response.data.results[0].formatted_address;

      timeOfReqest = moment.format(MMMM Do YYYY, h:mm:ss);
  //With Longitude and Latitude, call API to get weather information.
      axios.get(weatherUrl).then((response) => {

      temp = response.data.currently.temperature;
      apprTem = response.data.currently.apparentTemperature;

      }).catch((e) => {
      if (e.code === 'ENOTFOUND') {
        alert('Unable to connect to API servers.');
      } else {
        alert(e.address);
      }
    )}
  )};
)};

socket.on('addressMessage' function (weather) {
  if (jquery('#weather').isNotEmpty() => jquery('#weather').empty());
  var li = jquery('<li></li>');
  li.text(`At: ${timestamp}: \n
           On or Around: ${formatLocation} \n
           It was ${temp} outside, yet \n
           it may have felt like it was ${apprTemp}.`);
  jquery('#weather').append(li);
  socket.emit('emitWeather', {
    res('/').render('./weather/home.html', {
    weather: jquery('#weather')
  )};
  });
});
