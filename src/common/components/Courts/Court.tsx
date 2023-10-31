import Player from '../Player/Player'
import { Positions } from '../../interfaces/IPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { useDrop } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../../app/redux/DndTypes'
import { movePlayerTo } from '../../../app/redux/gymSlice'
import { useEffect, useState } from 'react'
interface Props {
  courtPosition: Positions
  courtNumber: string
}
const Court: React.FC<Props> = ({ courtPosition, courtNumber }) => {

  const courtPlayers = useSelector((state: RootState) =>{
    switch (courtPosition) {
    case Positions.Court1:
      return state.gym.court1.players
    }
  })


  const [players, setPlayers] = useState(courtPlayers)



  useEffect(() => {
    setPlayers(courtPlayers)
  }, [courtPlayers])
  
  // Calculates whether the court has reached its player limit
  const isDroppable = () => {
    return players?.length < 4
  }

  const dispatch = useDispatch()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    canDrop: isDroppable,
    drop: (item: PlayerDropType) => {
      dispatch(
        movePlayerTo({
          source: item.source,
          target: courtPosition ?? Positions.Challenge,
          movedPlayerId: item.movedPlayerId,
        }),
      )
    },
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
      canDrop: !!monitor.canDrop()
    }),
  }), [players])

  //Alter court background based on hover
  let backgroundColor = '#9E9E9E'
  if (isOver && canDrop) {
    backgroundColor = '#4CAF50'
  } else if(isOver && !canDrop) {
    backgroundColor = '#F44336'
  }
  return (
    <div className="relative border border-solid border-black p-4" style={{ backgroundColor }} ref={drop}>
      <h2 className="absolute left-0 top-0">Court {courtNumber}</h2>
      <div className="grid grid-cols-2 gap-4 p-4">
        {players?.map((player) => (
          <Player key={player.id} player={player} parent={courtPosition}/>
        ))}
      </div>
    </div>
  )
}

export default Court
