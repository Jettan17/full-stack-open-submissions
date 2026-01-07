const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jettan17:${password}@cluster0.hnvbl6u.mongodb.net/testBlogApp?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const newBlog = new Blog({
  title: 'test2',
  author: 'tesg',
  url: 'qewq.com',
  likes: 114,
})

newBlog.save().then(result => {
  console.log(`Added ${newBlog}`)
  mongoose.connection.close()
})

// if (!newName || !newNumber) { //GET ALL
//   Blog.find({}).then(result => {
//     console.log('phonebook:')
//     result.forEach(Blog => {
//       console.log(Blog)
//     })
//     mongoose.connection.close()
//   })
// } else { //POST

// }
