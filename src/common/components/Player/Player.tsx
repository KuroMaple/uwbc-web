import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

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

const testNames = ['Josh Jones', 'Bobby Wu', 'Jackie Chan', 'Dwayne the Rock Johnson', 'Jeff Lai']
const testId = [
  'A12',
  'B13',
  'C09',
  'D09',
  'E08',
]

const Player = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [level, setLevel] = useState(0)

  const dispatch = useDispatch()

  
  const myRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const genPlayer = () => {

    setName(testNames[myRandom(0,4)])
    setId(testId[myRandom(0, 4)])
    setLevel(myRandom(1,5))
  }

  useEffect(() => {
    genPlayer()
  }, [])
  

  return (
    <Box
      sx={{
        width: '100%',
        padding: '5px',
      }}
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