import IAutoCompleteOption from '../../common/interfaces/IAutoCompleteOption'
import { IMember } from '../interfaces/IMember'
import baseApi from './baseApi'

export const membersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMember: builder.query <IMember, string> ({
      query: (email) => `members/?email=${email}`,
      providesTags: ['Member'],
    }),
    getActiveMembersNotInSession: builder.query <IAutoCompleteOption[], number> ({
      query: (sessionId) => `members/get_active_members_not_in_session/?session=${sessionId}`,
      providesTags: ['Members'],
      transformResponse: (members: IMember[]) => {
        return members.map((member) => {
          return {
            label: member.first_name + ' ' + member.last_name + ' ' + member.email,
          }
        })
      },
      keepUnusedDataFor: 0,
    }),
  }),
})

export const { useGetMemberQuery, useGetActiveMembersNotInSessionQuery} = membersApi
