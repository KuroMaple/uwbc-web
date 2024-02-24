import { Box, TextField, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { setModalOpen } from '../../../app/redux/gymSlice'
import { RootState } from '../../../app/redux/store'
import Autocomplete from '@mui/material/Autocomplete'
import IAutoCompleteOption from '../../interfaces/IAutoCompleteOption'
import { useAddPlayerToSessionMutation } from '../../../services/apis/players'
import { useGetActiveMembersNotInSessionQuery } from '../../../services/apis/members'


const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}



const SearchModal = () => {
  
  // Redux operations
  const dispatch = useDispatch()
  const modalOpen = useSelector((state: RootState) => state.gym.addPlayerModalOpen)
  const handleModalClose = () => dispatch(setModalOpen(false))
  const sessionID = useSelector((state: RootState) => state.gym.sessionId) // Current Session id is stored globally


  const {data: playerOptions} = useGetActiveMembersNotInSessionQuery() // API call to get all active members not in session


  //API call 
  const [addPlayer, result] = useAddPlayerToSessionMutation()

  const addPlayerToSession = (label: IAutoCompleteOption | null) => {

    if (label !== null){
      const email = label.label.split(' ')[2]
      addPlayer({session: sessionID, email: email}) // API call to add player to session
      handleModalClose()
    }
    else {
      console.log('ERROR: No player selected')
    }
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Search for member below:
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={playerOptions ?? []}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Member Name" />}
            onChange={(event, value) => addPlayerToSession(value)}
          />
        </Box>
      </Modal>
    </div>
  )
}

export default SearchModal