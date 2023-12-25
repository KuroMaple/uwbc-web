import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Positions } from '../../common/interfaces/IPlayer'
import { DnDMoveAction } from './DndTypes'
import { IOpenTeam } from '../../common/interfaces/IOpenTeam'

interface OpenTournamentState {
  benchPlayers: IOpenTeam[],
  court1: {
    players: IOpenTeam[],
  }
  court2: {
    players: IOpenTeam[],
  },
  court3: {
    players: IOpenTeam[],
  },
  court4: {
    players: IOpenTeam[],
  },
  court5: {
    players: IOpenTeam[],
  },
  court6: {
    players: IOpenTeam[],
  },
  court7: {
    players: IOpenTeam[],
  },
  court8: {
    players: IOpenTeam[],
  },

}

const initialState: OpenTournamentState = {
  benchPlayers: [],
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


const openTournamentSlice = createSlice({
  name: 'openTournament',
  initialState,
  reducers: {
    createInitialTeams:(state, action: PayloadAction<IOpenTeam[]>) => {
      state.benchPlayers = action.payload   
    },
    moveTeamTo:(state, action: PayloadAction<DnDMoveAction>) => {
      let movedTeam: IOpenTeam = { // default values
        id: -1,
        partnerOne: '',
        partnerTwo: '',
        position: Positions.Bench,
      }

      // remove from source array
      switch (action.payload.source) {

      case (Positions.Bench): {                        
        movedTeam = state.benchPlayers.find(team => team.id === parseInt(action.payload.itemId))!
        state.benchPlayers = state.benchPlayers.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      case (Positions.Court1): {
        movedTeam = state.court1.players.find(team => team.id === parseInt(action.payload.itemId))!
        state.court1.players = state.court1.players.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      case (Positions.Court2): {
        movedTeam = state.court2.players.find(team => team.id === parseInt(action.payload.itemId))!
        state.court2.players = state.court2.players.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      case (Positions.Court3): {
        movedTeam = state.court3.players.find(team => team.id === parseInt(action.payload.itemId))!
        state.court3.players = state.court3.players.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      case (Positions.Court4): {
        movedTeam = state.court4.players.find(team => team.id === parseInt(action.payload.itemId))!
        state.court4.players = state.court4.players.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      case (Positions.Court5): {
        movedTeam = state.court5.players.find(team => team.id === parseInt(action.payload.itemId))!
        state.court5.players = state.court5.players.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      case (Positions.Court6): {
        movedTeam = state.court6.players.find(team => team.id === parseInt(action.payload.itemId))!
        state.court6.players = state.court6.players.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      case (Positions.Court7): {
        movedTeam = state.court7.players.find(team => team.id === parseInt(action.payload.itemId))!
        state.court7.players = state.court7.players.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      case (Positions.Court8): {
        movedTeam = state.court8.players.find(team => team.id === parseInt(action.payload.itemId))!
        state.court8.players = state.court8.players.filter(team => team.id === parseInt(action.payload.itemId))
        break
      }
      }
      

      // Add to target array
      switch (action.payload.target) {

      case (Positions.Bench): {
        movedTeam.position = Positions.Bench
        state.benchPlayers.push(movedTeam)
        break
      }
      case (Positions.Court1): {
        movedTeam.position = Positions.Court1
        state.court1.players.push(movedTeam)
        break
      }
      case (Positions.Court2): {
        movedTeam.position = Positions.Court2
        state.court2.players.push(movedTeam)
        break
      }
      case (Positions.Court3): {
        movedTeam.position = Positions.Court3
        state.court3.players.push(movedTeam)
        break
      }
      case (Positions.Court4): {
        movedTeam.position = Positions.Court4
        state.court4.players.push(movedTeam)
        break
      }
      case (Positions.Court5): {
        movedTeam.position = Positions.Court5
        state.court5.players.push(movedTeam)
        break
      }
      case (Positions.Court6): {
        movedTeam.position = Positions.Court6
        state.court6.players.push(movedTeam)
        break
      }
      case (Positions.Court7): {
        movedTeam.position = Positions.Court7
        state.court7.players.push(movedTeam)
        break
      }
      case (Positions.Court8): {
        movedTeam.position = Positions.Court8
        state.court8.players.push(movedTeam)
        break
      }
      }
    },

  }
})

export const { createInitialTeams, moveTeamTo} = openTournamentSlice.actions

export default openTournamentSlice.reducer