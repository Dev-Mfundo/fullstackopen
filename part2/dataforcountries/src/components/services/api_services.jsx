import axios from 'axios'

const COUNTRY_API_URL = import.meta.env.VITE_COUNTRY_API
const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const getCountries = () => axios.get(COUNTRY_API_URL);

const getWeather = ([lat, lon]) =>
  axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      lat,
      lon,
      units: 'metric',
      appid: OPEN_WEATHER_API_KEY,
    },
  })

const services = { getCountries, getWeather }

export default services