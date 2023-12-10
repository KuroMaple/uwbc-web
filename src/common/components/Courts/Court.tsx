import Player from '../Player/Player'
import { Positions } from '../../interfaces/IPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { useDrop } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../../app/redux/DndTypes'
import { movePlayerTo, setCourtChallenge } from '../../../app/redux/gymSlice'
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

  // Pulling from redux store
  const isChallengeCourt = useSelector((state: RootState) => {
    switch (courtPosition) {
    // case Positions.Court1:
    //   return state.gym.court1.isChallenge
    // case Positions.Court2:
    //   return state.gym.court2.isChallenge
    // case Positions.Court3:
    //   return state.gym.court3.isChallenge
    case Positions.Court4:
      return state.gym.court4.isChallenge
    // case Positions.Court5:
    //   return state.gym.court5.isChallenge
    // case Positions.Court6:
    //   return state.gym.court6.isChallenge
    // case Positions.Court7:
    //   return state.gym.court7.isChallenge
    // case Positions.Court8:
    //   return state.gym.court8.isChallenge
    default:
      return false // Set a default value if courtPosition is not handled
    }
  })
  
  const [isDefender, setIsDefender] = useState(false) // Defender prop for non challenger court players

  useEffect(() => {
    setPlayers(courtPlayers)
  }, [courtPlayers])
  
  // Limit courts to four players max
  // Only allow one challenger per court

  const isDroppable = (item: PlayerDropType) => {
    const parent = item.source
    return (parent === Positions.Challenge && players.length === 0) || 
            (players.length < 4 && parent !== Positions.Challenge)
  }

  const dispatch = useDispatch()

  const [{ isOver, canDrop}, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    canDrop: (item) => isDroppable(item),
    drop: (item: PlayerDropType) => {
      if (item.source === Positions.Challenge) {
        dispatch(setCourtChallenge({
          courtNumber: parseInt(courtPosition),
          isChallenge: true,
        }))
      }
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
      canDrop: !!monitor.canDrop(),
    }),
  }), [players])

  //Alter court background based on hover
  let backgroundColor = '#d3d3d3'
  if (isOver && canDrop) {
    backgroundColor = '#4CAF50'
  } else if(isOver && !canDrop) {
    backgroundColor = '#F44336'
  }
  return (
    <div className='flex flex-row items-center space-x-7 h-full bg-green-600 min-w-court relative'>
      <div className='flex flex-col items-center'>
        {isChallengeCourt && <span className='text-sm'>Challenge</span>}
        <span>Court</span>
        <span className="text-5xl font-bold">{courtNumber}</span>
      </div>
      
      <div className="justify-items-center items-center rounded-md border border-solid border-black h-5/6 w-full grid grid-cols-2" style={{ backgroundColor }} ref={drop}>
        {players.map((player) => (
          <Player key={player.id} player={player} parent={courtPosition} isDefender={isDefender}/>
        ))}
      </div>
    </div>
    
  )
}

export default Court
