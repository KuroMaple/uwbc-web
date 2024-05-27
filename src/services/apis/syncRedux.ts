import { IReduxSync } from '../interfaces/IReduxSync'
import baseApi from './baseApi'


export const syncReduxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGymState: builder.query<IReduxSync, void>({
      query: () => 'get_players_from_most_recent_session',
      providesTags: ['Session'],
    }),
    postGymState: builder.mutation<IReduxSync, IReduxSync>({
      query: (body) => ({
        url: 'add_players_to_rotation',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Session'],
    })
  }),
})

export const { useGetGymStateQuery, usePostGymStateMutation } = syncReduxApi
