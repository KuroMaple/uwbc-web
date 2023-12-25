import { Positions } from './IPlayer'

export interface IOpenTeam {
  id: number
  partnerOne: string
  partnerTwo: string
  position: Positions
}