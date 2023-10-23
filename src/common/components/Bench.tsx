import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IPlayer, { Positions } from '../interfaces/IPlayer'
import { RootState } from '../../app/store'
import Player from './Player/Player'
import { addPlayer } from '../../app/playersSlice'
import { genPlayer } from './Player/playerGen'


const Bench = () => {
  const benchPlayers = useSelector((state: RootState) => state.players.players.filter((player: IPlayer) => player.position === 'bench'))
  
  console.log(benchPlayers) //Debugging

  const dispatch = useDispatch()
  
  const addPlayerToRedux = (position: Positions) => {
    dispatch(addPlayer(genPlayer(position)))
  }

  return (
    <div className="flex w-1/3 flex-col place-items-center p-10">
      <h1>Bench</h1>
      <button
        className="border border-solid border-black p-4"
        onClick={() => addPlayerToRedux(Positions.Bench)}
      >
        Add Player
      </button>
      <div>
        {benchPlayers.map((player) => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  )
}

export default Bench
