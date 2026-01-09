/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'
import NewBlogForm from '../src/components/NewBlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'http://camo.com',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const blogTitle = screen.getByText('Component testing is done with react-testing-library', { exact: false })
  const blogAuthor = screen.getByText('John Doe', { exact: false })
  const blogUrl = screen.queryByText('http://camo.com')
  const blogLikes = screen.queryByText('likes 0')

  expect(blogTitle).toBeDefined()
  expect(blogAuthor).toBeDefined()
  expect(blogUrl).toBeNull()
  expect(blogLikes).toBeNull()
})

test('checks blog info shown when button clicked', async () => {
  const blogUser = {
    id: '4018',
    username: 'nia',
    name: 'nia'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'http://camo.com',
    likes: 0,
    user: blogUser
  }

  render(<Blog blog={blog} user={blogUser} />)

  const user = userEvent.setup()

  const button = screen.getByText('view')
  await user.click(button)

  const blogUrl = screen.getByText('http://camo.com', { exact: false })
  const blogLikes = screen.getByText('likes 0', { exact: false })

  expect(blogUrl).toBeDefined()
  expect(blogLikes).toBeDefined()
})

test('like button clicked twice', async () => {
  const blogUser = {
    id: '4018',
    username: 'nia',
    name: 'nia'
  }

  const mockHandler = vi.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'John Doe',
    url: 'http://camo.com',
    likes: 0,
    user: blogUser
  }

  render(<Blog blog={blog} user={blogUser} handleBlogLike={mockHandler}/>)

  const user = userEvent.setup()

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler).toHaveBeenCalledTimes(2)
})

test('create new blog with form', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm handleCreateBlog={mockHandler}/>)

  const inputs = screen.getAllByRole('textbox')
  const createButton = screen.getByText('create')

  await user.type(inputs[0], 'testing a form...')
  await user.type(inputs[1], 'mr. noa')
  await user.type(inputs[2], 'http://omdam.com')

  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler).toHaveBeenCalledWith({
    title: 'testing a form...',
    author: 'mr. noa',
    url: 'http://omdam.com',
    likes: 0
  })
})