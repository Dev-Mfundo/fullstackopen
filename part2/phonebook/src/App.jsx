import { useState, useEffect } from "react"
import phonebookServices from "./services/phonebook.js"
import Persons from "./components/Persons"
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searcher, setSearcher] = useState("")
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phonebookServices
      .getAll()
      .then((initialPhonebook) => setPersons(initialPhonebook))
      .catch((err) => {
        setPersons([])
		if(err.response.status===404){
        setMessage({ error: "Failed to retrieve phonebook" })
		}
      })
  }, [])

  const notify = (msg, type = "success", duration = 4000) => {
    setMessage({ [type]: msg })
    setTimeout(() => setMessage(null), duration)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "name") setNewName(value)
    if (name === "phone-number") setNewNumber(value)
    if (name === "search") setSearcher(value)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!newName.trim() || !newNumber.trim()) {
      notify("Fill in all fields!", "error")
      return
    }

    const newPerson = {
      name: newName.trim(),
      number: newNumber.trim(),
    }

    const existing = persons.find(
      (p) => p.name.toLowerCase() === newPerson.name.toLowerCase()
    )

    if (existing) {
      if (
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existing, number: newPerson.number }
        phonebookServices
          .updateContact(existing.id, updatedPerson)
          .then((res) => {
            setPersons(persons.map((p) => (p.id === res.id ? res : p)))
            notify(`Updated ${newPerson.name}`)
            setNewName("")
            setNewNumber("")
          })
          .catch((err) => {
            if (err.response?.status === 404) {
              notify(
                `Information of ${existing.name} has already been removed from the server`,
                "error"
              )
            } else {
              notify(
                err.response?.data?.error || "Update failed. Try again.",
                "error"
              )
            }
            setNewName("")
            setNewNumber("")
          })
      }
      return
    }

    phonebookServices
      .create(newPerson)
      .then((newData) => {
        setPersons(persons.concat(newData))
        notify(`Added ${newPerson.name}`)
        setNewName("")
        setNewNumber("")
      })
      .catch((err) => {
        notify(
          err.response?.data?.error || "Failed to add person.",
          "error"
        )
        setNewName("")
        setNewNumber("")
      })
  }

  const handleDelete = (id) => {
    const currentPerson = persons.find((p) => p.id === id)
    if (!currentPerson) return
    if (!window.confirm(`Delete ${currentPerson.name}?`)) return

    phonebookServices
      .deleteContact(id)
      .then(() => {
        setPersons(persons.filter((p) => p.id !== id))
        notify(`Deleted ${currentPerson.name} successfully`)
      })
      .catch(() => {
        notify(
          `Information of ${currentPerson.name} has already been removed from the server`,
          "error"
        )
      })
  }

  const filtered = searcher
    ? persons.filter((p) =>
        p.name.toLowerCase().includes(searcher.toLowerCase())
      )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter onChange={handleChange} value={searcher} />

      <h3>add a new</h3>
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
