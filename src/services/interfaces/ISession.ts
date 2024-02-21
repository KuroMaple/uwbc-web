export default interface ISession {
  sessionId: string
  term: number
  members: string[]
  creationSuccess: boolean
}