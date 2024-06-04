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
      return state.gym.court1.challengePlayerId !== undefined
    default:
      return false
    }
  })

  
  // Limit courts to four players max
  // Only allow one challenger per court
  const isDroppable = (item: itemDropType) => {
    const parent = item.source
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
    else {
      console.log('Invalid Drop from Bench/Challenge to Court Action Error: will have snackbar for this in future')
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

  const [{ isOver, canDrop}, drop] = useDrop(() => ({
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
    <div className='flex flex-row items-center space-x-7 h-full min-w-court relative pr-3'>
      { players.length > 0  && // remove all players X button
      <Box sx={{
        position: 'absolute',
        height: '30px',
        width: '30px',
        top: '0px',
        right: '0px',
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
      
      <div className="justify-items-center items-center rounded-md border border-solid border-black h-5/6 w-full grid grid-cols-2" style={{ backgroundColor }} ref={drop}>
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
