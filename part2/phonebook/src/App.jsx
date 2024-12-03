import {useEffect, useState } from 'react'
import personService from './component/services/person'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
import Persons from './component/Persons'
import Feedback from './component/Feedback'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState({name:'',number: ''})
  const [filterName,setFilterName]=useState({name:''})
  const [message,setMessage]=useState({content: '',success: ''})
  useEffect(()=>{
    personService
    .getAll()
    .then(initialPerson=>{
      setPersons(initialPerson)
    }).catch((error)=>{
      console.log("Fetching Error", error)
      alert("Failed to fetch from database")
    })
  },[])
  const handleFilter=(e)=>{
    e.preventDefault()
    const {name,value}=e.target
    setFilterName({...filterName,[name]:value})

  }

  const handleChange=(e)=>{
    e.preventDefault()
    const {name,value}=e.target
    setNewName({...newName, [name]: value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault();

    if(!newName.name || !newName.number){
      alert("Name and number cannot be empty!");
      return;
    }

    const existingPerson = persons.find(
      (person) => person.name === newName.name
    );

    if(existingPerson){
      const confirmUpdate = window.confirm(
        `${newName.name} is already in the phonebook, Replace the old number with the new one?`
      );

      if(confirmUpdate){
        const updatedPerson = { ...existingPerson, number: newName.number };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson)=>{
            setPersons(
              persons.map((person)=>
                person.id === existingPerson.id ? returnedPerson : person
              )
            );
            setNewName({ name: "", number: "" });
          })
          .catch((error)=>{
            console.error("Error updating person:", error);
            alert(
              `Information for ${existingPerson.name} has already been removed from the server.`
            );
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
      }
    }else{
      personService.create(newName).then((newPerson)=>{
        setPersons([...persons, newPerson]);
        const addingStmt= `Added ${newName.name}`;
        setMessage({ content:addingStmt, success: true});
        setTimeout(()=>{
        setMessage(message.content);
        },5000)
        setNewName({ name: "", number: "" });
      });
    }
  };


  const filteredPersons = persons.filter((person)=>person.name.toLowerCase().includes(filterName.name.toLowerCase()))

  const handleRemove=(id)=>{
    const personToRemove = persons.find((person) => person.id === id);
    if (personToRemove && window.confirm(`Delete ${personToRemove.name}?`)) {
      personService
      .remove(id)
      .then(()=>{
      setPersons(persons.filter((person)=> person.id !== id));
      })
      .catch((error)=>{
        const deleteFail= `Information of ${personToRemove.name} has already been removed from server`;
        
        if(error.status === 404){
        setMessage({ content:deleteFail, success: false});
        setTimeout(()=>{
          setMessage({content: '', success: ''})
        }, 5000)
      }else{
      alert("Failed to delete the entry. Please try again.");
      }
      });
    }
};

  return(
    <div>
      <h2>Phonebook </h2>
      <Feedback message={message}/>
      <Filter handleFilter={handleFilter} filterName={filterName}/>
      <h2>add a new</h2>
      <PersonForm handleChange={handleChange} handleSubmit={handleSubmit} newName={newName} />
      <h2>Numbers</h2>
      <Persons handleRemove={handleRemove} persons={filteredPersons}/>
    </div>
  )
}

export default App;