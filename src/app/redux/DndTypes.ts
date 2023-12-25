import { Positions } from '../../common/interfaces/IPlayer'

// The Draggable Type, of which there is only one the player itself
export const ItemTypes = {
  PLAYER: 'player',
}

//Type used to represent a drag and drop action
export type DnDMoveAction = {
  source: Positions, // Where the item is being moved from
  target: Positions, // Where the item is being moved to
  itemId: string // The relevant item id
}

export type itemDropType = {
  source: Positions, // Where the item is being moved from
  itemId: string // The relevant item id
}
