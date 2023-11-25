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
    case Positions.Court2: {
      return state.gym.court2.players
    }
    case Positions.Court3: {
      return state.gym.court3.players
    }
    case Positions.Court4: {
      return state.gym.court4.players
    }
    case Positions.Court5: {
      return state.gym.court5.players
    }
    case Positions.Court6: {
      return state.gym.court6.players
    }
    case Positions.Court7: {
      return state.gym.court7.players
    }
    case Positions.Court8: {
      return state.gym.court8.players
    }
    }
    
  })!


  const [players, setPlayers] = useState(courtPlayers)



  useEffect(() => {
    setPlayers(courtPlayers)
  }, [courtPlayers])
  
  // Calculates whether the court has reached its player limit
  const isDroppable = () => {
    return players.length < 4
  }

  const dispatch = useDispatch()

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    canDrop: isDroppable,
    drop: (item: PlayerDropType) => {
      dispatch(
        movePlayerTo({
          source: item.source,
          target: courtPosition,
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
    <div className='flex flex-row items-center space-x-4 pl-5'>
      <span className="text-2xl">{courtNumber}</span>
      <div className="rounded-md relative border border-solid border-black h-40 w-80 grid grid-cols-2" style={{ backgroundColor }} ref={drop}>
        {players.map((player) => (
          <Player key={player.id} player={player} parent={courtPosition}/>
        ))}
      </div>
    </div>
    
  )
}

export default Court
