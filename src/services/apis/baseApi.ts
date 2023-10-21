import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const baseApi = createApi({
  reducerPath: 'baseApi',
  tagTypes: ['Player', 'REPLACE'],
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://pokeapi.co/api/v2/' 
  }),
  endpoints: () => ({}),
})

export default baseApi
