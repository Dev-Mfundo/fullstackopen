import { useState } from 'react'

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
  	const {id,value} = e.target
  	if(id==="name")setNewName(value.trim())
  	if(id==="phone-number")setNewNumber(value.trim())
  	if(id==="search")setSearcher(value.trim())
  }
  const filterContacts=(persons,searcher)=>{
  	const filterOut=persons.filter((person)=>person.name.toLowerCase().includes(searcher.toLowerCase()))
  	return filterOut
  }
   const filtered = filterContacts(persons,searcher)
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
      <div>
      		filter shown with <input id="search" type="text" placeholder="search" onChange={handleChange} value={searcher}/>
      </div>
      <h2>add a new</h2>
      <form  onSubmit={handleSave}>
        <div>
          name: <input id="name" type="text" placeholder="name" onChange={handleChange} value={newName}/><br/>
          number: <input id="phone-number" type="tel" placeholder="phone number" onChange={handleChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {searcher.length > 0? 
      filtered.map((person)=>(<p key={person.id}>{person.name} {person.number}</p>)) 
      : persons.map((person)=>(<p key={person.id}>{person.name} {person.number}</p>))}
    </div>
  )
}

export default App