let axios = require('axios');

const API_KEY = 'c35dbe8e1d8a4c269133723605dca66d';

const getForecast = () => {
    return axios.get(`https://api.darksky.net/forecast/${API_KEY}/37.8267,-122.4233`);
};


module.exports = getForecast;