import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../../common/interfaces/IPlayer'
import { CreatePlayerAction, DnDMoveAction } from './DndTypes'

export interface GymState {
  sessionId: number,
  benchPlayers: IPlayer[],
  challengePlayers: IPlayer[],
  court1: {
    challengePlayerId?: number,
    players: IPlayer[],
  }
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
  benchPlayers: [],
  challengePlayers: [],
  court1: {
    challengePlayerId: undefined,
    players: [],
  },
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
    syncGymState:(state, action: PayloadAction<GymState>) => {
      state = action.payload
    },
    setSessionId:(state, action: PayloadAction<number>) => {
      state.sessionId = action.payload
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
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }

      case (Positions.Court1): {
        movedPlayer = state.court1.players.find(player => player.id === action.payload.itemId)!
        movedPlayer.isChallenging = false
        movedPlayer.isBeingChallenged = false
        state.court1.players = state.court1.players.filter(player => player.id !== action.payload.itemId)
       
       
        break
      }

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
      
      // Reset Player MGO
      movedPlayer.isMGO = false

      // Add to target array and set new position, update flags
      switch (action.payload.target) {

      case (Positions.Challenge): {       
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
      case (Positions.Court1): {
        movedPlayer.position = Positions.Court1
        movedPlayer.isBeingChallenged = state.court1.challengePlayerId !== undefined
        state.court1.players.push(movedPlayer)
        break
      }
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

    setCourtChallenger:(state, action: PayloadAction<{courtPosition: Positions, challengePlayerId?: number}>) => {
      switch (action.payload.courtPosition) {
      case Positions.Court1: {
        state.court1.challengePlayerId = action.payload.challengePlayerId
        if(!action.payload.challengePlayerId){
          state.court1.players.forEach(player => {
            player.isChallenging = false
            player.isBeingChallenged = false
          })
        }
        break
      }
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
      //Reset court properties
      state.court1.challengePlayerId = undefined
      state.court1.players.forEach(player => {
        player.position = Positions.Bench
        player.isChallenging = false
        player.isBeingChallenged = false
      })

      // Move all players to bench
      state.benchPlayers = [...state.benchPlayers, ...state.court1.players, /*...state.court2.players, 
        ...state.court3.players, ...state.court4.players, ...state.court5.players, ...state.court6.players, 
    ...state.court7.players, ...state.court8.players*/]

      // Clear Courts Array
      state.court1.players = []
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
  movePlayerTo, 
  setCourtChallenger, 
  resetAllCourts, 
  syncGymState, 
  togglePlayerMGO,
} = gymSlice.actions

export default gymSlice.reducer