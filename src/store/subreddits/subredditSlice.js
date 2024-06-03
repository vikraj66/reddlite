import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchSubredditsList } from '../../api'
const initialState = {
  loading: false,
  data: [],
  error: null,
}

export const getSubbreditsList = createAsyncThunk(
  'subreddits/getSubbreditsList',
  async () => {
    const res = await fetchSubredditsList()
    return res.data.data.children
  },
)

const subredditsList = createSlice({
  name: 'subreddits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubbreditsList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getSubbreditsList.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.success = true
    })
    builder.addCase(getSubbreditsList.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export default subredditsList.reducer
