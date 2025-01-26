/* eslint-disable no-unused-vars */
export enum Positions {
  Court1 = 'court1',
  Court2 = 'court2',
  Court3 = 'court3',
  Court4 = 'court4',
  Court5 = 'court5',
  Court6 = 'court6',
  Court7 = 'court7',
  Court8 = 'court8',
  Challenge = 'challenge',
  Bench = 'bench',
}

export default interface IPlayer {
  id: number
  sessionID: number
  position: Positions
  isBeingChallenged: boolean
  isChallenging: boolean
  numRotationsOff: number
  isMGO: boolean
  name: string
  level: number
  ticks: number
}

interface Group {
  groupID: number
  players: IPlayer[]
}
