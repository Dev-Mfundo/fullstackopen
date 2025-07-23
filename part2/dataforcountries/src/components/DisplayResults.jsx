import {useState} from 'react'

const DisplayResults=({country,countries})=>{
  const [visibility, setVisibility] = useState(null)

  const filteredData=countries.filter((item)=>item.name.common.toLowerCase().includes(country.toLowerCase()))

    const handleShow=(countryName)=>{
    setVisibility(countryName)
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
            {item.name.common}
            <button onClick={()=>handleShow(item.name.common)}>Show</button>
            {visibility === item.name.common && renderCountry(item)}
          </div>
          
        ))}
      </>
    )
  }

  if(filteredData.length === 1){
    return renderCountry(filteredData[0])
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