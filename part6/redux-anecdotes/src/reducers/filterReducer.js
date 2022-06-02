import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

const { actions, reducer } = filterSlice

export const { setFilter } = actions

export default reducer