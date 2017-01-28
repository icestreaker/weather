const axios = require('axios');
var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

var location, lat, lng, formatLocation, temp, apprTemp, timeOfReqest;

jQuery('#address-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createaddress', {
    text: jQuery('[userAddress=address]').val()
  }, function (result) {
    location = text;
});
  var encodedAddress = encodeURIComponent(location);
  var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`
  locationButton.on('click', function () {
    axios.get(geocodeUrl).then((response) => {
      if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
      }
      lat = response.data.results[0].geometry.location.lat;
      lng = response.data.results[0].geometry.location.lng;

      formatLocation = response.data.results[0].formatted_address;
      timeOfReqest = moment.format(MMMM Do YYYY, h:mm:ss);
      var weatherUrl = `https://api.forecast.io/forecast/518478e31f58ffdcfef37f1c12700881/${lat},${lng}`;
      axios.get(weatherUrl);
    }).then((response) =>

    temp = response.data.currently.temperature;
    apprTemp = response.data.currently.apparentTemperature;

  }).catch((e) => {
    if (e.code === 'ENOTFOUND') {
      alert('Unable to connect to API servers.');
    } else {
      alert(e.address);
    }

    socket.emit('addResults', {
      timeStamp: timeOfReqest,
      formatAddy: formatLocation,
      realTemp: temp,
      apprTemp: apprTemp
    });
  });
});
