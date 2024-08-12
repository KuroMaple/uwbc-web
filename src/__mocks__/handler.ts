import { http, HttpResponse } from 'msw'
import IAddPlayersRequest from '../services/interfaces/IAddPlayersRequest'
import { addMembers, gymState, memberList } from './data'


export const handlers = [
  // Connect to current session
  http.get('http://127.0.0.1:8000/api/sessions/get_current_session/', () => {
    return HttpResponse.json({sessionId: 123})
  }),
  //Same endpoint but post request to signify app create
  http.post('http://127.0.0.1:8000/api/sessions/', () => {
    return HttpResponse.json({sessionId: 123})
  }),
  http.get('http://127.0.0.1:8000/api/member_sessions/get_players_from_most_recent_session', () => {    
    return HttpResponse.json(gymState)
  }),

  // POST request should have a body
  http.post('http://127.0.0.1:8000/api/add_players_to_rotation', () => {
    // Not doing anything with request, just returning the same data
    // 201 player added status
    return HttpResponse.json(gymState, {status: 201})
  }),

  http.get('http://127.0.0.1:8000/api/members/get_active_members_not_in_session/?session=123', () => {
    return HttpResponse.json(memberList, {status: 200})
  }),

  http.post('http://127.0.0.1:8000/api/member_sessions/add_players_to_session/', async ({ request }) => {
    const requestBody = await request.json() as IAddPlayersRequest // To simulate backend, we access the request body
    const newBenchPlayers = requestBody.currentBenchPlayers.concat(addMembers)
    return HttpResponse.json({benchPlayers: newBenchPlayers}, {status: 200})
  }),


]

