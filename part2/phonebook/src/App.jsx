import { useState, useEffect } from 'react'
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
  const [message, setMessage] = useState(null) // { type: 'success' | 'error', text: string }

  // Fetch initial phonebook
  useEffect(() => {
    phonebookServices
      .getAll()
      .then(initialPhonebook => setPersons(initialPhonebook))
      .catch(err => {
        const errorMsg = err.response?.data?.error || 'Failed to fetch phonebook'
        setPersons([])
        setMessage({ type: 'error', text: errorMsg })
        setTimeout(() => setMessage(null), 3000)
      })
  }, [])

  // Handle form input changes
  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'name') setNewName(value)
    if (name === 'phone-number') setNewNumber(value)
    if (name === 'search') setSearcher(value)
  }

  // Save new or update existing contact
  const handleSave = e => {
    e.preventDefault()
    if (!newName || !newNumber) {
      setMessage({ type: 'error', text: 'Fill in all fields!' })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    const newPerson = { name: newName.trim(), number: newNumber.trim() }
    const existing = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase())

    if (existing) {
      if (window.confirm(`${newPerson.name} is already added. Replace the old number with a new one?`)) {
        const updatedPerson = { ...existing, number: newNumber }
        phonebookServices
          .updateContact(existing.id, updatedPerson)
          .then(res => {
            setPersons(persons.map(p => (p.id === res.id ? res : p)))
            setMessage({ type: 'success', text: `Updated ${newPerson.name}` })
            setNewName('')
            setNewNumber('')
            setTimeout(() => setMessage(null), 3000)
          })
          .catch(err => {
            const errorMsg = err.response?.data?.error || `Information of ${existing.name} has already been removed`
            setMessage({ type: 'error', text: errorMsg })
            setTimeout(() => setMessage(null), 3000)
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    phonebookServices
      .create(newPerson)
      .then(res => {
        setPersons(persons.concat(res))
        setMessage({ type: 'success', text: `Added ${newPerson.name}` })
        setNewName('')
        setNewNumber('')
        setTimeout(() => setMessage(null), 3000)
      })
      .catch(err => {
        const errorMsg = err.response?.data?.error || 'Failed to add new contact'
        setMessage({ type: 'error', text: errorMsg })
        setNewName('')
        setNewNumber('')
        setTimeout(() => setMessage(null), 3000)
      })
  }

  // Delete contact
  const handleDelete = id => {
    const currentPerson = persons.find(p => p.id === id)
    if (!currentPerson) return
    if (!window.confirm(`Delete ${currentPerson.name}?`)) return

    phonebookServices
      .deleteContact(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setMessage({ type: 'success', text: `Deleted ${currentPerson.name} successfully` })
        setTimeout(() => setMessage(null), 3000)
      })
      .catch(() => {
        setMessage({
          type: 'error',
          text: `Information of ${currentPerson.name} has already been removed from the server`
        })
        setTimeout(() => setMessage(null), 3000)
      })
  }

  const filtered = searcher
    ? persons.filter(p => p.name.toLowerCase().includes(searcher.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChange={handleChange} value={searcher} />

      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleSave}
        onChange={handleChange}
        nameValue={newName}
        numberValue={newNumber}
      />

      <h3>Numbers</h3>
      <Persons filtered={filtered} handleDelete={handleDelete} />
    </div>
  )
}

export default App
