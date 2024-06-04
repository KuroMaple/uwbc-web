import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import Chip from '../../common/components/Chip/Chip'
import { ChipType } from '../../common/components/Chip/types'
import IPlayer from '../../common/interfaces/IPlayer'

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
}

const MemberPlayer: React.FC<Props> = ({ player }) => {
  
  
  // Shortens the name to first name and first letter of last name if name is too long
  const shortenNameToFirst = (name: string) => {
    if (name.length < 10) {
      return name
    }
    const nameArr = name.split(' ')
    return nameArr[0] + ' ' + nameArr[1][0] + '.'
  }

  

  return (
    <Box
      sx={
        {
          minWidth: '120px',
          height: '60px',
          padding: '3px',
          position: 'relative',
        }
      }
    >
      
      {player.isChallenging &&
        <Box sx={{
          position: 'absolute',
          height: '25px',
          width: '30px',
          bottom: '0px', // altering bottom instead of top to avoid overlap with X button
          right: '0px',
          zIndex: 4,
        }}>
          <Chip variant={ChipType.CH}/>
        </Box>
      }

      {player.isBeingChallenged && // Necessary to prevent overlap with CH chip, as IsDefender is set to true for challenge court
        <Box sx={{
          position: 'absolute',
          width: '25px',
          height: '20px',
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
          ...setColor(player.level),
          padding: '5px',
        }}>
        <Typography sx={{ fontSize: 12, fontWeight: 'bold', position: 'absolute', }} color="text.secondary" gutterBottom>
          {player.id}
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
          <Typography sx={{ fontSize: 15 }} color="text.secondary" >
            {shortenNameToFirst(player.name)}
          </Typography>

        </Box>
        
      </Paper>
    </Box>
  )
}

export default MemberPlayer
