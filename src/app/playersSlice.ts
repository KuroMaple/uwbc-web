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
    setPos: (state, action: PayloadAction<playerPosAction>) => {
      const player = state.players.find(player => player.id === action.payload.id)
      if(player){
        player.position = action.payload.position
      }
    },

    addPlayer: (state, action: PayloadAction<IPlayer>) => {
      state.players.push(action.payload)
    },
  },
})

export const { setPos, addPlayer } = playersSlice.actions

export default playersSlice.reducer
