import { http, HttpResponse } from 'msw'
import courtState from './data'


export const handlers = [
  // Connect to current session
  http.get('http://127.0.0.1:8000/api/sessions/', () => {
    return HttpResponse.json({sessionId: 123})
  }),
  //Same endpoint but post request
  http.post('http://127.0.0.1:8000/api/sessions/', () => {
    return HttpResponse.json({sessionId: 123})
  }),
  http.get('http://127.0.0.1:8000/api/get_players_from_most_recent_session', () => {    
    return HttpResponse.json(courtState)
  }),

  // POST request should have a body
  http.post('http://127.0.0.1:8000/api/add_players_to_rotation', async ({ request }) => {
    // Not doing anything with request, just returning the same data
    // 201 player added status
    return HttpResponse.json(courtState, {status: 201})
  })
]

