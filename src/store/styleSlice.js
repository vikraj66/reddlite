import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light'
}

const styleSlice = createSlice({
  name: 'style',
  initialState,
  reducers: {
    toggleTheme: (state,action) => {
      state.theme = action.payload
    }
  }
})

export default styleSlice.reducer
export const styleActions = styleSlice.actions
