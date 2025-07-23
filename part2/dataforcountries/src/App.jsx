import {useState,useEffect} from 'react'
import services from './components/services/api_services.jsx'
import DisplayResults from './components/DisplayResults.jsx'
import Form from './components/Form.jsx'
import Notification from './components/Notification.jsx'

const App=()=>{
  const [country, setCountry] = useState("")
  const [countries, setCountries] = useState([])
  const [message, setMessage] = useState("")

  useEffect(()=>{
    if(country.trim() !== ""){
    services.getCountries()
    .then((res)=>{
      setCountries(res.data)
    }).catch((err)=>{
      setMessage("Failed to fetch data")
      setCountries([])
    })
  }
  },[country])
  

  return(
    <>
    <Form country={country} setCountry={setCountry}/>
    <Notification message={message}/>
    <DisplayResults country={country} countries={countries}/>
    </>
    )
}

export default App