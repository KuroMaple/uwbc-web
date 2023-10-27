import React, { useEffect, useState } from 'react'
import Player from '../Player/Player'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../../interfaces/DraggableTypes'
import { movePlayer } from '../../../app/playersSlice'


interface Props {
  courtNumber: string;
}
const Court: React.FC<Props> = ({ courtNumber }) => {

  const courtPlayers: IPlayer[] = useSelector((state: RootState) => state.players.players.filter((player: IPlayer) => player.position === courtNumber as Positions))


  
  const dispatch = useDispatch()
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: any, monitor) => {
        dispatch(movePlayer(
          {
            newPosition: courtNumber as Positions,
            movedPlayerId: item.id
          }
        ))
    },
    collect: (monitor) => ({
      // Use is over to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
    }), 
  }))


  return (
    <div 
      className="relative border border-solid border-black p-4"
      ref={drop}>
      <h2 className="absolute left-0 top-0">Court {courtNumber}</h2>
      <div className="grid grid-cols-2 gap-4 p-4">
      {courtPlayers.map((player) => (
          <Player key={player.id} player={player} />
        ))}
      </div>
    </div>
  )
}

export default React.memo(Court)
