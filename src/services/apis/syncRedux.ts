import { IReduxSync } from '../interfaces/IReduxSync'
import baseApi from './baseApi'


export const syncReduxApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGymState: builder.query<IReduxSync, void>({
      query: () => 'get_players_from_most_recent_session',
      providesTags: ['Session'],
    }),
  }),
})

export const { useGetGymStateQuery } = syncReduxApi
