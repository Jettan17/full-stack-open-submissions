import { useState } from 'react'

const NewBlogForm = ({ setCreateVisible, handleCreateBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '', likes: 0 })

  const onSubmit = () => {
    handleCreateBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '', likes: 0 })
  }

  return (
    <form onSubmit={onSubmit}>
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

export default NewBlogForm