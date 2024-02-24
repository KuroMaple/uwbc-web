import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import { Stack } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import TimerControls from '../../common/components/Timer/TimerControls'
import { memo } from 'react'
import { useResetAllCourtsMutation } from '../../services/apis/players'
import { RootState } from '../../app/redux/store'

interface Props {
  start: () => void
  pause: () => void
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void
  isRunning: boolean
}

const MasterControls: React.FC<Props> = ({ start, pause, restart, isRunning }) => {

  const session = useSelector((state: RootState) => state.gym.sessionId)
  const [resetAllCourts] = useResetAllCourtsMutation()

  
  return (
    <Stack 
      direction='column'
      spacing={2}
      sx={{
        bgcolor: 'fuchsia',
        marginLeft: '10px',
        borderRadius: '10px',
        padding: '5px',
        height: 'fit-content',
      }}>

      <IconButton
        className='reset-courts'
        onClick={() => resetAllCourts({session: session})}
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

      <TimerControls start={start} pause={pause} restart={restart} isRunning={isRunning} />
      
      
    </Stack>
  )
}

export default memo(MasterControls)