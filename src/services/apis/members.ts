import baseApi from './baseApi'

export const membersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMembers: builder.query <void, void> ({
      query: () => ({
        url: '/members',
      }),
      providesTags: ['Player'],
    }),
  }),
})

export const { useGetMembersQuery } = membersApi
