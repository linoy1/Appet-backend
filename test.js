const fetch = require('node-fetch');

fetch('https://api.thedogapi.com/v1/breeds/search?q=akita')
  .then((response) => response.json())
  .then((data) => console.log(data[0].name))
  .catch((err) => console.log(err));
