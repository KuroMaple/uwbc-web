import { Positions } from '../../common/interfaces/IPlayer'

// The Draggable Type, of which there is only one the player itself
export const ItemTypes = {
  PLAYER: 'player',
}

//Type used to move a player from one slice to another
export type PlayerMoveAction = {
  source: Positions, // Where the player is being moved from
  target: Positions, // Where the player is being moved to
  movedPlayerId: string // The relevant player id
}

export type PlayerDropType = {
  source: Positions, // Where the player is being moved from
  movedPlayerId: string // The relevant player id
}
