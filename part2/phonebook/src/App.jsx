import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const handleChange=(e)=>{
  	e.preventDefault()
  	const {value} = e.target
  	setNewName(value.trim())
  }

  const handleSave=(e)=>{
  	e.preventDefault()
    const newPerson ={
    	name: newName
    }

    const check = persons.some((person)=>person.name.toLowerCase() === newPerson.name.toLowerCase())
    if(check){
  		alert(`${newPerson.name} is already added to phonebook`)
    	return 
    }

  	setPersons(persons.concat(newPerson))
   	setNewName("")
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form  onSubmit={handleSave}>
        <div>
          name: <input id="name" placeholder="name" onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=>(<p key={person.name}>{person.name}</p>))}
    </div>
  )
}

export default App