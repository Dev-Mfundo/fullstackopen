import {useState,useEffect} from 'react'
import services from './services/api_services'
import Notification from './Notification'

const DisplayResults=({country,countries})=>{
  const [visibility, setVisibility] = useState(null)
  const [weather, setWeather] = useState(null)
  const [latLong, setLatLong] = useState(null)
  const [message, setMessage] = useState("")

  
  useEffect(()=>{
    if(!latLong)return
      services.getWeather(latLong)
    .then((res)=>{
      setWeather(res.data)
    })
    .catch((err)=>{
      setMessage("Failed to fetch weather")
    })
  },[latLong])
  
  const filteredData=countries.filter((item)=>item.name.common.toLowerCase().includes(country.toLowerCase()))

    const handleShow=(country)=>{
    setVisibility(country.name.common)
    setLatLong(country.latlng)
    setWeather(null)
  }


  const renderCountry=(country)=>{
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>{Object.values(country.languages).map((language)=><li key={language}>{language}</li>)}</ul>
        <img src={country.flags.png} alt={`${country.name.common}`}/>
        <h2>Weather in {country.name.common}</h2>
        {weather ? (
        <>
        <p>Temperature {weather.main.temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="weather forecast icon"/>
        <p>Wind {weather.wind.speed} m/s</p>
        </>
        ):(<p>Loading weather</p>)} 
        {!weather && (
          <>
          <Notification message={message}/>
          </>
          )}
      </div>
    )
  }

  const searchResults=()=>{
  if(!country){
    return null
  }

  if(filteredData.length > 10){
    return <p>Too many matches, specify another filter</p>
  }

  if(filteredData.length > 1 && filteredData.length <= 10){
    return (
      <>
        {filteredData.map(item => (
          <div key={item.name.common}>
            {item.name.common}{" "}
            <button onClick={()=>handleShow(item)}>Show</button>
            {visibility === item.name.common && renderCountry(item)}
          </div>
          
        ))}
      </>
    )
  }

   if (filteredData.length === 1) {
      const singleCountry = filteredData[0]
      if (latLong !== singleCountry.latlng) {
        setLatLong(singleCountry.latlng)
      }
      return renderCountry(singleCountry)
    }

  return null
}
 
	return(
	<>
	{searchResults()}
	</>
	)
}

export default DisplayResults