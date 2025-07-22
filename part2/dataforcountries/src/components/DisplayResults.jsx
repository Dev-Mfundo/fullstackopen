import {useState} from 'react'

const DisplayResults=({country,countries})=>{
  const [visibility, setVisibility] = useState(null)

  const filteredData=countries.filter((item)=>item.name.common.toLowerCase().includes(country.toLowerCase()))

  const handleVisibility=()=>{}

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
          <p key={item.name.common}>{item.name.common} <button>Show</button></p>
        ))}
      </>
    )
  }

  if(filteredData.length === 1){
    const country = filteredData[0]
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>{Object.values(country.languages).map((language)=><li key={language}>{language}</li>)}</ul>
        <img src={country.flags.png} alt={`${country.name.common}`}/>
      </div>
    )
  }

  return null
}
const display = searchResults()
	return(
	<>
	{display}
	</>
	)
}

export default DisplayResults