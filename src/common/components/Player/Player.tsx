import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Positions } from '../../interfaces/IPlayer'

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


const generateUniqueId = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const randomLetter = letters[Math.floor(Math.random() * letters.length)]

  // Generate a random number between 1 and 99, and pad it with leading zeros if necessary
  const randomNumber = Math.floor(Math.random() * 99) + 1
  const paddedNumber = randomNumber.toString().padStart(2, '0')

  // Combine the random letter and padded number to form the UID
  const uid = `${randomLetter}${paddedNumber}`

  return uid
}

const Player = () => {
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [level, setLevel] = useState(0)
  const [position, setPosition] = useState<Positions>()


  
  const myRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const genPlayer = () => {
    setName(testNames[myRandom(0,4)])
    setId(generateUniqueId)
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