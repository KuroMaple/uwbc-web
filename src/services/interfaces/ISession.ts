export default interface ISession {
  sessionId: number
  term: number
  members: string[]
  creationSuccess: boolean
}