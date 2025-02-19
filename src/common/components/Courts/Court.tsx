import Player from '../Player/Player'
import  { Positions } from '../../interfaces/IPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import { Box } from '@mui/material'
import Chip from '../Chip/Chip'
import { ChipType } from '../Chip/types'
import { moveBenchPlayerToCourt, moveChallengerToCourt, removeFromCourt } from '../../../app/redux/gymSlice'
import './Court.css'


interface Props {
  courtPosition: Positions
  courtNumber: string
}
const Court: React.FC<Props> = ({ courtPosition, courtNumber }) => {
  const dispatch = useDispatch()
  // Redux pulled data
  const players = useSelector((state: RootState) =>{
    switch(courtPosition){
    case Positions.Court1:
      return state.gym.court1.players
    case Positions.Court2:
      return state.gym.court2.players
    case Positions.Court3:
      return state.gym.court3.players
    case Positions.Court4:
      return state.gym.court4.players
    case Positions.Court5:
      return state.gym.court5.players
    case Positions.Court6:
      return state.gym.court6.players
    case Positions.Court7:
      return state.gym.court7.players
    case Positions.Court8:
      return state.gym.court8.players
    default:
      return []
    }
  }
  )


  const isChallengeCourt = useSelector((state: RootState) => {
    switch(courtPosition){
    case Positions.Court1:
      return state.gym.court1.challengePlayerId !== null
    case Positions.Court2:
      return state.gym.court2.challengePlayerId !== null
    case Positions.Court3:
      return state.gym.court3.challengePlayerId !== null
    case Positions.Court4:
      return state.gym.court4.challengePlayerId !== null
    case Positions.Court5:
      return state.gym.court5.challengePlayerId !== null
    case Positions.Court6:
      return state.gym.court6.challengePlayerId !== null
    case Positions.Court7:
      return state.gym.court7.challengePlayerId !== null
    case Positions.Court8:
      return state.gym.court8.challengePlayerId !== null
    default:
      return false
    }
  })

  
  // Limit courts to four players max
  // Only allow one challenger per court
  const isDroppable = (item: itemDropType) => {
    const parent = item.source
    if (parent === courtPosition) {
      return true
    }
    if (parent !== Positions.Bench && parent !== Positions.Challenge) {
      return false
    }
    return (parent === Positions.Challenge && players.length === 0) || 
            (players.length < 4 && parent !== Positions.Challenge) 
  }

  const handleDrop = (item: itemDropType) => {
    // Bench to Court Move
    if (item.source === Positions.Bench) {
      dispatch(
        moveBenchPlayerToCourt({
          itemId: item.itemId,
          source: item.source,
          target: courtPosition,
        })
      )
    }
    else if (item.source === Positions.Challenge) { // Challenge to Court Move
      dispatch(
        moveChallengerToCourt({
          itemId: item.itemId,
          source: item.source,
          target: courtPosition,
        })
      )
    }
  }

  const removeAllPlayers = () => {
    players.forEach((player) => {
      dispatch(
        removeFromCourt({
          itemId: player.id,
          source: courtPosition,
          target: Positions.Bench,
        
        })
      )
    })
  }

  const [{ isOver, canDrop,}, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    canDrop: (item) => isDroppable(item),
    drop: (item: itemDropType) => handleDrop(item),
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
      canDrop: !!monitor.canDrop(),
    }),
  }), [players]) // Memoization happening here?

  //Alter court background based on hover
  let backgroundColor = '#d3d3d3'
  if (isOver && canDrop) {
    backgroundColor = '#4CAF50'
  } else if(isOver && !canDrop) {
    backgroundColor = '#F44336'
  }
  return (
    <div className='court-container'>
      { players.length > 0  && // remove all players X button
      <Box sx={{
        position: 'absolute',
        height: '30px',
        width: '30px',
        top: '10px',
        right: '-10px',
        zIndex: 3,
        '&:hover': {
          cursor: 'pointer',
        },
        '& > *': {
          fontSize: '20px', // Adjust font size of child chip
        },
      }}
      onClick={removeAllPlayers}
      >
        <Chip variant={ChipType.OC}/> 
      </Box>}
      <div className='flex flex-col items-center'>
        {isChallengeCourt && <span className='text-sm'>Challenge</span>}
        <span>Court</span>
        <span className="text-5xl font-bold">{courtNumber}</span>
      </div>
      
      <div className="playerContainer" style={{ backgroundColor }} ref={drop}>
        {players.map((player) => (
          <Player key={player.id} player={player} isFromChallengePanel={false}/> /* isDefender is set to true for challenge court, 
                                                                                                    since there is explict check for challenger player chips
                                                                                                     when setting defender chips*/
        ))}
      </div>
    </div>
    
  )
}

export default Court
