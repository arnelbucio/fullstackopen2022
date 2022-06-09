import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { logoutUser } from './loginReducer'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addLike(state, action) {
      const id = action.payload.id
      const blogToChange = state.find((blog) => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id !== id ? blog : changedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addComment(state, action) {
      const blogId = action.payload.blog
      const id = action.payload.id
      const text = action.payload.text

      const blogToChange = state.find((blog) => blog.id === blogId)
      const changedBlog = {
        ...blogToChange,
        comments: [...blogToChange.comments, { id: id, text }],
      }

      return state.map((blog) => (blog.id !== blogId ? blog : changedBlog))
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

export const { addLike, appendBlog, deleteBlog, setBlogs, addComment } = actions

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
    try {
      const likedBlog = await blogService.like(blog)
      dispatch(addLike(likedBlog))
    } catch (error) {
      if (error.response.data.error === 'token expired') {
        dispatch(logoutUser())
        dispatch(setNotification({ text: 'token expired', type: 'error' }))
      }
    }
  }
}

export const createComment = (blogId, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(blogId, comment)
    dispatch(addComment(newComment))
  }
}

export default reducer
