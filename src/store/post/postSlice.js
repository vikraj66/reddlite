import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPostData } from '../../api'
const initialState = {
  showPostModal: false,
  loading: false,
  comments: [],
  post: [],
  permalink: '',
  error: null,
}

export const getComments = createAsyncThunk('post/getComments', async (url) => {
  const res = await fetchPostData(url)
  return res.data[1].data.children
})

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePost: (state, action) => {
      state.post = action.payload
    },
    toggleModal: state => {
      state.showPostModal = !state.showPostModal
    }, 
  },
  extraReducers: (builder) => {
    builder.addCase(getComments.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.loading = false
      state.comments = action.payload
      state.success = true
    })
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})

export default postSlice.reducer

export const postSliceActions = postSlice.actions
