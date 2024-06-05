import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import IPlayer, { Positions } from '../../common/interfaces/IPlayer'
import {  DnDMoveAction } from './DndTypes'

export interface GymState {
  sessionId: number,
  playerCount: number,
  benchPlayers: IPlayer[],
  challengeQueue: number[],
  court1: {
    challengePlayerId?: number,
    players: IPlayer[],
  },
  court2: {
    challengePlayerId?: number,
    players: IPlayer[],
  },
  court3: {
    challengePlayerId?: number,
    players: IPlayer[],
  },
  court4: {
    challengePlayerId?: number,
    players: IPlayer[],
  },
  court5: {
    challengePlayerId?: number,
    players: IPlayer[],
  },
  court6: {
    challengePlayerId?: number,
    players: IPlayer[],
  },
  court7: {
    challengePlayerId?: number,
    players: IPlayer[],
  },
  court8: {
    challengePlayerId?: number,
    players: IPlayer[],
  },

}

const initialState: GymState = {
  sessionId: 0,
  playerCount: 0,
  benchPlayers: [],
  challengeQueue: [],
  court1: {
    challengePlayerId: undefined,
    players: [],
  },
  court2: {
    challengePlayerId: undefined,
    players: [],
  },
  court3: {
    challengePlayerId: undefined,
    players: [],
  },
  court4: {
    challengePlayerId: undefined,
    players: [],
  },
  court5: {
    challengePlayerId: undefined,
    players: [],
  },
  court6: {
    challengePlayerId: undefined,
    players: [],
  },
  court7: {
    challengePlayerId: undefined,
    players: [],
  },
  court8: {
    challengePlayerId: undefined,
    players: [],
  },
}


