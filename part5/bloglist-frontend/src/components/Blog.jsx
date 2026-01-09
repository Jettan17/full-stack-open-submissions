import { useState } from "react"

const Blog = ({ blog, handleLike }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  const blogInfo = () => {
    return (
      <>
      <div>{blog.url}</div>
      <div>
        <div>likes {blog.likes}</div>
        <button onClick={(event) => handleLike(event, blog)}>like</button>
      </div>
      <div>{blog.user.name}</div>
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