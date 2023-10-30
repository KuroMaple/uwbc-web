import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import IPlayer from '../../common/interfaces/IPlayer'

interface BenchState {
  players: IPlayer[]
}

const initialState: BenchState = {
  players: [],
}

const benchSlice = createSlice({
  name: 'bench',
  initialState,
  reducers: {
    addPlayer:(state, action: PayloadAction<IPlayer>) => {
      state.players.push(action.payload)
    },
  }
})

export const { addPlayer } = benchSlice.actions

export default benchSlice.reducer