import { IconButton, Stack } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import StopIcon from '@mui/icons-material/Stop'

const IconButtonStyle = {
  fontSize: 60,
  backgroundColor: 'white',
  borderRadius: '50%', // Add a border-radius for a circular shape
  padding: '5px', // Add some padding for spacing
  transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', // Add a transition for a smooth effect

  '&:hover': {
    transform: 'scale(1.1)', // Enlarge the icon on hover
    backgroundColor: '#e0e0e0', // Change background color on hover
  },

  '&:active': {
    transform: 'scale(0.9)', // Adjust the scale factor for the click effect
    backgroundColor: '#ccc', // Change background color on click
  },
  marginBottom: '7px',

} 

interface Props {
  TimerActions: {
    start: () => void
    pause: () => void
    resume: () => void
    restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void
  }
}


const TimerControls: React.FC<Props> = ({TimerActions}) => {


  return (
    <Stack 
      direction='column'
      sx={{
        bgcolor: 'blue',
        padding: '5px',
        marginTop: '10px',
      }}
    >
      <IconButton
        sx={IconButtonStyle}
        onClick={TimerActions.start}>
        <PlayArrowIcon />
      </IconButton>
      <IconButton
        sx={IconButtonStyle}
        onClick={TimerActions.pause}>
        <PauseIcon />
      </IconButton>
      <IconButton
        sx={IconButtonStyle}
        onClick={() => { // Restart 13 min timer
          const time = new Date()
          time.setSeconds(time.getSeconds() + 780) // 13 minutes timer
          TimerActions.restart(time)
        }}>
        <StopIcon />
      </IconButton>
    </Stack>
  )
}

export default TimerControls