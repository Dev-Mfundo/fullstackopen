import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const handleChange=(e)=>{
  	e.preventDefault()
  	const {id,value} = e.target
  	if(id==="name")setNewName(value.trim())
  	if(id==="phone-number")setNewNumber(value.trim())
  }

  const handleSave=(e)=>{
  	e.preventDefault()
    const newPerson ={
    	name: newName,
    	number: newNumber
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
      <form  onSubmit={handleSave}>
        <div>
          name: <input id="name" type="text" placeholder="name" onChange={handleChange} value={newName}/>
          number: <input id="phone-number" type="tel" placeholder="phone number" onChange={handleChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=>(<p key={person.name}>{person.name} {person.number}</p>))}
    </div>
  )
}

export default App