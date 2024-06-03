import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'

import homeReducer from './home/homeSlice'
import searchReducer from './search/searchSlice'
import communityReducer from './community/communitySlice'
import postReducer from './post/postSlice'
import userReducer from './user/userSlice'
import styleReducer from './styleSlice'
import popularPostsReducer from './post/popularPostsSlice'
import modalReducer from './modal/modalSlice'
import subbreditReducer from './subreddits/subredditSlice'
import trendingReducer from './trending/trendingSlice'

// Persistance Code
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['style'],
}

const rootReducer = combineReducers({
  home: homeReducer,
  search: searchReducer,
  community: communityReducer,
  post: postReducer,
  user: userReducer,
  style: styleReducer,
  popularPosts: popularPostsReducer,
  modal: modalReducer,
  subreddits: subbreditReducer,
  trending: trendingReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)
