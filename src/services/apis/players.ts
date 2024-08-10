import IAddPlayerRequest from '../interfaces/IAddPlayersRequest'
import IAddPlayerResponse from '../interfaces/IAddPlayersResponse'
import baseApi from './baseApi'

export const playersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addPlayersToSession: builder.mutation <IAddPlayerResponse, IAddPlayerRequest> ({
      query: (request) => ({
        url: 'member_sessions/add_players_to_session/',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['Players', 'Members'],
    
    }),
  //   getAllPlayersInSession: builder.query <IPlayers, number> ({
  //     query: (session) => `member_sessions/get_all_players/?session=${session}`,
  //     providesTags: ['Players'],
  //   }),
  //   getPlayersBySessionPosition: builder.query <IPlayers, IPlayerRequest> ({
  //     query: (request) => `member_sessions/get_players_by_position/?session=${request.session}&position=${request.position}`,
  //     providesTags: ['Players'],
  //   }), // Remove later
  //   setChallengerStatus: builder.mutation <IPlayer, IChallengeRequest> ({
  //     query: (request) => ({
  //       url: 'member_sessions/set_challenger_status/',
  //       method: 'PATCH',
  //       body: request,
  //     }),
  //     invalidatesTags: ['Players'],
  //   }),
  //   setMGOstatus: builder.mutation <IPlayer, IMGORequest> ({
  //     query: (request) => ({
  //       url: 'member_sessions/set_mgo_status/',
  //       method: 'PATCH',
  //       body: request,
  //     }),
  //     invalidatesTags: ['Players'],
  //   }),
  //   changePlayerPosition: builder.mutation <IPlayer, IPositionRequest> ({
  //     query: (request) => ({
  //       url: 'member_sessions/change_player_position/',
  //       method: 'PATCH',
  //       body: request,
  //     }),
  //     invalidatesTags: ['Players'],
  //   }),
  //   resetAllCourts: builder.mutation <IAddPlayerResponse, ISessionId> ({
  //     query: (request) => ({
  //       url: 'member_sessions/move_all_court_players_to_bench/',
  //       method: 'PATCH',
  //       body: request,
  //     }),
  //     invalidatesTags: ['Players'],
  //   }),
  }),
})

export const {
  useAddPlayersToSessionMutation, } = playersApi
