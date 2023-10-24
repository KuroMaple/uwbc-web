import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import IPlayer, { Positions } from '../../interfaces/IPlayer'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../interfaces/DraggableTypes'

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
    return {backgroundColor: 'white'}
    break
  }
}

interface Props {
  player: IPlayer
}

const Player: React.FC<Props> = ({ player }) => {
  const [name, setName] = useState(player.name)
  const [id, setId] = useState(player.id)
  const [level, setLevel] = useState(player.level)
  const [position, setPosition] = useState<Positions>(player.position)

  // React Drag n Drop Logic
  // Makes the Player tag Draggable Visually
  const [{isDragging}, drag] = useDrag(() => ({
    type: ItemTypes.PLAYER,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  

  

  return (
    <Box
      sx={{
        width: '100%',
        padding: '5px',
      }}
      ref={drag}
    >
      <Card sx={setColor(level)}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          >
            {id}
          </Typography>
          <p className="overflow-hidden">{name}</p>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Player