import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Player', 'Session', 'Players', 'Member', 'Members'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://127.0.0.1:8888/testsite/api/', 
  }),
  endpoints: () => ({}),
})

export default baseApi
