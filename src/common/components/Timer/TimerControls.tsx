import { IconButton, Stack } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'
import { memo } from 'react'

const IconButtonStyle = {
  fontSize: 60,
  padding: '5px', // Add some padding for spacing
  backgroundColor: 'white',
  borderRadius: '50%', // Add a border-radius for a circular shape
  transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', // Add a transition for a smooth effect

  '&:hover': {
    transform: 'scale(1.1)', // Enlarge the icon on hover
    backgroundColor: '#e0e0e0', // Change background color on hover
  },

  '&:active': {
    transform: 'scale(0.9)', // Adjust the scale factor for the click effect
    backgroundColor: '#ccc', // Change background color on click
  },

} 

interface Props {
  start: () => void
  pause: () => void
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void
  isRunning: boolean
}


const TimerControls: React.FC<Props> = ({ start, pause, restart, isRunning }) => {


  return (
    <Stack 
      className='timer-controls'
      direction='column'
      spacing={2}
      sx={{
        padding: '5px',
        marginTop: '10px',
        backgroundColor: 'lightblue',
        borderRadius: '10px',
        alignItems: 'center',
        justifyContent: 'between',
      }}
    >
      {isRunning ? (
        <IconButton
          sx={IconButtonStyle}
          onClick={pause}>
          <PauseIcon />
        </IconButton>) : (
        <IconButton
          sx={IconButtonStyle}
          onClick={start}>
          <PlayArrowIcon />
        </IconButton>)}
      
      <IconButton
        sx={IconButtonStyle}
        onClick={() => { // Restart 13 min timer
          const time = new Date()
          time.setSeconds(time.getSeconds() + 780) // 13 minutes timer
          restart(time)
        }}>
        <StopIcon />
      </IconButton>
    </Stack>
  )
}

export default memo(TimerControls)