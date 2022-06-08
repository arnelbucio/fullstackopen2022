import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})

const { actions, reducer } = userSlice

export const { setUsers } = actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    console.log('test')
    console.log(users)
    dispatch(setUsers(users))
  }
}

export default reducer
