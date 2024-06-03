import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPopularPostsData, fetchHomePopularData } from "../../api";

export const fetchPopularPosts = createAsyncThunk(
    'popularPosts/getPopularPosts',
    async paramData => {
        const response = await fetchHomePopularData(paramData);
        return response.data.data.children;
    }
)



const popularPostsSlice = createSlice({
    name: 'popularPosts',
    initialState: {
        loading: 'idle', //idle / pending / fulfilled / rejected
        data: [],
        error: null
    },
    reducers: {
        filterDescendingMod: (state, action) => {
            //I'm gonna fix later
            
        }
    },
    extraReducers: {
        [fetchPopularPosts.pending]: (state, action) => {
            state.loading = 'pending';
        },
        [fetchPopularPosts.fulfilled]: (state, action) => {
            state.loading = 'fulfilled';
            state.data = action.payload;
        },
        [fetchPopularPosts.rejected]: (state, action) => {
            state.loading = 'rejected';
            state.error = action.error;
        }
    } 
})

export default popularPostsSlice.reducer;
export const {filterDescendingMod} = popularPostsSlice.actions;
export const selectPopularPosts = state => state.popularPosts; 