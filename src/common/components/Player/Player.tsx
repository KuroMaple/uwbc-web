import { Box, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import { useDrag } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../../app/redux/DndTypes'
import Chip from '../Chip/Chip'

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
}

const Player: React.FC<Props> = ({ player, parent }) => {
  
  // Shortens the name to first name and first letter of last name if name is too long
  const shortenNameToFirst = (name: string) => {
    if (name.length < 10) {
      return name
    }
    const nameArr = name.split(' ')
    return nameArr[0] + ' ' + nameArr[1][0] + '.'
  }

  const [name, setName] = useState(player.name)
  const [id, setId] = useState(player.id)
  const [level, setLevel] = useState(player.level)
  const [position, setPosition] = useState<Positions>(player.position)
  const [isMustGoOn, setIsMustGoOn] = useState(false)
  const [ticks, setTicks] = useState(0)

  // React Drag n Drop Logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: { movedPlayerId: id, source: parent } as PlayerDropType, // So that when a player is dropped, we can send both the source and target to reducer
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // !! converts the result to a boolean
    }),
  }))

  const isOnCourt = () => {
    return position !== Positions.Bench && position !== Positions.Challenge
  }

  if(isDragging){
    return <Box 
      sx={{
        width: '100%',
        padding: '5px',
      }}
      ref={drag}/>
  }

  return (
    <Box
      ref={drag}
      sx={
        {
          width: '160px',
          height: '60px',
          padding: '5px',
          position: 'relative',
        }
      }
      onDoubleClick={() => {
        setIsMustGoOn(!isMustGoOn)
      }}
    >
      {isMustGoOn &&  
      <Box sx={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        zIndex: 1,
      }}>
        <Chip variant='MGO'/>
      </Box> }
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
