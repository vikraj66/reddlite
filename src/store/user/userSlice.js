import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserData } from '../../api'
const initialState = {
  loading: false,
  data: [],
  error: null
}

const getUserData = createAsyncThunk('user/getUserData', async user => {
  const res = await fetchUserData(user)
  return res.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUserData.pending, state => {
      state.loading = true
    })
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.success = true
    })
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export default userSlice.reducer
export { getUserData }
