import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searcher, setSearcher] = useState('')

  const handleChange=(e)=>{
  	e.preventDefault()
  	const {name,value} = e.target
  	if(name==="name")setNewName(value.trim())
  	if(name==="phone-number")setNewNumber(value.trim())
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
    	number: newNumber,
    	id: persons.length + 1
    }

    const check = persons.some((person)=>person.name.toLowerCase() === newPerson.name.toLowerCase())
    if(check){
  		alert(`${newPerson.name} is already added to phonebook`)
    	return 
    }
  	setPersons(persons.concat(newPerson))
   	setNewName("")
   	setNewNumber("")
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