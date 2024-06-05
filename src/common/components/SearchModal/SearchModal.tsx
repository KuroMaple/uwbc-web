import { Box, SxProps, TextField, Typography } from '@mui/material'
import MuiModal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { setModalOpen } from '../../../app/redux/addPlayerModalSlice'
import { RootState } from '../../../app/redux/store'
import Autocomplete from '@mui/material/Autocomplete'
import IAutoCompleteOption from '../../interfaces/IAutoCompleteOption'
import { useAddPlayerToSessionMutation } from '../../../services/apis/players'
import { useGetActiveMembersNotInSessionQuery } from '../../../services/apis/members'
import { useState } from 'react'
import './SearchModal.css'
import Button from '../Button/Button'
import { Close } from '@mui/icons-material'


const modalContentStyles: SxProps = {
  transform: 'translate(-50%, -50%)',
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  width: '400px',
  height: '200px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}



const SearchModal = () => {
  
  // state
  const [inputState, setInputState] = useState<IAutoCompleteOption | null>(null) 
  const [TextFieldState, setTextFieldState] = useState('')
  // Redux operations
  const dispatch = useDispatch()
  const modalOpen = useSelector((state: RootState) => state.addPlayerModal.open)
  const handleModalClose = () => dispatch(setModalOpen(false))
  const sessionID = useSelector((state: RootState) => state.gym.sessionId) // Current Session id is stored globally


  const {data: playerOptions} = useGetActiveMembersNotInSessionQuery(sessionID) // API call to get all active members not in session


  //API call 
  const [addPlayer] = useAddPlayerToSessionMutation()

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
    <MuiModal
      open={modalOpen}
      onClose={handleModalClose}
      
    >
      <Box
        sx={modalContentStyles}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Search for member below:
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={playerOptions ?? []}
          sx={{ width: 300 }}
          renderInput={(params) => 
            <TextField 
              {...params} 
              label="Member Name" 
              value={TextFieldState}
              onChange={(event) => {
                setTextFieldState(event.target.value)
              }}
            />}

          value={inputState}
          onChange={(event, value) => {
            addPlayerToSession(value)
            event.preventDefault()
            setTextFieldState('')
            setInputState(null)
          }}

          onSelect= { () => {
            setTextFieldState('')
            setInputState(null)            
          }}

            
        />
        <div className='absolute top-[8px] right-2'>
          <Button
            variant='icon'
            icon={<Close />}
            onClick={handleModalClose}
          />
        </div>
      </Box>
    </MuiModal>

  )
}

export default SearchModal