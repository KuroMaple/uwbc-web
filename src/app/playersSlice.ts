import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../common/interfaces/IPlayer'

interface PlayersState {
  players: IPlayer[];
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
    moveToChallenge: (state, action: PayloadAction<string>) => {
      //Modify the Player whose id matches to Position.challenge
      const changedPlayer = state.players.find(player => player.id === action.payload) // The player to change
      if(changedPlayer){
        // Since object is wrapped in a proxy, doing this somehow mutates it see: https://redux-toolkit.js.org/usage/immer-reducers
        changedPlayer.position = Positions.Challenge
      }
    },
    moveToBench: (state, action: PayloadAction<string>) => {
      //Modify the Player whose id matches to Position.challenge
      const changedPlayer = state.players.find(player => player.id === action.payload) // The player to change
      if(changedPlayer){
        // Since object is wrapped in a proxy, doing this somehow mutates it see: https://redux-toolkit.js.org/usage/immer-reducers
        changedPlayer.position = Positions.Bench
      }
    },
  },
})

export const { addPlayer, moveToChallenge, moveToBench } = playersSlice.actions

export default playersSlice.reducer
