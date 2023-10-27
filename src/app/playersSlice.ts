import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../common/interfaces/IPlayer'

interface PlayersState {
  players: IPlayer[];
}

export type PlayerDropAction = {
  newPosition: Positions
  movedPlayerId: string
}


// Define the initial state using that type
const initialState: PlayersState = {
  players: [],
}

export const playersSlice = createSlice({
  name: 'playerArray',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<IPlayer>) => {
      state.players.push(action.payload)
    },
    movePlayer: (state, action: PayloadAction<PlayerDropAction>) => {
      //Find ID match
      const changedPlayer = state.players.find(player => player.id === action.payload.movedPlayerId) // The player to change

      if(changedPlayer){
        // Since object is wrapped in a proxy, doing this somehow mutates it see: https://redux-toolkit.js.org/usage/immer-reducers
        changedPlayer.position = action.payload.newPosition
      }
    },
  },
})

export const { addPlayer, movePlayer } = playersSlice.actions

export default playersSlice.reducer
