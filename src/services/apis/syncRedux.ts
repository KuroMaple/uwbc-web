
import { GymState } from '../../app/redux/gymSlice'
import baseApi from './baseApi'


export const syncReduxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGymState: builder.query<GymState, void>({
      query: () => 'session/get_players_from_most_recent_session',
      providesTags: ['Session'],
    }),
    postGymState: builder.mutation<GymState, GymState>({
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
