const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

const url = `mongodb+srv://jettan17:${password}@cluster0.hnvbl6u.mongodb.net/personApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!newName || !newNumber) { //GET ALL
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else { //POST
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(() => {
    console.log(`Added ${newName} number ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}
