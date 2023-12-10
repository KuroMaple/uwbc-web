import { useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import { Stack } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { resetAllCourts } from '../../../app/redux/gymSlice'
import TimerControls from '../../../common/components/Timer/TimerControls'

interface Props {
  TimerActions: {
    start: () => void
    pause: () => void
    resume: () => void
    restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void
  }
}

const MasterControls: React.FC<Props> = ({ TimerActions }) => {

  const dispatch = useDispatch()

  const resetCourts = () => {
    dispatch(resetAllCourts())
  }
  
  return (
    <Stack 
      direction='column'
      sx={{
        bgcolor: 'fuchsia',
        marginLeft: '10px',
        borderRadius: '10px',
        padding: '5px',
        height: '70%',
      }}>

      <IconButton
        onClick={resetCourts}
        sx={{
          fontSize: 60,
          backgroundColor: 'white',
          borderRadius: '50%', // Add a border-radius for a circular shape
          padding: '10px', // Add some padding for spacing
          transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', // Add a transition for a smooth effect

          '&:hover': {
            transform: 'scale(1.1)', // Enlarge the icon on hover
            backgroundColor: '#e0e0e0', // Change background color on hover
          },

          '&:active': {
            transform: 'scale(0.9)', // Adjust the scale factor for the click effect
            backgroundColor: '#ccc', // Change background color on click
          },
        }}

        title='Reset Courts'>
        <RestartAltIcon />
        
      </IconButton>

      <TimerControls TimerActions={TimerActions}/>
      
      
    </Stack>
  )
}

export default MasterControls