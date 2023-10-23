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
  name: string
  id: string
  level: number
  position: Positions
}
