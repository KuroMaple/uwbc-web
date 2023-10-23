import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IPlayer, { Positions } from '../interfaces/IPlayer'
import { RootState } from '../../app/store'
import Player from './Player/Player'
import { addPlayer } from '../../app/playersSlice'



const Bench = () => {
  const benchPlayers = useSelector((state: RootState) => state.players.players.filter((player: IPlayer) => player.position === 'bench'))
  const dispatch = useDispatch()
  console.log(benchPlayers)
  
  return (
    <div className="flex w-1/3 flex-col place-items-center p-10">
      <h1>Bench</h1>
      <button className="border border-solid border-black p-4"
        onClick={() => dispatch(addPlayer({
          name: 'hassan',
          id: 'a12',
          level: 3,
          position: Positions.Bench
        }))}>
        Add Player
      </button>
      <div>
        {benchPlayers.map((player) => (
          <Player key={1} />
        ))}
      </div>
    </div>
  )
}

export default Bench
