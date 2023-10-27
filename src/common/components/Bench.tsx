import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IPlayer, { Positions } from '../interfaces/IPlayer'
import { RootState } from '../../app/store'
import Player from './Player/Player'
import { addPlayer, movePlayer} from '../../app/playersSlice'
import { genPlayer } from './Player/playerGen'
import { useDragDropManager, useDrop } from 'react-dnd'
import { ItemTypes } from '../interfaces/DraggableTypes'


const Bench = () => {
  const benchPlayers = useSelector((state: RootState) => state.players.players.filter((player: IPlayer) => player.position === Positions.Bench))
  

  const dispatch = useDispatch()
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    drop: (item: any) => dispatch(movePlayer(
      {
        newPosition: Positions.Bench,
        movedPlayerId: item.id
      }
    )),
    collect: (monitor) => ({
      // Use is over to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean

    }), 
  }))

  return (
    <div className="flex w-1/3 flex-col place-items-center p-10" ref={drop}>
      <h1>Bench</h1>
      <button
        className="border border-solid border-black p-4"
        onClick={() => {dispatch(addPlayer(genPlayer(Positions.Bench)))}}
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

export default React.memo(Bench)
