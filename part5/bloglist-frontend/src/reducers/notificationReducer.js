import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'success',
  text: '',
}
let nextNotificationId = 0

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return action.payload === nextNotificationId - 1 ? '' : state
    },
  },
})

const { actions, reducer } = notificationSlice

export const { showNotification, hideNotification } = actions

export const setNotification = (notification, timeout = 5) => {
  return async (dispatch) => {
    const id = nextNotificationId++

    dispatch(showNotification(notification))

    setTimeout(() => {
      dispatch(hideNotification(id))
    }, timeout * 1000)
  }
}

export default reducer
