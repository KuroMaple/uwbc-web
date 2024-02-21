import { Positions } from '../../common/interfaces/IPlayer'

export default interface IPlayerRequest {
  session: number,
  position: Positions
}