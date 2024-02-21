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
  member: number
  session: number
  position: Positions
  is_being_challenged: boolean
  is_challenging: boolean
  num_rotations_off: number
  is_MGO: boolean
  member_name: string
  member_level: number
}
