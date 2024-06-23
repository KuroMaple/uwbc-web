import { RootState } from '../../../app/redux/store'
import { useAddPlayersToSessionMutation } from '../../../services/apis/players'
import { useGetActiveMembersNotInSessionQuery } from '../../../services/apis/members'
import './AddPlayersModal.css'
import Modal from '../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import Autocomplete from '../Autocomplete/Autocomplete'
import Typography from '@mui/material/Typography/Typography'
import IAutoCompleteOption from '../../interfaces/IAutoCompleteOption'
import { useState } from 'react'
import { setModalOpen, setSnackOpen } from '../../../app/redux/appUtilSlice'
import { incrementPlayerCount, syncBenchPlayers } from '../../../app/redux/gymSlice'
import IAddPlayersResponse from '../../../services/interfaces/IAddPlayersResponse'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { SerializedError } from '@reduxjs/toolkit'





const AddPlayersModal = () => {
  const [membersToAdd, setMembersToAdd] = useState<IAutoCompleteOption[]>([])
  const sessionId = useSelector((state: RootState) => state.gym.sessionId) // Current Session id is stored globally
  
  const dispatch = useDispatch()
  const handleModalClose = () => dispatch(setModalOpen(false))
  const incrementPlayers = (numPlayersAdded: number) => dispatch(incrementPlayerCount(numPlayersAdded))

  // Getting bench state
  const benchPlayers = useSelector((state: RootState) => state.gym.benchPlayers)

  //API calls
  const {data: playerOptions} = useGetActiveMembersNotInSessionQuery(sessionId) // API call to get all active members not in session 
  const [addPlayers] = useAddPlayersToSessionMutation() // API call to add players to session in bulk


  const handleResponse = (response: { data: IAddPlayersResponse } | 
    { error: FetchBaseQueryError | SerializedError }, playerCount: number) => {
    if ('data' in response) {
      // The response contains data
      const data: IAddPlayersResponse = response.data

      dispatch(
        syncBenchPlayers(data.benchPlayers)
      )

      dispatch(
        setSnackOpen({
          message: ` ${playerCount} player(s) added to session`,
          severity: 'success',
          open: true
        })
      )

    } else if ('error' in response) {
      // The response contains an error
      const error: FetchBaseQueryError | SerializedError = response.error
      console.log('Error:', error)
      dispatch(
        setSnackOpen({
          message: 'Error adding players to session',
          severity: 'error',
          open: true
        })
      )
    } else {
      // The response is neither data nor an error
      dispatch(
        setSnackOpen({
          message: 'An unknown error occurred',
          severity: 'error',
          open: true
        })
      )
    }
  }
  
  const addPlayersToSession = async () => {
    const playerCount = membersToAdd.length
    incrementPlayers(playerCount)

    const emailArray = membersToAdd.map((member) => member.email)

    const data = await addPlayers({
      sessionId: sessionId,
      currentBenchPlayers: benchPlayers,
      newPlayerEmails: emailArray,
    })

    handleResponse(data, playerCount)
    
    handleModalClose()
  }


  return (
    <Modal>
      <div className='add-players-modal__container'>
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

export default AddPlayersModal