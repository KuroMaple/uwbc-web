import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import baseApi from '../../services/apis/baseApi'
import gymReducer from './gymSlice'
import addPlayerModalReducer from './addPlayerModalSlice'

export const store = configureStore({
  reducer: {
    // Reducer for RTK query
    [baseApi.reducerPath]: baseApi.reducer,
    //Reducer for courts and player info
    gym: gymReducer,
    addPlayerModal: addPlayerModalReducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
