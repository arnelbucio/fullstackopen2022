import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      title: 'This is a blog content',
      author: 'John Doe',
      url: '/test-url/',
      likes: 42
    }

    container = render(<Blog blog={blog} />).container
  })

  test('renders its title ann author', () => {
    screen.findAllByText('This is a blog content')
    screen.findAllByText('John Doe')
  })

  test('does not render its url and likes by default', () => {
    const div = container.querySelector('.blog-details')
    expect(div).toHaveStyle('display: none')
  })
})
