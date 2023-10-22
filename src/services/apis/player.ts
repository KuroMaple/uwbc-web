import baseApi from './baseApi'

export const playerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlayer: builder.query <void, number> ({
      query: (id: number) => ({
        // url: `/players/${id}`,
        url: 'pokemon/ditto'
      }),
      providesTags: ['Player'],
    })
  }),
})

export const { useGetPlayerQuery } = playerApi
