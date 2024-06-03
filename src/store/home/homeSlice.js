import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchHomeData } from '../../api'
const initialState = {
  loading: false,
  data: [],
  error: null
}

const getHomeData = createAsyncThunk('home/getHomeData', async () => {
  const res = await fetchHomeData()
  return res.data
})

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getHomeData.pending, state => {
      state.loading = true
    })
    builder.addCase(getHomeData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.success = true
    })
    builder.addCase(getHomeData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export default homeSlice.reducer
export { getHomeData }
