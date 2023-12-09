import { Box, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import { useDrag } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../../app/redux/DndTypes'
import Chip from '../Chip/Chip'
import { useDispatch } from 'react-redux'
import { movePlayerTo, setChallengerStatus, updateMGOStatus } from '../../../app/redux/gymSlice'
import { ChipType } from '../Chip/types'

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
  parent: Positions
  isDefender?: boolean
}

const Player: React.FC<Props> = ({ player, parent, isDefender }) => {
  
  // Externally pulled player properties
  const [name, setName] = useState(player.name)
  const [id, setId] = useState(player.id)
  const [level, setLevel] = useState(player.level)
  const [position, setPosition] = useState<Positions>(player.position)
  const [ticks, setTicks] = useState(player.ticks)
  const [isMustGoOn, setIsMustGoOn] = useState(player.isMustGoOn)
  const [isChallenger, setIsChallenger] = useState(player.isChallenger) // Edit courts from more than one device consideration 

  // Local player properties
  const [onCourt, setOnCourt] = useState(false)
  const [isDefenderState, setIsDefenderState] = useState(false)
  

  // Redux connection
  const dispatch = useDispatch()
  
  useEffect(() => {
    setName(player.name)
    setId(player.id)
    setLevel(player.level)
    setPosition(player.position) // Setting position in gym explicitly 
    setTicks(player.ticks)
    setIsMustGoOn(player.isMustGoOn)
    setOnCourt(parent !== Positions.Bench && parent !== Positions.Challenge)
    setIsChallenger(player.isChallenger)

    if(isDefender){ // if the defender state was passed set it
      setIsDefenderState(isDefender)
    }

    if (parent === Positions.Challenge){
      dispatch(setChallengerStatus({
        playerId: id,
        newChallengerStatus: true,
      }))
      setIsChallenger(true)
    }
    
    

  }, [player])
  
  // React Drag n Drop Logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: { movedPlayerId: id, source: parent } as PlayerDropType, // So that when a player is dropped, we can send both the source and target to reducer
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // !! converts the result to a boolean
    }),
  }))

  // Shortens the name to first name and first letter of last name if name is too long
  const shortenNameToFirst = (name: string) => {
    if (name.length < 10) {
      return name
    }
    const nameArr = name.split(' ')
    return nameArr[0] + ' ' + nameArr[1][0] + '.'
  }

  // Removes player from court and places them in bench
  const removeFromCourt = () => {
    dispatch(
      movePlayerTo({
        source: position,
        target: Positions.Bench,
        movedPlayerId: id,
      })
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
        }
      }
      onDoubleClick={() => {
        if (position === Positions.Bench) { // MGO status should only be changed if player is on bench
          dispatch(updateMGOStatus(
            {
              playerId: id,
              newMGOStatus: !isMustGoOn,
            }))
          setIsMustGoOn(!isMustGoOn)
        }
      }}
    >

      {/* Chip JSX Below*/}
      {isMustGoOn && !onCourt &&  // If on court, MGO should not be displayed
      <Box sx={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        zIndex: 1,
      }}>
        <Chip variant={ChipType.MGO}/>
      </Box> }

      {isChallenger && !onCourt &&
        <Box sx={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          zIndex: 2,
        }}>
          <Chip variant={ChipType.CH}/>
        </Box>}
      
      {isChallenger && onCourt &&
        <Box sx={{
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          zIndex: 4,
        }}>
          <Chip variant={ChipType.CH}/>
        </Box>
      }
      
      {onCourt &&
      <Box sx={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        zIndex: 3,
        '&:hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => {
        removeFromCourt()
      }}
      >
        <Chip variant={ChipType.OC}/> 
      </Box>}

      {isDefenderState && onCourt &&
        <Box sx={{
          position: 'absolute',
          bottom: '0px',
          right: '0px',
          zIndex: 3,
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
          ...setColor(level),
          padding: '5px',
        }}>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold', position: 'absolute', }} color="text.secondary" gutterBottom>
          {id}
        </Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold', position: 'absolute', left: '5px', bottom: '0px' }} color="text.secondary" gutterBottom>
          {ticks}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
          <Typography sx={{ fontSize: 15, marginTop: '10px' }} color="text.secondary" gutterBottom>
            {shortenNameToFirst(name)}
          </Typography>

        </Box>
        
      </Paper>
    </Box>
  )
}

export default Player
