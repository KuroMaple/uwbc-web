import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../../common/interfaces/IPlayer'
import {  DnDMoveAction } from './DndTypes'

export interface GymState {
  sessionId: number,
  benchPlayers: IPlayer[],
  challengeQueue: number[],
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
  challengeQueue: [],
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
      state.sessionId = action.payload.sessionId
      state.benchPlayers = action.payload.benchPlayers
      state.challengeQueue = action.payload.challengeQueue
      state.court1 = action.payload.court1
    },
    setSessionId:(state, action: PayloadAction<number>) => {
      state.sessionId = action.payload
    },

    // Handles ONLY the Following Action(s):
    //  Bench to Court Move
    moveBenchPlayerToCourt:(state, action: PayloadAction<DnDMoveAction>) => {
      const player = state.benchPlayers.find(player => player.id === action.payload.itemId)
      if (action.payload.source !== Positions.Bench) {
        console.log('Invalid Move Error: Cannot Move Player from anywhere outside of Bench ')
        console.log('Will have snackbar for this in future')
        return
      }
      if(!player){
        console.log('Invalid Bench to Court Move Error: Player not found in bench')
        return
      }
      
      // Add to target array and set new position, update flags
      switch (action.payload.target) {
      case (Positions.Court1): {
        player.isMGO = false
        player.position = Positions.Court1
        if(state.court1.challengePlayerId !== undefined){
          player.isBeingChallenged = true
        }
        state.court1.players.push(player)
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
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
    // Handles ONLY the Following Action(s):
    //  Challenge to Court Move
    moveChallengerToCourt:(state, action: PayloadAction<DnDMoveAction>) => {
      if (action.payload.source !== Positions.Challenge) {
        console.log('Invalid Move Error: Cannot Move Challenger from anywhere outside of Challenge Queue ')
        console.log('Will have snackbar for this in future')
        return
      }

      if(!state.challengeQueue.includes(action.payload.itemId)){
        console.log('Invalid Challenger Move Error: Player not in challenge queue')
        return
      }
      const player = state.benchPlayers.find(player => player.id === action.payload.itemId)
      if(!player){
        console.log('Invalid Challenger Move Error: Player not found in bench')
        return
      }
      switch (action.payload.target) {
      case Positions.Court1: { 
        state.court1.challengePlayerId = action.payload.itemId
        state.challengeQueue = state.challengeQueue.filter(id => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        state.court1.players.push(player)
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
        player.isMGO = false
        player.numRotationsOff = 0
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
    },
    // Handles ONLY the Following Action(s):
    //  Bench to Challenge Move
    pushToChallengeQueue: (state, action: PayloadAction<number>) => {
      // Only bench players can be added to the queue
      const player = state.benchPlayers.find(player => player.id === action.payload)
      if (player){
        state.challengeQueue.push(player.id)
        player.isChallenging = true
        player.position = Positions.Challenge // Note: must handle case where player is moved from bench to court while in challenge queue
      }
      else {
        console.log('Push to Challenge Error: Player not found in bench')
      }
    },
    // Handles ONLY the Following Action(s):
    //  Challenge to Bench Move
    removeFromChallengeQueue: (state, action: PayloadAction<number>) => {
      
      const player = state.benchPlayers.find(player => player.id === action.payload)
      if(state.challengeQueue.includes(action.payload) && player){
        player.isChallenging = false
        player.position = Positions.Bench
        state.challengeQueue = state.challengeQueue.filter((id) => id !== player.id) 
      }
      else {
        console.log('Remove from Challenge Error: Player not found in challenge queue or Not found in bench')
      }
      
    },
    // Handles ONLY the Following Action(s):
    //  Court to Bench Move
    removeFromCourt:(state, action: PayloadAction<DnDMoveAction>) => {
      if (action.payload.source === Positions.Challenge || action.payload.source === Positions.Bench) {
        console.log('Remove from Court Error: Cannot Remove Player from anywhere outside of Court')
        console.log('Will have snackbar for this in future')
        return
      }
      
      switch (action.payload.source) {
      case Positions.Court1: {
        const player = state.court1.players.find(player => player.id === action.payload.itemId) 
        if(!player){
          console.log('Remove from Court Error: Player not found in court')
          return
        }
        if (state.court1.challengePlayerId === action.payload.itemId) {
          state.court1.challengePlayerId = undefined
        }
        state.court1.players = state.court1.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isChallenging = false
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      // case 2: {
      //   state.court2.players = state.court2.players.filter(player => player.id !== action.payload.playerId)
      //   break
      // }
      // case 3: {
      //   state.court3.players = state.court3.players.filter(player => player.id !== action.payload.playerId)
      //   break
      // }
      // case 4: {
      //   state.court4.players = state.court4.players.filter(player => player.id !== action.payload.playerId)
      //   break
      // }
      // case 5: {
      //   state.court5.players = state.court5.players.filter(player => player.id !== action.payload.playerId)
      //   break
      // }
      // case 6: {
      //   state.court6.players = state.court6.players.filter(player => player.id !== action.payload.playerId)
      //   break
      // }
      // case 7: {
      //   state.court7.players = state.court7.players.filter(player => player.id !== action.payload.playerId)
      //   break
      // }
      // case 8: {
      //   state.court8.players = state.court8.players.filter(player => player.id !== action.payload.playerId)
      //   break
      // }
      }
    }
  }
})

export const {
  syncGymState,  
  setSessionId,
  moveBenchPlayerToCourt,
  moveChallengerToCourt, 
  resetAllCourts, 
  togglePlayerMGO,
  pushToChallengeQueue,
  removeFromChallengeQueue,
  removeFromCourt,
} = gymSlice.actions

// Memoized Selectors
export const selectChallengePlayers = createSelector([(state: { gym: GymState }) => state.gym.benchPlayers], (players) => players.filter(player => player.isChallenging))

export default gymSlice.reducer