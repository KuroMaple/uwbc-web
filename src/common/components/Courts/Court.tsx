import Player from '../Player/Player'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { useDrop } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import { Box } from '@mui/material'
import Chip from '../Chip/Chip'
import { ChipType } from '../Chip/types'
import { useEffect, useState } from 'react'
import { useChangePlayerPositionMutation, useGetPlayersBySessionPositionQuery } from '../../../services/apis/players'
import { movePlayerTo, setCourtChallenge } from '../../../app/redux/gymSlice'
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
    default:
      return []
    }
  }
  )

  
  const session = useSelector((state: RootState) => state.gym.sessionId)

  const isChallengeCourt = useSelector((state: RootState) => {
    switch(courtPosition){
    case Positions.Court1:
      return state.gym.court1.isChallengeCourt
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

  const removeAllPlayers = () => {
    players.forEach((player) => {
      dispatch(
        movePlayerTo({
          itemId: player.id,
          source: courtPosition, // This can(and maybe should?) be replaced with player.position
          target: Positions.Bench,
        })
      )

      //Reset court challenge status
      dispatch(
        setCourtChallenge({
          courtNumber: parseInt(courtNumber),
          isChallenge: false,
        })
      )
    })
  }

  const [{ isOver, canDrop}, drop] = useDrop(() => ({
    accept: ItemTypes.PLAYER,
    canDrop: (item) => isDroppable(item),
    drop: (item: itemDropType) => {
      dispatch(
        movePlayerTo({
          itemId: item.itemId,
          source: item.source, 
          target: courtPosition,
        })
      )

      if(item.source === Positions.Challenge){
        dispatch(
          setCourtChallenge({
            courtNumber: parseInt(courtNumber),
            isChallenge: true,
          })
        )
      }
    },
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
          <Player key={player.id} player={player}/> /* isDefender is set to true for challenge court, 
                                                                                                    since there is explict check for challenger player chips
                                                                                                     when setting defender chips*/
        ))}
      </div>
    </div>
    
  )
}

export default Court