const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    syncGymState:(state, action: PayloadAction<GymState>) => {
      state.sessionId = action.payload.sessionId
      state.playerCount = action.payload.playerCount
      state.benchPlayers = action.payload.benchPlayers
      state.challengeQueue = action.payload.challengeQueue
      state.court1 = action.payload.court1
      state.court2 = action.payload.court2
      state.court3 = action.payload.court3
      state.court4 = action.payload.court4
      state.court5 = action.payload.court5
      state.court6 = action.payload.court6
      state.court7 = action.payload.court7
      state.court8 = action.payload.court8
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
      case (Positions.Court2): {
        player.isMGO = false
        player.position = Positions.Court2
        if(state.court2.challengePlayerId !== undefined){
          player.isBeingChallenged = true
        }
        state.court2.players.push(player)
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }
      case (Positions.Court3): {
        player.isMGO = false
        player.position = Positions.Court3
        if(state.court3.challengePlayerId !== undefined){
          player.isBeingChallenged = true
        }
        state.court3.players.push(player)
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }
      case (Positions.Court4): {
        player.isMGO = false
        player.position = Positions.Court4
        if(state.court4.challengePlayerId !== undefined){
          player.isBeingChallenged = true
        }
        state.court4.players.push(player)
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }
      case (Positions.Court5): {
        player.isMGO = false
        player.position = Positions.Court5
        if(state.court5.challengePlayerId !== undefined){
          player.isBeingChallenged = true
        }
        state.court5.players.push(player)
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }
      case (Positions.Court6): {
        player.isMGO = false
        player.position = Positions.Court6
        if(state.court6.challengePlayerId !== undefined){
          player.isBeingChallenged = true
        }
        state.court6.players.push(player)
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }
      case (Positions.Court7): {
        player.isMGO = false
        player.position = Positions.Court7
        if(state.court7.challengePlayerId !== undefined){
          player.isBeingChallenged = true
        }
        state.court7.players.push(player)
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }
      case (Positions.Court8): {
        player.isMGO = false
        player.position = Positions.Court8
        if(state.court8.challengePlayerId !== undefined){
          player.isBeingChallenged = true
        }
        state.court8.players.push(player)
        state.benchPlayers = state.benchPlayers.filter(player => player.id !== action.payload.itemId)
        break
      }
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

        state.challengeQueue = state.challengeQueue.filter((id) => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        player.position = Positions.Court1
        state.court1.players.push(player)
        break
      }
      
      case Positions.Court2: {
        state.court2.challengePlayerId = action.payload.itemId

        state.challengeQueue = state.challengeQueue.filter((id) => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        player.position = Positions.Court2
        state.court2.players.push(player)
        break
      }
      case Positions.Court3: {
        state.court3.challengePlayerId = action.payload.itemId

        state.challengeQueue = state.challengeQueue.filter((id) => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        player.position = Positions.Court3
        state.court3.players.push(player)
        break
      }
      case Positions.Court4: {
        state.court4.challengePlayerId = action.payload.itemId

        state.challengeQueue = state.challengeQueue.filter((id) => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        player.position = Positions.Court4
        state.court4.players.push(player)
        break
      }
      case Positions.Court5: {
        state.court5.challengePlayerId = action.payload.itemId

        state.challengeQueue = state.challengeQueue.filter((id) => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        player.position = Positions.Court5
        state.court5.players.push(player)
        break
      }
      case Positions.Court6: {
        state.court6.challengePlayerId = action.payload.itemId

        state.challengeQueue = state.challengeQueue.filter((id) => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        player.position = Positions.Court6
        state.court6.players.push(player)
        break
      }
      case Positions.Court7: {
        state.court7.challengePlayerId = action.payload.itemId

        state.challengeQueue = state.challengeQueue.filter((id) => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        player.position = Positions.Court7
        state.court7.players.push(player)
        break
      }
      case Positions.Court8: {
        state.court8.challengePlayerId = action.payload.itemId

        state.challengeQueue = state.challengeQueue.filter((id) => id !== action.payload.itemId)
        state.benchPlayers = state.benchPlayers.filter(currentPlayer => currentPlayer.id !== action.payload.itemId)
        player.position = Positions.Court8
        state.court8.players.push(player)
        break
      }
      default: {
        break
      }
      }
    },
    resetAllCourts:(state) => {
      
      state.court1.players.forEach(player => {
        const action = {
          payload: {itemId: player.id, source: Positions.Court1}
        } as PayloadAction<DnDMoveAction>
        gymSlice.caseReducers.removeFromCourt(state, action)
      })

      state.court2.players.forEach(player => {
        const action = {
          payload: {itemId: player.id, source: Positions.Court2}
        } as PayloadAction<DnDMoveAction>
        gymSlice.caseReducers.removeFromCourt(state, action)
      })

      state.court3.players.forEach(player => {
        const action = {
          payload: {itemId: player.id, source: Positions.Court3}
        } as PayloadAction<DnDMoveAction>
        gymSlice.caseReducers.removeFromCourt(state, action)
      })

      state.court4.players.forEach(player => {
        const action = {
          payload: {itemId: player.id, source: Positions.Court4}
        } as PayloadAction<DnDMoveAction>
        gymSlice.caseReducers.removeFromCourt(state, action)
      })

      state.court5.players.forEach(player => {
        const action = {
          payload: {itemId: player.id, source: Positions.Court5}
        } as PayloadAction<DnDMoveAction>
        gymSlice.caseReducers.removeFromCourt(state, action)
      })

      state.court6.players.forEach(player => {
        const action = {
          payload: {itemId: player.id, source: Positions.Court6}
        } as PayloadAction<DnDMoveAction>
        gymSlice.caseReducers.removeFromCourt(state, action)
      })

      state.court7.players.forEach(player => {
        const action = {
          payload: {itemId: player.id, source: Positions.Court7}
        } as PayloadAction<DnDMoveAction>
        gymSlice.caseReducers.removeFromCourt(state, action)
      })

      state.court8.players.forEach(player => {
        const action = {
          payload: {itemId: player.id, source: Positions.Court8}
        } as PayloadAction<DnDMoveAction>
        gymSlice.caseReducers.removeFromCourt(state, action)
      })
      

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
          console.log('Remove from Court Error: Player not found in court 1')
          return
        }
        if (state.court1.challengePlayerId === action.payload.itemId) {
          state.court1.challengePlayerId = undefined
          player.isChallenging = false
          state.court1.players.forEach(player => player.isBeingChallenged = false)
        }
        state.court1.players = state.court1.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      case Positions.Court2: {
        const player = state.court2.players.find(player => player.id === action.payload.itemId) 
        if(!player){
          console.log('Remove from Court Error: Player not found in court 2')
          return
        }
        if (state.court2.challengePlayerId === action.payload.itemId) {
          state.court2.challengePlayerId = undefined
          player.isChallenging = false
          state.court2.players.forEach(player => player.isBeingChallenged = false)
        }
        state.court2.players = state.court2.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      case Positions.Court3: {
        const player = state.court3.players.find(player => player.id === action.payload.itemId) 
        if(!player){
          console.log('Remove from Court Error: Player not found in court 3')
          return
        }
        if (state.court3.challengePlayerId === action.payload.itemId) {
          state.court3.challengePlayerId = undefined
          player.isChallenging = false
          state.court3.players.forEach(player => player.isBeingChallenged = false)
        }
        state.court3.players = state.court3.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      case Positions.Court4: {
        const player = state.court4.players.find(player => player.id === action.payload.itemId) 
        if(!player){
          console.log('Remove from Court Error: Player not found in court 4')
          return
        }
        if (state.court4.challengePlayerId === action.payload.itemId) {
          state.court4.challengePlayerId = undefined
          player.isChallenging = false
          state.court4.players.forEach(player => player.isBeingChallenged = false)
        }
        state.court4.players = state.court4.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      case Positions.Court5: {
        const player = state.court5.players.find(player => player.id === action.payload.itemId) 
        if(!player){
          console.log('Remove from Court Error: Player not found in court 5')
          return
        }
        if (state.court5.challengePlayerId === action.payload.itemId) {
          state.court5.challengePlayerId = undefined
          player.isChallenging = false
          state.court5.players.forEach(player => player.isBeingChallenged = false)
        }
        state.court5.players = state.court5.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      case Positions.Court6: {
        const player = state.court6.players.find(player => player.id === action.payload.itemId) 
        if(!player){
          console.log('Remove from Court Error: Player not found in court 6')
          return
        }
        if (state.court6.challengePlayerId === action.payload.itemId) {
          state.court6.challengePlayerId = undefined
          player.isChallenging = false
          state.court6.players.forEach(player => player.isBeingChallenged = false)
        }
        state.court6.players = state.court6.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      case Positions.Court7: {
        const player = state.court7.players.find(player => player.id === action.payload.itemId) 
        if(!player){
          console.log('Remove from Court Error: Player not found in court 7')
          return
        }
        if (state.court7.challengePlayerId === action.payload.itemId) {
          state.court7.challengePlayerId = undefined
          player.isChallenging = false
          state.court7.players.forEach(player => player.isBeingChallenged = false)
        }
        state.court7.players = state.court7.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      case Positions.Court8: {
        const player = state.court8.players.find(player => player.id === action.payload.itemId) 
        if(!player){
          console.log('Remove from Court Error: Player not found in court 8')
          return
        }
        if (state.court8.challengePlayerId === action.payload.itemId) {
          state.court8.challengePlayerId = undefined
          player.isChallenging = false
          state.court8.players.forEach(player => player.isBeingChallenged = false)
        }
        state.court8.players = state.court8.players.filter(currentPlayer => currentPlayer.id !== player.id)
        player.position = Positions.Bench
        player.isBeingChallenged = false
        player.isMGO = false
        player.numRotationsOff = 0
        state.benchPlayers.push(player)
        break
      }
      }
    },
    incrementPlayerCount: (state) => {
      state.playerCount++
    },
    decrementPlayerCount: (state) => {
      state.playerCount--
    },
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
  incrementPlayerCount,
  decrementPlayerCount,
} = gymSlice.actions

// Memoized Selectors
export const selectBenchPlayers = (state: { gym: GymState }) => state.gym.benchPlayers
const selectChallengeQueue = (state: { gym: GymState }) => state.gym.challengeQueue
export const selectChallengePlayers = createSelector(
  [selectBenchPlayers, selectChallengeQueue], 
  (benchPlayers, challengeQueue) => {

    const sortedPlayers: IPlayer[] = []
    for (const id of challengeQueue) {
      const player = benchPlayers.find(player => player.id === id)
      if (player) {
        sortedPlayers.push(player)
      }
    }
    return sortedPlayers
  })

export default gymSlice.reducer