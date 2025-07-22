import {useState,useEffect} from 'react'
import services from './components/services/api_services.jsx'
import DisplayResults from './components/DisplayResults.jsx'
import Form from './components/Form.jsx'

const App=()=>{
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState([])
  const [message, setMessage] = useState("")

  useEffect(()=>{
    services.getCountries()
    .then((res)=>{
      setCountries(res.data)
    }).catch((err)=>{
      setMessage("Failed to fetch data")
    })
  },[])
  
  const handleChange=(e)=>{
    const {id, value} = e.target
    setCountry(value)
  }
  

  return(
    <>
    <Form country={country} handleChange={handleChange}/>
    <DisplayResults country={country} countries={countries}/>
    </>
    )
}

export default App