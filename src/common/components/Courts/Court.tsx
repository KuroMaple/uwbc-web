import Player from '../Player/Player'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import { Box } from '@mui/material'
import Chip from '../Chip/Chip'
import { ChipType } from '../Chip/types'
import { useEffect, useState } from 'react'
import { useChangePlayerPositionMutation, useGetPlayersBySessionPositionQuery } from '../../../services/apis/players'
interface Props {
  courtPosition: Positions
  courtNumber: string
}
const Court: React.FC<Props> = ({ courtPosition, courtNumber }) => {

  const [playerTags, setPlayerTags] = useState<IPlayer[]>([])

  // Pull current session from redux store
  const session = useSelector((state: RootState) => state.gym.sessionId)

  // Pull players on court from API
  const { // Replace with Redux
    data: playersData,
  } = useGetPlayersBySessionPositionQuery({
    session: session ?? 0,
    position: courtPosition,
  })

  // store players on court in local state
  useEffect(() => {
    setPlayerTags(playersData?.players ?? [])
  }, [playersData])

  // To add or remove players on court
  const [movePlayer] = useChangePlayerPositionMutation()
  

  // Determine if court is a challenge court
  const isChallengeCourt = () => {
    for (let i = 0; i < playerTags.length; i++) { // Potential bug since not doing "react" way
      if (playerTags[i].is_challenging) {
        return true
      }
    }
    return false
  }
  
  // Limit courts to four players max
  // Only allow one challenger per court

  const isDroppable = (item: itemDropType) => {
    const parent = item.source
    return (parent === Positions.Challenge && playerTags.length === 0) || 
            (playerTags.length < 4 && parent !== Positions.Challenge)
  }

  const removeAllPlayers = () => {
    playerTags.forEach((player) => {
      movePlayer({
        member: player.member,
        session: session ?? 0,
        position: Positions.Bench,
      })
    })
  }

  const [{ isOver, canDrop}, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    canDrop: (item) => isDroppable(item),
    drop: (item: itemDropType) => {
      movePlayer({
        member: item.itemId,
        session: item.session,
        position: courtPosition,
      })
    },
    collect: (monitor) => ({
      // Use isOver to modify behaviour when user is currently dragging
      isOver: !!monitor.isOver(), // !! converts value to boolean
      canDrop: !!monitor.canDrop(),
    }),
  }), [playerTags]) // Memoization happening here?

  //Alter court background based on hover
  let backgroundColor = '#d3d3d3'
  if (isOver && canDrop) {
    backgroundColor = '#4CAF50'
  } else if(isOver && !canDrop) {
    backgroundColor = '#F44336'
  }
  return (
    <div className='flex flex-row items-center space-x-7 h-full min-w-court relative pr-3'>
      { playerTags.length > 0  && // remove all players X button
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
        {isChallengeCourt() && <span className='text-sm'>Challenge</span>}
        <span>Court</span>
        <span className="text-5xl font-bold">{courtNumber}</span>
      </div>
      
      <div className="justify-items-center items-center rounded-md border border-solid border-black h-5/6 w-full grid grid-cols-2" style={{ backgroundColor }} ref={drop}>
        {playerTags.map((player) => (
          <Player key={player.member} player={player} parent={courtPosition} isDefender={isChallengeCourt()}/> /* isDefender is set to true for challenge court, 
                                                                                                    since there is explict check for challenger player chips
                                                                                                     when setting defender chips*/
        ))}
      </div>
    </div>
    
  )
}

export default Court
