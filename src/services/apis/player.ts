import baseApi from './baseApi'

export const playerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlayer: builder.query <void, void> ({
      query: () => ({
        url: `/member_sessions`,
      }),
      providesTags: ['Player'],
    })
  }),
})

export const { useGetPlayerQuery } = playerApi
