import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Player', 'REPLACE'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://0.0.0.0:8000/api', 
    
    
  }),
  endpoints: () => ({}),
})

export default baseApi
