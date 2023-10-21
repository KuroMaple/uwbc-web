import { Box, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

const setColor = (level: number) => {
  switch (level) {
    case 1:
      return {backgroundColor: "blue"}
      break
    case 2:
      return {backgroundColor: "purple"}
      break
    case 3:
      return {backgroundColor: "orange"}
      break
    case 4:
      return {backgroundColor: "green"};
      break

    default:
      return {backgroundColor: 'white'}
      break
  }
}

const cardStyles = setColor(3)
const Player = () => {
  return (
    <Box style={{ width: "100%", padding: "5px" }}>
      <Card style={cardStyles}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            A12
          </Typography>
          Bob Jones
        </CardContent>
      </Card>
    </Box>
  );
}

export default Player