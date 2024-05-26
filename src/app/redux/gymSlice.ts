import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../../common/interfaces/IPlayer'
import { CreatePlayerAction, DnDMoveAction } from './DndTypes'
import { IReduxSync } from '../../services/interfaces/IReduxSync'

export interface GymState {
  sessionId: number,
  addPlayerModalOpen: boolean,
  benchPlayers: IPlayer[],
  challengePlayers: IPlayer[],
  // court1: {
  //   isChallenge: boolean,
  //   players: string[],
  // }
  // court2: {
  //   isChallenge: boolean,
  //   players: IPlayer[],
  // },
  // court3: {
  //   isChallenge: boolean,
  //   players: IPlayer[],
  // },
  // court4: {
  //   isChallenge: boolean,
  //   players: IPlayer[],
  // },
  // court5: {
  //   isChallenge: boolean,
  //   players: IPlayer[],
  // },
  // court6: {
  //   isChallenge: boolean,
  //   players: IPlayer[],
  // },
  // court7: {
  //   isChallenge: boolean,
  //   players: IPlayer[],
  // },
  // court8: {
  //   isChallenge: boolean,
  //   players: IPlayer[],
  // },

}

const initialState: GymState = {
  sessionId: 0,
  addPlayerModalOpen: false,
  benchPlayers: [],
  challengePlayers: [],
  // court1: {
  //   isChallenge: false,
  //   players: [],
  // },
  // court2: {
  //   isChallenge: false,
  //   players: [],
  // },
  // court3: {
  //   isChallenge: false,
  //   players: [],
  // },
  // court4: {
  //   isChallenge: false,
  //   players: [],
  // },
  // court5: {
  //   isChallenge: false,
  //   players: [],
  // },
  // court6: {
  //   isChallenge: false,
  //   players: [],
  // },
  // court7: {
  //   isChallenge: false,
  //   players: [],
  // },
  // court8: {
  //   isChallenge: false,
  //   players: [],
  // },
}


