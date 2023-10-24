import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../interfaces/DraggableTypes'
import { useDispatch, useSelector } from 'react-redux'
import { addToChallenge } from '../../app/playersSlice'
import IPlayer, { Positions } from '../interfaces/IPlayer'
import { RootState } from '../../app/store'
import Player from './Player/Player'


const Challenge = () => {
  //Players that are in Challenge
  const challengePlayers = useSelector((state: RootState) => state.players.players.filter((player: IPlayer) => player.position === 'challenge'))
  
  //Redux updater
  const dispatch = useDispatch()


  // Dropping Logic for React DnD
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (player: IPlayer) => console.log(player), // Debugging
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [])

  return (
    <div className="flex w-1/3 flex-col place-items-center bg-yellow-600 p-10" ref={drop}>
      <h2>Challenge Queue</h2>
      <div className="flex w-full flex-col">
        {challengePlayers.map((player) => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  )
}

export default Challenge
