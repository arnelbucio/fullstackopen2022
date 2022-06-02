import { createSlice } from '@reduxjs/toolkit'

const initialState = 'Hello, this is a notification'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      const content = action.payload
      state.push({
        content
      })
    }
  }
})

const { actions, reducer } = notificationSlice

export const { createNotification } = actions

export default reducer