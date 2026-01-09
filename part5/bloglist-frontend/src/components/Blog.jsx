import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (event, blog) => {
    event.preventDefault()

    const updatedBlog = await blogService.put({
      ...blog,
      likes: blog.likes + 1
    })

    setBlogs(blogs.map(b => b.id === updatedBlog.id ? { ...updatedBlog, user: b.user } : b)
      .sort((a, b) => b.likes - a.likes))
  }

  const handleBlogDelete = async (event) => {
    event.preventDefault()

    const deleteConfirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    
    if (deleteConfirm) {
      await blogService.deleteBlog(blog)

      setBlogs(blogs.filter(blogObj => blogObj !== blog))
    }
  }

  const blogDelete = () => {
    return(
      <button onClick={handleBlogDelete}>delete</button>
    )
  }

  const blogInfo = () => {
    return (
      <>
      <div>{blog.url}</div>
      <div>
        <div>likes {blog.likes}</div>
        <button onClick={handleLike}>like</button>
      </div>
      <div>{blog.user.name}</div>
      {blog.user.name === user.name && blogDelete()}
      </>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        <div>{blog.title} {blog.author}</div>
        <button onClick={() => setBlogInfoVisible(!blogInfoVisible)}>{blogInfoVisible ? 'hide' : 'view'}</button>
      </div>
      {blogInfoVisible && blogInfo()}
    </div>  
  )
}

export default Blog