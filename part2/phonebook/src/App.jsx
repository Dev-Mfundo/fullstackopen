import { useState,useEffect } from 'react'
import phonebookServices from './services/phonebook.js'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Noification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searcher, setSearcher] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(()=>{
    phonebookServices
    .getAll()
    .then((initialPhonebook)=>setPersons(initialPhonebook))
  },[])

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
    	name: newName.trim(),
    	number: newNumber.trim()
    }
    const check = persons.find((person)=>person.name.toLowerCase() === newPerson.name.toLowerCase())
    if(check){
    if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const updatePerson = {...check, number:newNumber}
        phonebookServices
        .updateContact(check.id,updatePerson)
        .then(res=>{
          setPersons(persons.map(person=>person.id === res.id ? res: person))
          setMessage(`Updated ${newPerson.name}`)
          setNewName("")
          setNewNumber("")
          setTimeout(()=>{
            setMessage(null)
          },3000)
        })
        .catch(err=>alert(`Failed to update ${check.name}'s number`))
    }
     return
  }
    phonebookServices
    .create(newPerson)
    .then((newData)=>{
      setPersons(persons.concat(newData))
      setMessage(`Added ${newPerson.name}`)
      setNewName("")
      setNewNumber("")
      setTimeout(()=>{
            setMessage(null)
      },3000)
    })
    .catch(err=>alert(`Failed to add ${newPerson.name}`))
  }
  
  const handleDelete=(id)=>{
    const currentPerson = persons.find(person=>person.id===id? person : null)
    if(!window.confirm(`Delete ${currentPerson.name} ?`))return
    phonebookServices
    .deleteContact(id)
    .then(()=>setPersons(persons.filter((person)=>person.id !== id)))
    .catch(err=>alert(`Failed to delete ${currentPerson.name}`))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Noification message={message}/>
      <Filter onChange={handleChange} value={searcher}/>
 
      <h3>add a new</h3>
      <PersonForm onSubmit={handleSave} onChange={handleChange} nameValue={newName} numberValue={newNumber}/>
      
      <h3>Numbers</h3>
      <Persons  filtered={filtered} handleDelete={handleDelete}/>
    </div>
  )
}

export default App