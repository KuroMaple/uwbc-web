import IPlayerRequest from '../interfaces/IPlayerRequest'
import IPlayers from '../interfaces/IPlayers'
import baseApi from './baseApi'

export const playersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlayersBySessionPosition: builder.query <IPlayers, IPlayerRequest> ({
      query: (request) => `member_sessions/get_players_by_position/?session=${request.session}&position=${request.position}`,
      providesTags: ['Players'],
    }),
    
  }),
})

export const { useGetPlayersBySessionPositionQuery } = playersApi