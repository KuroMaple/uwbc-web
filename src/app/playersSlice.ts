import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../common/interfaces/IPlayer'

interface PlayersState {
  players: IPlayer[];
}

//The type used to modify the players position in the reducer function
type playerPosAction = {
  id: string,
  position: Positions
}


// Define the initial state using that type
const initialState: PlayersState = {
  players: [],
}

export const playersSlice = createSlice({
  name: 'playerArray',
  initialState,
  reducers: {
    addToChallenge: (state, action) => {
      const player = state.players.find(player => player.id === action.payload)
      if(player){
        player.position = Positions.Challenge
      }
    },

    addPlayer: (state, action: PayloadAction<IPlayer>) => {
      state.players.push(action.payload)
    },
  },
})

export const { addToChallenge, addPlayer } = playersSlice.actions

export default playersSlice.reducer
