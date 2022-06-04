import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let nextNotificationId = 0

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return (action.payload === nextNotificationId - 1)
        ? ''
        : state
    }
  }
})

const { actions, reducer } = notificationSlice

export const { showNotification, clearNotification } = actions

export const setNotification = (notification, timeout = 10) => {
  return async dispatch => {
    const id = nextNotificationId++

    dispatch(showNotification(notification))

    setTimeout(() => {
      dispatch(clearNotification(id))
    }, timeout*1000)
  }
}
export default reducer