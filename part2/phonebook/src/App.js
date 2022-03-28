import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
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

      <Filter {...{newFilter, handleFilterChange}} />

      <h2>Add a new</h2>

      <PersonForm {...{newName, handleNameChange, newNumber, handleNumberChange, addName}} />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} deleteName={deleteName} />
    </div>
  )
}

export default App
