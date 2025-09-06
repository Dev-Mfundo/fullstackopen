import { useState,useEffect } from 'react'
import phonebookServices from './services/phonebook.js'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


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
    .catch((err)=>{
      setPersons([])
      setMessage({
        error: err.response.data.error
      })
    })
  },[])

  const handleChange=(e)=>{
  	e.preventDefault()
  	const {name,value} = e.target
  	if(name==="name")setNewName(value.trim())
  	if(name==="phone-number")setNewNumber(value.trim())
  	if(name==="search")setSearcher(value.trim())
  }


  const handleSave=(e)=>{
  	e.preventDefault()
  	if(!newName || !newNumber){
  		setMessage({
        error:"Fill in all fields!"
      })
      setTimeout(()=>{
      setMessage(null)
      },3000)
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
          setMessage({
            success:`Updated ${newPerson.name}`
          })
          setNewName("")
          setNewNumber("")
          setTimeout(()=>{
          setMessage(null)
          },3000)
        })
        .catch((err)=>{
          if (err.response && err.response.status === 404) {
          setMessage({
          error: `Information of ${check.name} has already been removed from the server`
          })
          }else{
            setMessage({
            err.response.data.error
          })
          }
          setTimeout(()=>{
            setMessage(null)
          },3000)
          setNewName("")
          setNewNumber("")

        })
    }
     return
  }
    phonebookServices
    .create(newPerson)
    .then((newData)=>{
      setPersons(persons.concat(newData))
      setMessage({
        success:`Added ${newPerson.name}`
      })
      setNewName("")
      setNewNumber("")
      setTimeout(()=>{
      setMessage(null)
      },3000)
    })
    .catch(err=>{
      setMessage({
        err.response.data.error
      })
      setNewName("")
      setNewNumber("")
      setTimeout(()=>{
      setMessage(null)
      },3000)
    })
  }

  const handleDelete=(id)=>{
    const currentPerson = persons.find(person=>person.id===id? person : null)
    if(!window.confirm(`Delete ${currentPerson.name} ?`))return
    phonebookServices
    .deleteContact(id)
    .then(()=>{
      setPersons(persons.filter((person)=>person.id !== id))
      setMessage({
        success: `Deleted ${currentPerson.name} successfully`
        })
      setTimeout(()=>{
      setMessage(null)
      },3000)
    })
    .catch(err=>{
      setMessage({
        error:`Information of ${currentPerson.name} has already been removed from the server`
      })
      setTimeout(()=>{
      setMessage(null)
      },3000)
    })
  }
  const filtered = searcher ? persons.filter((person)=>person.name.toLowerCase().includes(searcher.toLowerCase())) : persons
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter onChange={handleChange} value={searcher}/>
 
      <h3>add a new</h3>
      <PersonForm onSubmit={handleSave} onChange={handleChange} nameValue={newName} numberValue={newNumber}/>
      
      <h3>Numbers</h3>
      <Persons  filtered={filtered} handleDelete={handleDelete}/>
    </div>
  )
}

export default App