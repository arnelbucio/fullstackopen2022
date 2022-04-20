import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }, [message])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)

    if (person) {
      const personCopy = { ...person, number: newNumber }

      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        personService
          .update(person.id, personCopy)
          .then(response => {
            setPersons(persons.map(person => person.id !== personCopy.id ? person : response.data))
            setNewName('')
            setNewNumber('')
            setMessage({
              text: `Successfully edited ${person.name}'s number`,
              type: 'success'
            })
          })
          .catch(error => {
            setMessage({
              text: `Information of ${person.name} has already been removed from server`,
              type: 'error'
            })
          })
      }

      return false
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setMessage({
          text: `Added ${newName}`,
          type: 'success'
        })
      })
      .catch(error => {
        setMessage({
          text: error.response.data.error,
          type: 'error'
        })
      })

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const deleteName = (event) => {
    event.preventDefault()
    const id = event.target.id
    const personToDelete = persons.find(person => person.id == id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id != id))
        })
    }
  }

  const personsToShow = (newFilter.trim() === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().startsWith(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />
      <Filter {...{newFilter, handleFilterChange}} />

      <h2>Add a new</h2>

      <PersonForm {...{newName, handleNameChange, newNumber, handleNumberChange, addName}} />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deleteName={deleteName} />
    </div>
  )
}

export default App
