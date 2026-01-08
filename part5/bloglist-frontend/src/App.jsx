import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const StatusMessage = ({ message }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (message) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const messageStyle = {
    border: message.success ? '3px solid green': '3px solid red',
    borderRadius: '10px',
    padding: '10px',
    margin: '10px 0',
    color: message.success ? 'green' : 'red',
    display: visible ? 'block' : 'none'
  }

  return (
    <div style={messageStyle}>
      {message.text}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({title: '', author: '', url: ''})
  const [message, setMessage] = useState({success: true, text: 'Load successful'})
  const [createVisible, setCreateVisible] = useState(false)

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
      setMessage({success: true, text: 'Login successful'})
    } catch {
      setMessage({ success: false, text: 'Wrong username or password' })
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

    const addedBlog = await blogService.create({ 
      ...newBlog
    })

    setBlogs([...blogs, addedBlog])
    setNewBlog({title: '', author: '', url: ''})
    setMessage({ success: true, text: `${addedBlog.title} added successfully` })
    setCreateVisible(false)
  }

  const createNewBlogForm = () => {
    return (
      <form onSubmit={handleCreateBlog}>
        <h2>create new</h2>
        <div>
          <label>
            title:
            <input
              type="text"
              value={newBlog.title}
              onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            author:
            <input
              type="text"
              value={newBlog.author}
              onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            url:
            <input
              type="url"
              value={newBlog.url}
              onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
            />
          </label>
        </div>
        <button type="submit">create</button>
        <button onClick={() => setCreateVisible(false)}>cancel</button>
      </form>
    )
  }

  const blogsDisplay = () => {
    return (
    <>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    <button onClick={handleLogOut}>log out</button>
    {!createVisible && (
  <button onClick={() => setCreateVisible(true)}>create new blog</button>
)}
{createVisible && createNewBlogForm()}
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
      <StatusMessage message={message} />
      {!user && loginForm()}
      {user && blogsDisplay()}
    </div>
  )
}

export default App