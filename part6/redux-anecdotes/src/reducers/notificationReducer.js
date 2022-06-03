import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return ''
    }
  }
})

const { actions, reducer } = notificationSlice

export const { createNotification, clearNotification } = actions

export const setNotification = (notification, timeout = 5) => {
  return async dispatch => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout*1000)
  }
}
export default reducer