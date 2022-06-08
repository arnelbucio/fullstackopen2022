import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const id = action.payload.id
      const blogToChange = state.find((a) => a.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

const { actions, reducer } = blogSlice

export const { addLike, appendBlog, deleteBlog, setBlogs } = actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(blog)
    dispatch(addLike(likedBlog))
  }
}

export default reducer
