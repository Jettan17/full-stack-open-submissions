import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs( blogs )
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      console.error('wrong credentials')
      setTimeout(() => {
        console.error(null)
      }, 5000)
    }
  }

  const handleLogOut = async event => {
    event.preventDefault()

    setUser(null)
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const loginForm = () => {
    return (
    <>
    <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
    )
  }

  const handleCreateBlog = async event => {
    event.preventDefault()

    const newBlog = await blogService.create({ 
      title: newTitle, 
      author: newAuthor, 
      url: newUrl 
    })

    setBlogs([...blogs, newBlog])
  }

  const blogsDisplay = () => {
    return (
    <>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    <button onClick={handleLogOut}>log out</button>
    <form onSubmit={handleCreateBlog}>
      <h2>create new</h2>
      <div>
        <label>
          title:
          <input
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="url"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
    {
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
    </>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && blogsDisplay()}
    </div>
  )
}

export default App