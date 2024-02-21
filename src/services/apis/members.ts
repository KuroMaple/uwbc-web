import { IMember } from '../interfaces/IMember'
import baseApi from './baseApi'

export const membersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMember: builder.query <IMember, string> ({
      query: (email) => `members/?email=${email}`,
      providesTags: ['Player'],
    }),
    
  }),
})

export const { useGetMemberQuery } = membersApi
