/* eslint-disable no-unused-vars */
export enum Positions {
  Court1 = '1',
  Court2 = '2',
  Court3 = '3',
  Court4 = '4',
  Court5 = '5',
  Court6 = '6',
  Court7 = '7',
  Court8 = '8',
  Challenge = 'challenge',
  Bench = 'bench',
}

export default interface IPlayer {
  name: string;
  id: string;
  level: number;
  position: Positions;
}
