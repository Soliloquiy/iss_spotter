const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body)['ip'];
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  //creating multiple key:value simultaneously like module.exports and require
  const { latitude, longitude } = JSON.parse(body);
  return request(`http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}`);

};

//Instead of exporting all functions. Create single function to execute them
const nextISSTimesForMyLocation = function() {
  //Use same process as established in index2
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((body) => {
    const { response } = JSON.parse(body);
    return response;
  })
};

module.exports = { nextISSTimesForMyLocation };