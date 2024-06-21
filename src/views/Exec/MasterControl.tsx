import { useDispatch, useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import { Stack } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import TimerControls from '../../common/components/Timer/TimerControls'
import { memo, useState } from 'react'
import { RootState } from '../../app/redux/store'
import BackupIcon from '@mui/icons-material/Backup'
import { usePostGymStateMutation } from '../../services/apis/syncRedux'
import { setSnackOpen } from '../../app/redux/appUtilSlice'
import ResetCourtAlert from '../../common/components/Alert/ResetCourtAlert'
import { selectGymState } from '../../app/redux/gymSlice'

interface Props {
  start: () => void
  pause: () => void
  restart: (newExpiryTimestamp: Date, autoStart?: boolean | undefined) => void
  isRunning: boolean
}

const localButtonStyle = {
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
}

const MasterControls: React.FC<Props> = ({ start, pause, restart, isRunning }) => {
  const dispatch = useDispatch()
  const reduxGymState = useSelector((state: RootState) => selectGymState(state))
  const [postGymState] = usePostGymStateMutation()
 
  // const gymState = {
  //   sessionId: reduxGymState.sessionId,
  //   playerCount: reduxGymState.playerCount,
  //   benchPlayers: reduxGymState.benchPlayers,
  //   challengeQueue: reduxGymState.challengeQueue,
  //   court1: {
  //     challengePlayerId: reduxGymState.court1.challengePlayerId,
  //     players: reduxGymState.court1.players,
  //   },
  //   court2: {
  //     challengePlayerId: reduxGymState.court2.challengePlayerId,
  //     players: reduxGymState.court2.players,
  //   },
  //   court3: {
  //     challengePlayerId: reduxGymState.court3.challengePlayerId,
  //     players: reduxGymState.court3.players,
  //   },
  //   court4: {
  //     challengePlayerId: reduxGymState.court4.challengePlayerId,
  //     players: reduxGymState.court4.players,
  //   },
  //   court5: {
  //     challengePlayerId: reduxGymState.court5.challengePlayerId,
  //     players: reduxGymState.court5.players,
  //   },
  //   court6: {
  //     challengePlayerId: reduxGymState.court6.challengePlayerId,
  //     players: reduxGymState.court6.players,
  //   },
  //   court7: {
  //     challengePlayerId: reduxGymState.court7.challengePlayerId,
  //     players: reduxGymState.court7.players,
  //   },
  //   court8: {
  //     challengePlayerId: reduxGymState.court8.challengePlayerId,
  //     players: reduxGymState.court8.players,
  //   }
  // }
  const [alertOpen, setAlertOpen] = useState(false)
    
  const handleResetAllCourts = () => {
    setAlertOpen(true)
  }

  
  return (
    <Stack 
      direction='column'
      spacing={2}
      sx={{
        bgcolor: '#c227ff',
        marginLeft: '10px',
        borderRadius: '10px',
        padding: '5px',
        height: 'fit-content',
      }}>

      <IconButton
        className='reset-courts'
        onClick={handleResetAllCourts}
        sx={localButtonStyle}

        title='Reset Courts'>
        <RestartAltIcon />
        
      </IconButton>
      <IconButton
        className='reset-courts  hover:text-green-500'
        onClick={() => {
          postGymState(reduxGymState)
          dispatch(
            setSnackOpen({
              open: true,
              message: 'Courts Uploaded',
              severity: 'success',
            })
          )
        }}

        sx={localButtonStyle}
        title='Upload Courts'>
        <BackupIcon />
        
      </IconButton>


      <TimerControls start={start} pause={pause} restart={restart} isRunning={isRunning} />
      
      <ResetCourtAlert alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
    </Stack>
  )
}

export default memo(MasterControls)