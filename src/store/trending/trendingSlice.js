import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSearchedData } from '../../api'
const initialState = {
  loading: false,
  trendingData: [],
  error: null,
}

export const getTrendingData = createAsyncThunk(
  'index/getTrendingData',
  async () => {
    const trending = await fetchSearchedData('q=trending')
    return trending.data.data.children.slice(0, 4)
  },
)

const trendingSlice = createSlice({
  name: 'trending',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrendingData.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getTrendingData.fulfilled, (state, action) => {
      state.loading = false
      state.trendingData = action.payload
    })
    builder.addCase(getTrendingData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export default trendingSlice.reducer
