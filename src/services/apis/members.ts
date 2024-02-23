import { IMember } from '../interfaces/IMember'
import baseApi from './baseApi'

export const membersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMember: builder.query <IMember, string> ({
      query: (email) => `members/?email=${email}`,
      providesTags: ['Member'],
    }),
    getActiveMembers: builder.query <IMember[], void> ({
      query: () => 'members/get_active_members/',
      providesTags: ['Members'],
    }),
    
  }),
})

export const { useGetMemberQuery, useGetActiveMembersQuery } = membersApi
