import { useState } from 'react'

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
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('')
    setNewNumber('')
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

const Persons = ({persons, newSearch}) => {
  return (
    <>
      {persons.filter(person => person.name.toLowerCase().includes(newSearch)).map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newSearch, setNewSearch] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App