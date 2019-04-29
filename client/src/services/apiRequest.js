function getData(endpoint) {
  const url = `http://localhost:3001${endpoint}`

  fetch(url)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
}

module.exports = {
  getData,
};