import IPlayer from '../../common/interfaces/IPlayer'

export default interface IAddPlayersRequest {
  sessionId: number
  currentBenchPlayers: IPlayer[]
  newPlayerEmails: string[] // player emails array
}