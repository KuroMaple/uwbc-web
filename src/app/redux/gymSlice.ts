import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../../common/interfaces/IPlayer'
import { PlayerMoveAction } from './DndTypes'

interface GymState {
  benchPlayers: IPlayer[],
  challengePlayers: IPlayer[],
  court1: {
    players: IPlayer[],
  }
  court2: {
    players: IPlayer[],
  },
  court3: {
    players: IPlayer[],
  },
  court4: {
    players: IPlayer[],
  },
  court5: {
    players: IPlayer[],
  },
  court6: {
    players: IPlayer[],
  },
  court7: {
    players: IPlayer[],
  },
  court8: {
    players: IPlayer[],
  },

}

const initialState: GymState = {
  benchPlayers: [],
  challengePlayers: [],
  court1: {
    players: [],
  },
  court2: {
    players: [],
  },
  court3: {
    players: [],
  },
  court4: {
    players: [],
  },
  court5: {
    players: [],
  },
  court6: {
    players: [],
  },
  court7: {
    players: [],
  },
  court8: {
    players: [],
  },
}


const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    createPlayer:(state, action: PayloadAction<IPlayer>) => {
      switch (action.payload.position) {
      case Positions.Challenge: {
        state.challengePlayers.push(action.payload)
        break
      }
      default: {
        state.benchPlayers.push(action.payload)
        break
      }    
      }
    },
    movePlayerTo:(state, action: PayloadAction<PlayerMoveAction>) => {
      let movedPlayer: IPlayer = { // default values
        name: 'NOT INITIALIZED',
        id: '',
        level: 0,
        position: Positions.Bench,
        ticks: 0,
        isMustGoOn: false, 
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
      case Positions.Court2: {
        movedPlayer = state.court2.players.find(player => player.id === action.payload.movedPlayerId)!
        state.court2.players = state.court2.players.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      case Positions.Court3: {
        movedPlayer = state.court3.players.find(player => player.id === action.payload.movedPlayerId)!
        state.court3.players = state.court3.players.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      case Positions.Court4: {
        movedPlayer = state.court4.players.find(player => player.id === action.payload.movedPlayerId)!
        state.court4.players = state.court4.players.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      case Positions.Court5: {
        movedPlayer = state.court5.players.find(player => player.id === action.payload.movedPlayerId)!
        state.court5.players = state.court5.players.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      case Positions.Court6: {
        movedPlayer = state.court6.players.find(player => player.id === action.payload.movedPlayerId)!
        state.court6.players = state.court6.players.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      case Positions.Court7: {
        movedPlayer = state.court7.players.find(player => player.id === action.payload.movedPlayerId)!
        state.court7.players = state.court7.players.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      case Positions.Court8: {
        movedPlayer = state.court8.players.find(player => player.id === action.payload.movedPlayerId)!
        state.court8.players = state.court8.players.filter(player => player.id !== action.payload.movedPlayerId)
        break
      }
      }

      // Add to target array
      switch (action.payload.target) {

      case (Positions.Challenge): {       
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Challenge
        state.challengePlayers.push(movedPlayer)
        break
      }
      case (Positions.Bench): {
        movedPlayer.position = Positions.Bench
        state.benchPlayers.push(movedPlayer)
        break
      }
      case (Positions.Court1): {
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Court1
        state.court1.players.push(movedPlayer)
        break
      }
      case (Positions.Court2): {
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Court2
        state.court2.players.push(movedPlayer)
        break
      }
      case (Positions.Court3): {
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Court3
        state.court3.players.push(movedPlayer)
        break
      }
      case (Positions.Court4): {
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Court4
        state.court4.players.push(movedPlayer)
        break
      }
      case (Positions.Court5): {
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Court5
        state.court5.players.push(movedPlayer)
        break
      }
      case (Positions.Court6): {
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Court6
        state.court6.players.push(movedPlayer)
        break
      }
      case (Positions.Court7): {
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Court7
        state.court7.players.push(movedPlayer)
        break
      }
      case (Positions.Court8): {
        movedPlayer.isMustGoOn = false // Reset MGO status
        movedPlayer.position = Positions.Court8
        state.court8.players.push(movedPlayer)
        break
      }
      }
    },
    // MGO players should ONLY be in bench
    updateMGOStatus:(state, action: PayloadAction<{playerId: string, newMGOStatus: boolean}>) => {
      state.benchPlayers.forEach(player => {
        if (player.id === action.payload.playerId) {
          player.isMustGoOn = action.payload.newMGOStatus
        }
      })
    }
  }
})

export const { createPlayer, movePlayerTo, updateMGOStatus} = gymSlice.actions

export default gymSlice.reducer