import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({newSearch, setNewSearch}) => {
  return (
    <div>
      filter shown with: <input value={newSearch} onChange={(e) => setNewSearch(e.target.value)} />
    </div>
  )
}

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    for (const person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
      if (person.number === newNumber) {
        alert(`${newNumber} is already added to phonebook`)
        return
      }
    }

    personService
      .create({name: newName, number: newNumber})
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const DeleteButton = ({persons, setPersons, name}) => {
  const handleClick = () => {
    if (!window.confirm(`Delete ${name}?`)) {
      //Not confirm delete, back out
      return
    }

    const deleteId = persons.find(person => person.name === name).id

    personService
      .deletePerson(deleteId)
      .then(() => {
        setPersons([...persons].filter(person => person.id !== deleteId))
      })
      .catch(() => {
        alert(`${name} is already deleted from the server`)
        setPersons(persons.filter(person => person.id !== deleteId))
      })
  }

  return (
    <button onClick={handleClick}>delete</button>
  )
}

const Persons = ({persons, setPersons, newSearch}) => {
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(newSearch)).map((person) => (
        <React.Fragment key={person.name}>
        <p>{person.name} {person.number}</p>
        <DeleteButton persons={persons} setPersons={setPersons} name={person.name} />
        </React.Fragment>
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} newSearch={newSearch} />
    </div>
  )
}

export default App