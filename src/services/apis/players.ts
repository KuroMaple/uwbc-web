import IPlayer from '../../common/interfaces/IPlayer'
import IAddPlayerRequest from '../interfaces/IAddPlayerRequest'
import IAddPlayerResponse from '../interfaces/IAddPlayerResponse'
import IChallengeRequest from '../interfaces/IChallengeRequest'
import IMGORequest from '../interfaces/IMGORequest'
import IPlayerRequest from '../interfaces/IPlayerRequest'
import IPlayers from '../interfaces/IPlayers'
import baseApi from './baseApi'

export const playersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPlayerToSession: builder.mutation <IAddPlayerResponse, IAddPlayerRequest> ({
      query: (request) => ({
        url: 'member_sessions/add_players_to_session/',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['Players'],
    
    }),
    getAllPlayersInSession: builder.query <IPlayers, number> ({
      query: (session) => `member_sessions/get_all_players/?session=${session}`,
      providesTags: ['Players'],
    }),
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
    setMGOstatus: builder.mutation <IPlayer, IMGORequest> ({
      query: (request) => ({
        url: 'member_sessions/set_mgo_status/',
        method: 'PATCH',
        body: request,
      }),
      invalidatesTags: ['Players'],
    }),
  }),
})

export const { useGetPlayersBySessionPositionQuery, useSetChallengerStatusMutation, useSetMGOstatusMutation, useAddPlayerToSessionMutation } = playersApi