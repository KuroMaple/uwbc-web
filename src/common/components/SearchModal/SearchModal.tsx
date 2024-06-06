import { RootState } from '../../../app/redux/store'
import { useAddPlayerToSessionMutation } from '../../../services/apis/players'
import { useGetActiveMembersNotInSessionQuery } from '../../../services/apis/members'
import './SearchModal.css'
import Modal from '../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '../Autocomplete/Autocomplete'
import Typography from '@mui/material/Typography/Typography'
import IAutoCompleteOption from '../../interfaces/IAutoCompleteOption'
import { useState } from 'react'
import './SearchModal.css'
import { setModalOpen } from '../../../app/redux/addPlayerModalSlice'
import { incrementPlayerCount } from '../../../app/redux/gymSlice'





const SearchModal = () => {
  const [membersToAdd, setMembersToAdd] = useState<IAutoCompleteOption[]>([])
  const sessionID = useSelector((state: RootState) => state.gym.sessionId) // Current Session id is stored globally
  
  const dispatch = useDispatch()
  const handleModalClose = () => dispatch(setModalOpen(false))
  const incrementPlayer = () => dispatch(incrementPlayerCount())

  //API call
  const {data: playerOptions} = useGetActiveMembersNotInSessionQuery(sessionID) // API call to get all active members not in session 
  const [addPlayer] = useAddPlayerToSessionMutation()

  const addPlayersToSession = () => {
    console.log('Adding players to session: ', membersToAdd) // Debugging
    membersToAdd.forEach((member) => {
      addPlayer({session: sessionID, email: member.email})
      incrementPlayer()
    })
    handleModalClose()
  }


  return (
    <Modal>
      <div className='search-modal__container'>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{marginBottom: '20px', borderBottom: 'solid 2px', borderColor: '#4A4A4A', color: '#4A4A4A'}}>
          Add Members to Session
        </Typography>
        <Autocomplete
          handleSubmit={addPlayersToSession}
          setValue={setMembersToAdd }
          options={playerOptions ?? []}
        />
        <div className="button-container">
          <button
            className="submit-button  "
            onClick={addPlayersToSession}
            disabled={membersToAdd.length === 0}

          >
          Add
          </button>
        </div>
      </div>
    </Modal>

  )
}

export default SearchModal