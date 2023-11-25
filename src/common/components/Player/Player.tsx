import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import { useDrag } from 'react-dnd'
import { ItemTypes, PlayerDropType } from '../../../app/redux/DndTypes'

const setColor = (level: number) => {
  switch (level) {
  case 1:
    return { backgroundColor: '#85FF2E' }
    break
  case 2:
    return { backgroundColor: '#FEB700' }
    break
  case 3:
    return { backgroundColor: '#FC1FFF' }
    break
  case 4:
    return { backgroundColor: '#FFEF2E' }
    break

  default:
    return { backgroundColor: 'white' }
    break
  }
}

interface Props {
  player: IPlayer
  parent: Positions
}

const Player: React.FC<Props> = ({ player, parent }) => {
  const shortenNameToFirst = (name: string) => {
    const nameArr = name.split(' ')
    return nameArr[0] + ' ' + nameArr[1][0] + '.'
  }

  const [name, setName] = useState(player.name)
  const [id, setId] = useState(player.id)
  const [level, setLevel] = useState(player.level)
  const [position, setPosition] = useState<Positions>(player.position)



  

  // React Drag n Drop Logic
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    item: { movedPlayerId: id, source: parent } as PlayerDropType, // So that when a player is dropped, we can send both the source and target to reducer
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // !! converts the result to a boolean
    }),
  }))

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
      sx={{
        padding: '0px',
        margin: '0px',
      }}
    >
      <Card sx={[setColor(level), {
        borderRadius: '20px',
        height: '50px',
        width: '125px',
        padding: '0px',
        margin: '0px',
      }]}>
        <CardContent
          sx={{
            padding: '0px',
            margin: '0px',
          }}>
          <Typography sx={{ fontSize: 11, fontWeight: 'bold', position: 'absolute', }} color="text.secondary" gutterBottom>
            {id}
          </Typography>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}>
            <Typography sx={{ fontSize: 13 }} color="text.secondary" gutterBottom>
              {shortenNameToFirst(name)}
            </Typography>
          </Box>

        </CardContent>
      </Card>
    </Box>
  )
}

export default Player
