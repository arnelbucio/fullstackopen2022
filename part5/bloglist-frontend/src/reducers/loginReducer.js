import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return null
    },
  },
})

const { actions, reducer } = userSlice

export const { login, logout } = actions

export const setUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch(login(user))
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logout())
  }
}

export default reducer
