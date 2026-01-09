/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

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