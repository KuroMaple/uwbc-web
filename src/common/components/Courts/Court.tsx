import React from 'react'
import Player from '../Player/Player'
import { genPlayer } from '../Player/playerGen'
import { Positions } from '../../interfaces/IPlayer'


interface Props {
  number: string;
}
const Court: React.FC<Props> = ({ number }) => {
  // Hardcode values for demo
  const player1 = genPlayer(Positions.Court1)
  const player2 = genPlayer(Positions.Court1)
  const player3 = genPlayer(Positions.Court1)
  const player4 = genPlayer(Positions.Court1)

  return (
    <div className="relative border border-solid border-black p-4">
      <h2 className="absolute left-0 top-0">Court {number}</h2>
      <div className="grid grid-cols-2 gap-4 p-4">
        {/* Hard coded values for demo */}
        <Player player={player1}/>
        <Player player={player2}/>
        <Player player={player3}/>
        <Player player={player4}/>
      </div>
    </div>
  )
}

export default Court
