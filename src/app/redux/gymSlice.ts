import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../../common/interfaces/IPlayer'
import { PlayerMoveAction } from './DndTypes'

interface GymState {
  benchPlayers: IPlayer[],
  challengePlayers: IPlayer[],
  court1: {
    players: IPlayer[],
  }

}

const initialState: GymState = {
  benchPlayers: [],
  challengePlayers: [],
  court1: {
    players: [],
  }
}


const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    createPlayer:(state, action: PayloadAction<IPlayer>) => {
      state.benchPlayers.push(action.payload)
    },
    movePlayerTo:(state, action: PayloadAction<PlayerMoveAction>) => {
      let movedPlayer: IPlayer = {
        name: 'NOT INITIALIZED',
        id: '',
        level: 0,
        position: Positions.Bench
      }
      // remove from source array
      switch (action.payload.source) {
      case (Positions.Challenge): {
        movedPlayer = state.challengePlayers.find(player => player.id === action.payload.movedPlayerId)! // asserting that player DEFINETLY exists
        state.challengePlayers = state.challengePlayers.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      case (Positions.Bench): {
        movedPlayer = state.benchPlayers.find(player => player.id === action.payload.movedPlayerId)!
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      case (Positions.Court1): {
        movedPlayer = state.court1.players.find(player => player.id === action.payload.movedPlayerId)!
        state.court1.players = state.court1.players.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      // case Positions.Court2:
      //    'Court 2'
      // case Positions.Court3:
      //    'Court 3'
      // case Positions.Court4:
      //    'Court 4'
      // case Positions.Court5:
      //    'Court 5'
      // case Positions.Court6:
      //    'Court 6'
      // case Positions.Court7:
      //    'Court 7'
      // case Positions.Court8:
      //    'Court 8'
      }

      // Add to target array
      switch (action.payload.target) {

      case (Positions.Challenge): {
        state.challengePlayers.push(movedPlayer)
        break
      }
      case (Positions.Bench): {
        state.benchPlayers.push(movedPlayer)
        break
      }
      case (Positions.Court1): {
        state.court1.players.push(movedPlayer)
        break
      }
        // case Positions.Court2:
        //    'Court 2'
        // case Positions.Court3:
        //    'Court 3'
        // case Positions.Court4:
        //    'Court 4'
        // case Positions.Court5:
        //    'Court 5'
        // case Positions.Court6:
        //    'Court 6'
        // case Positions.Court7:
        //    'Court 7'
        // case Positions.Court8:
        //    'Court 8'
      }
    },
  }
})

export const { createPlayer, movePlayerTo} = gymSlice.actions

export default gymSlice.reducer