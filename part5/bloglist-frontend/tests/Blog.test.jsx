/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
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