import IPlayer from '../../common/interfaces/IPlayer'
import IChallengeRequest from '../interfaces/IChallengeRequest'
import IPlayerRequest from '../interfaces/IPlayerRequest'
import IPlayers from '../interfaces/IPlayers'
import baseApi from './baseApi'

export const playersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlayersBySessionPosition: builder.query <IPlayers, IPlayerRequest> ({
      query: (request) => `member_sessions/get_players_by_position/?session=${request.session}&position=${request.position}`,
      providesTags: ['Players'],
    }),
    setChallengerStatus: builder.mutation <IPlayer, IChallengeRequest> ({
      query: (request) => ({
        url: 'member_sessions/set_challenger_status/',
        method: 'PATCH',
        body: request,
      }),
      invalidatesTags: ['Players'],
    }),
  }),
})

export const { useGetPlayersBySessionPositionQuery, useSetChallengerStatusMutation } = playersApi