import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCommunityData } from '../../api'
const initialState = {
  loading: false,
  data: [],
  error: null
}

const getCommunityData = createAsyncThunk(
  'community/getCommunityData',
  async community => {
    const res = await fetchCommunityData(community)
    return res.data
  }
)

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getCommunityData.pending, state => {
      state.loading = true
    })
    builder.addCase(getCommunityData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.success = true
    })
    builder.addCase(getCommunityData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  }
})

export default communitySlice.reducer
export { getCommunityData }
