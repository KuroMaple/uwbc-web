import { Box, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import { useDrag } from 'react-dnd'
import { ItemTypes, itemDropType } from '../../../app/redux/DndTypes'
import Chip from '../Chip/Chip'
import { useDispatch, useSelector} from 'react-redux'
import { ChipType } from '../Chip/types'
import { removeFromCourt, togglePlayerMGO } from '../../../app/redux/gymSlice'
import { RootState } from '../../../app/redux/store'

const setColor = (level: number) => {
  switch (level) {
  case 1:
    return { backgroundColor: '#89EFB8' } // Lime green

  case 2:
    return { backgroundColor: '#EFB889' } // Amber orange

  case 3:
    return { backgroundColor: '#EFB8E3' } // Fuschia pink

  case 4:
    return { backgroundColor: '#EFEB89' } // Yellow


  default:
    return { backgroundColor: 'white' } // White

  }
}

interface Props {
  player: IPlayer 
  isFromChallengePanel: boolean
}

const Player: React.FC<Props> = ({ player, isFromChallengePanel }) => {
  const dispatch = useDispatch() // Redux dispatch
  const [onCourt] = useState(player.position !== Positions.Bench && player.position !== Positions.Challenge)
  const challengePosition = useSelector((state: RootState) => state.gym.challengeQueue.findIndex((p) => p === player.id) + 1)
  const handleMakeItem = () : itemDropType => {
    if(player.position === Positions.Bench && isFromChallengePanel){
      return {
        itemId: player.id,
        source: Positions.Challenge
      }
    }
    else{
      return {
        itemId: player.id,
        source: player.position
      }
    }
  }
  
  // React Drag n Drop Logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: handleMakeItem, // So that when a player is dropped, we can send both the source and target to reducer
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // !! converts the result to a boolean
    }),
  }))

  // Shortens the name to first name and first letter of last name if name is too long
  const shortenNameToFirst = (playerName: string) => {
    if(!playerName){ // Debugging
      return 'No Name'
    }
    if (playerName.length < 10) {
      return playerName
    }
    const nameArr = playerName.split(' ')
    return nameArr[0] + ' ' + nameArr[1][0] + '.'
  }

  // Removes player from court and places them in bench
  const removePlayerFromCourt = () => {
    dispatch(
      removeFromCourt(
        {
          itemId: player.id,
          source: player.position,
          target: Positions.Bench,
        }
      )
    )
  }
  
  // to remove player from vision when dragging
  if(isDragging){
    return <Box 
      sx={{
        width: '100%',
        padding: '0px',
        margin: '0px',
      }}
      ref={drag}/>
  }

  return (
    <Box
      ref={drag}
      sx={
        {
          minWidth: '120px',
          height: '60px',
          padding: '3px',
          position: 'relative',
          WebkitUserSelect: 'none', // Prevent text selection
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
        }
      }
      onDoubleClick={() => {
        if (player.position === Positions.Bench) { // MGO status should only be changed if player is on bench
          dispatch(togglePlayerMGO(player.id))
        }
      }}
    >

      {/* Chip JSX Below*/}
      {player.isMGO  &&  // If on court, MGO should not be displayed
      <Box sx={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        zIndex: 1,
        width: '20px',
        height: '20px',
      }}>
        <Chip variant={ChipType.MGO}/>
      </Box> }

      
      {player.isChallenging && !player.isBeingChallenged &&
        <Box sx={{
          position: 'absolute',
          height: '25px',
          width: '30px',
          bottom: '0px', 
          right: '0px',
          zIndex: 4,
        }}>
          <Chip variant={ChipType.CH} challengePosition={challengePosition}/>
        </Box>
      }
      
      {onCourt &&
      <Box sx={{
        position: 'absolute',
        height: '17px',
        width: '17px',
        top: '0px',
        right: '0px',
        zIndex: 3,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        removePlayerFromCourt()
      }}
      >
        <Chip variant={ChipType.OC}/> 
      </Box>} 

      {player.isBeingChallenged /*&& onCourt && !player.isChallenging*/ && // Necessary to prevent overlap with CH chip, as IsDefender is set to true for challenge court
        <Box sx={{
          position: 'absolute',
          width: '25px',
          height: '20px',
          bottom: '0px',
          right: '0px',
          zIndex: 5,
        }}
        >
          <Chip variant={ChipType.DEF}/> 
        </Box>
      }


      {/* Player Tag JSX Below*/}
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          ...setColor(player.level),
          padding: '5px',
        }}>
        <Typography sx={{ fontSize: 11, fontWeight: 'bold', position: 'absolute', }} color="text.secondary" gutterBottom>
          M{player.id}
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold', position: 'absolute', left: '5px', bottom: '0px' }} color="text.secondary" gutterBottom>
          {player.ticks}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
          <Typography sx={{ fontSize: 15, marginTop: '10px' }} color="text.secondary" gutterBottom>
            {shortenNameToFirst(player.name)}
          </Typography>

        </Box>
        
      </Paper>
    </Box>
  )
}

export default Player