const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    syncGymState:(state, action: PayloadAction<IReduxSync>) => {
      state.benchPlayers = action.payload.benchPlayers
      state.challengePlayers = action.payload.challengePlayers
      state.sessionId = action.payload.sessionId
    },
    setModalOpen:(state, action: PayloadAction<boolean>) => {
      state.addPlayerModalOpen = action.payload
    },
    setSessionId:(state, action: PayloadAction<number>) => {
      state.sessionId = action.payload
    },
    createPlayer:(state, action: PayloadAction<CreatePlayerAction>) => {
      switch (action.payload.position) {
      case Positions.Challenge: {
        state.challengePlayers.push(action.payload.id)
        break
      }
      default: {
        state.benchPlayers.push(action.payload.id)
        break
      }    
      }
    },
    movePlayerTo:(state, action: PayloadAction<DnDMoveAction>) => {
      // Find player 
      let movedPlayer: IPlayer = {
        id: 0, 
        sessionID: 0, 
        position: Positions.Bench, 
        isBeingChallenged: false, 
        isChallenging: false, 
        numRotationsOff: 0, 
        isMGO: false, 
        name: '', 
        level: 0, 
        ticks: 0
      }
      // remove from source array, and populate movedPlayer
      switch (action.payload.source) {
      case (Positions.Challenge): {
        movedPlayer = state.challengePlayers.find(player => player.id === action.payload.itemId)!
        movedPlayer.isChallenging = action.payload.target !== Positions.Bench // Since source is Challenge Tab, player is a challenger 
        state.challengePlayers = state.challengePlayers.filter(player => player.id !== action.payload.itemId)
        break
      }

      case (Positions.Bench): {
        movedPlayer = state.benchPlayers.find(player => player.id === action.payload.itemId)!
        console.log('removing player from bench', movedPlayer) // Debugging
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }

      // case (Positions.Court1): {
      //   state.court1.players = state.court1.players.filter(playerId => playerId !== action.payload.itemId)
      //   break
      // }

      // case Positions.Court2: {
      //   movedPlayer = state.court2.players.find(player => player.id === action.payload.itemId)!
      //   state.court2.players = state.court2.players.filter(player => player.id !== action.payload.itemId)
      //   break
      // }
      // case Positions.Court3: {
      //   movedPlayer = state.court3.players.find(player => player.id === action.payload.itemId)!
      //   state.court3.players = state.court3.players.filter(player => player.id !== action.payload.itemId)
      //   break
      // }
      // case Positions.Court4: {
      //   movedPlayer = state.court4.players.find(player => player.id === action.payload.itemId)!
      //   state.court4.players = state.court4.players.filter(player => player.id !== action.payload.itemId)
      //   break
      // }
      // case Positions.Court5: {
      //   movedPlayer = state.court5.players.find(player => player.id === action.payload.itemId)!
      //   state.court5.players = state.court5.players.filter(player => player.id !== action.payload.itemId)
      //   break
      // }
      // case Positions.Court6: {
      //   movedPlayer = state.court6.players.find(player => player.id === action.payload.itemId)!
      //   state.court6.players = state.court6.players.filter(player => player.id !== action.payload.itemId)
      //   break
      // }
      // case Positions.Court7: {
      //   movedPlayer = state.court7.players.find(player => player.id === action.payload.itemId)!
      //   state.court7.players = state.court7.players.filter(player => player.id !== action.payload.itemId)
      //   break
      // }
      // case Positions.Court8: {
      //   movedPlayer = state.court8.players.find(player => player.id === action.payload.itemId)!
      //   state.court8.players = state.court8.players.filter(player => player.id !== action.payload.itemId)
      //   break
      // }
      }
      
      // Reset MGO status
      movedPlayer.isMGO = false

      // Add to target array and set new position, update flags
      switch (action.payload.target) {

      case (Positions.Challenge): {       
        movedPlayer.isMGO = false // Reset MGO status
        movedPlayer.position = Positions.Challenge
        movedPlayer.isChallenging = true
        state.challengePlayers.push(movedPlayer)
        break
      }
      case (Positions.Bench): {
        movedPlayer.position = Positions.Bench
        state.benchPlayers.push(movedPlayer)
        break
      }
      // case (Positions.Court1): {
      //   // movedPlayer.isMustGoOn = false // Reset MGO status
      //   // movedPlayer.position = Positions.Court1
      //   state.court1.players.push(action.payload.itemId)
      //   break
      // }
      // case (Positions.Court2): {
      //   movedPlayer.isMustGoOn = false // Reset MGO status
      //   movedPlayer.position = Positions.Court2
      //   state.court2.players.push(movedPlayer)
      //   break
      // }
      // case (Positions.Court3): {
      //   movedPlayer.isMustGoOn = false // Reset MGO status
      //   movedPlayer.position = Positions.Court3
      //   state.court3.players.push(movedPlayer)
      //   break
      // }
      // case (Positions.Court4): {
      //   movedPlayer.isMustGoOn = false // Reset MGO status
      //   movedPlayer.position = Positions.Court4
      //   state.court4.players.push(movedPlayer)
      //   break
      // }
      // case (Positions.Court5): {
      //   movedPlayer.isMustGoOn = false // Reset MGO status
      //   movedPlayer.position = Positions.Court5
      //   state.court5.players.push(movedPlayer)
      //   break
      // }
      // case (Positions.Court6): {
      //   movedPlayer.isMustGoOn = false // Reset MGO status
      //   movedPlayer.position = Positions.Court6
      //   state.court6.players.push(movedPlayer)
      //   break
      // }
      // case (Positions.Court7): {
      //   movedPlayer.isMustGoOn = false // Reset MGO status
      //   movedPlayer.position = Positions.Court7
      //   state.court7.players.push(movedPlayer)
      //   break
      // }
      // case (Positions.Court8): {
      //   movedPlayer.isMustGoOn = false // Reset MGO status
      //   movedPlayer.position = Positions.Court8
      //   state.court8.players.push(movedPlayer)
      //   break
      // }
      }
    },

    setCourtChallenge:(state, action: PayloadAction<{courtNumber: number, isChallenge: boolean}>) => {
      switch (action.payload.courtNumber) {
      // case 1: {
      //   state.court1.isChallenge = action.payload.isChallenge
      //   break
      // }
      // case 2: {
      //   state.court2.isChallenge = action.payload.isChallenge
      //   break
      // }
      // case 3: {
      //   state.court3.isChallenge = action.payload.isChallenge
      //   break
      // }
      // case 4: {
      //   state.court4.isChallenge = action.payload.isChallenge
      //   break
      // }
      // case 5: {
      //   state.court5.isChallenge = action.payload.isChallenge
      //   break
      // }
      // case 6: {
      //   state.court6.isChallenge = action.payload.isChallenge
      //   break
      // }
      // case 7: {
      //   state.court7.isChallenge = action.payload.isChallenge
      //   break
      // }
      // case 8: {
      //   state.court8.isChallenge = action.payload.isChallenge
      //   break
      // }
      default: {
        break
      }
      }
    },
    resetAllCourts:(state) => {
      state.benchPlayers = [...state.benchPlayers, /*...state.court1.players, ...state.court2.players, 
        ...state.court3.players, ...state.court4.players, ...state.court5.players, ...state.court6.players, 
    ...state.court7.players, ...state.court8.players*/]
      state.benchPlayers.forEach(player => {
        //reset all player on bench
        // player.position = Positions.Bench
        // player.isMustGoOn = false
        // player.isChallenger = false
      })
      // state.court1.players = []
      // state.court1.isChallenge = false
      // state.court2.players = []
      // state.court2.isChallenge = false
      // state.court3.players = []
      // state.court3.isChallenge = false
      // state.court4.players = []
      // state.court4.isChallenge = false
      // state.court5.players = []
      // state.court5.isChallenge = false
      // state.court6.players = []
      // state.court6.isChallenge = false
      // state.court7.players = []
      // state.court7.isChallenge = false
      // state.court8.players = []
      // state.court8.isChallenge = false
    },
    togglePlayerMGO:(state, action: PayloadAction<number>) => {
      const player = state.benchPlayers.find(player => player.id === action.payload)
      if (player) {
        player.isMGO = !player.isMGO
      }
    }
  }
})

export const { 
  setSessionId, 
  createPlayer, 
  movePlayerTo, 
  setCourtChallenge, 
  resetAllCourts, 
  setModalOpen, 
  syncGymState, 
  togglePlayerMGO,
} = gymSlice.actions

export default gymSlice.reducer