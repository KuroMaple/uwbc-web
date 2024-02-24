import { Positions } from '../../common/interfaces/IPlayer'

export default interface IPositionRequest {
  member: number
  session: number
  position: Positions
}