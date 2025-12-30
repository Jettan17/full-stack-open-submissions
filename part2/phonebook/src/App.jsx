import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({newSearch, setNewSearch}) => {
  return (
    <div>
      filter shown with: <input value={newSearch} onChange={(e) => setNewSearch(e.target.value)} />
    </div>
  )
}

const PersonForm = ({persons, setPersons, setMessageStatus}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    for (const person of persons) {
      if (person.name === newName && person.number !== newNumber) {
        //Update phone number
        if (window.confirm(`${person.name} is already added to the phonebook, replace the old number (${person.number}) with a new number (${newNumber})?`)) {
          personService
            .update(person.id, {...person, number: newNumber})
            .then(updatedPerson => {
              setMessageStatus({ success: true, text: `${person.name}'s phone number changed from ${person.number} to ${newNumber}` })
              setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
            })
            .catch(() => {
              setPersons(persons.filter(chkPerson => chkPerson.id !== person.id))
              setMessageStatus({success: false, text: `${person.name} is already deleted from the server`})
            })
        }
        return
      } else if (person.name === newName && person.number === newNumber) {
        //Exact same entry
        setMessageStatus({success: false, text: `${newName} with phone number ${newNumber} is already added to phonebook`})
        return
      } else if (person.name !== newName && person.number === newNumber) {
        //Same phone number conflict
        setMessageStatus({ success: false, text: `${newNumber} is already added to phonebook, it belongs to ${person.name}` })
        return
      }
    }

    personService
      .create({name: newName, number: newNumber})
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setMessageStatus({success: true, text: `${newName} added`})
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

const DeleteButton = ({persons, setPersons, name, setMessageStatus}) => {
  const handleClick = () => {
    if (!window.confirm(`Delete ${name}?`)) {
      //Not confirm delete, back out
      return
    }

    const deleteId = persons.find(person => person.name === name).id

    personService
      .deletePerson(deleteId)
      .then(deletedPerson => {
        setPersons([...persons].filter(person => person.id !== deletedPerson.id))
        setMessageStatus({success: true, text: `Deleted ${name}`})
      })
      .catch(() => {
        setPersons(persons.filter(person => person.id !== deleteId))
        setMessageStatus({success: false, text: `${name} is already deleted from the server`})
      })
  }

  return (
    <button onClick={handleClick}>delete</button>
  )
}

const Persons = ({persons, setPersons, newSearch, setMessageStatus}) => {
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(newSearch)).map((person) => (
        <React.Fragment key={person.name}>
        <p>{person.name} {person.number}</p>
        <DeleteButton persons={persons} setPersons={setPersons} name={person.name} setMessageStatus={setMessageStatus} />
        </React.Fragment>
      ))}
    </>
  )
}

const Message = ({messageStatus}) => {
  let messageStyle = {
    color: 'green',
    border: '2px solid green',
    borderRadius: '20px',
    padding: '10px'
  }

  if (!messageStatus.success) {
    messageStyle = {
      ...messageStyle,
      color: 'red',
      border: '2px solid red',
    }
  }

  if (messageStatus.text) {
    return (
      <h3 style={messageStyle}>{messageStatus.text}</h3>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [messageStatus, setMessageStatus] = useState({success: true, text: ''})

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Message messageStatus={messageStatus} />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessageStatus={setMessageStatus} />
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} newSearch={newSearch} setMessageStatus={setMessageStatus} />
    </div>
  )
}

export default App