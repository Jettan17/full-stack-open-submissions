import { useState } from 'react'

const Blog = ({ blog, user, handleBlogLike, handleBlogDelete }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogDelete = () => {
    return(
      <button onClick={(event) => handleBlogDelete(event, blog)}>delete</button>
    )
  }

  const blogInfo = () => {
    return (
      <>
        <div>{blog.url}</div>
        <div>
          <div>likes {blog.likes}</div>
          <button onClick={(event) => handleBlogLike(event, blog)}>like</button>
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