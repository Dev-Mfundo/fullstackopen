import axios from 'axios'

const URL_LINK = import.meta.env.VITE_COUNTRY_API

const getCountries=()=>axios.get(`${URL_LINK}`)

const services = {getCountries}

export default services