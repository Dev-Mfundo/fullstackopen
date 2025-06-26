import { useState,useEffect } from 'react'
import phonebookServices from './services/phonebook.js'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searcher, setSearcher] = useState('')

  useEffect(()=>{
    phonebookServices
    .getAll()
    .then((initialPhonebook)=>setPersons(initialPhonebook))
  },[])

  const handleChange=(e)=>{
  	e.preventDefault()
  	const {name,value} = e.target
  	if(name==="name")setNewName(value.trim())
  	if(name==="phone-number")setNewNumber(value.trim().replaceAll(' ', '-'))
  	if(name==="search")setSearcher(value.trim())
  }

  const filtered = searcher ? persons.filter((person)=>person.name.toLowerCase().includes(searcher.toLowerCase())) : persons
  const handleSave=(e)=>{
  	e.preventDefault()
  	if(!newName || !newNumber){
  		alert("Fill in all fields!")
  		return
  	}
    const newPerson ={
    	name: newName,
    	number: newNumber
    }

    const check = persons.some((person)=>person.name.toLowerCase() === newPerson.name.toLowerCase())
    if(check){
  		alert(`${newPerson.name} is already added to phonebook`)
    	return 
    }
    phonebookServices
    .create(newPerson)
    .then((newData)=>{
      setPersons(persons.concat(newData))
      setNewName("")
      setNewNumber("")
    })
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleChange} value={searcher}/>
 
      <h3>add a new</h3>
      <PersonForm onSubmit={handleSave} onChange={handleChange} nameValue={newName} numberValue={newNumber}/>
      
      <h3>Numbers</h3>
      <Persons  filtered={filtered}/>
    </div>
  )
}

export default App