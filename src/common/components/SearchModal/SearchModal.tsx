import { RootState } from '../../../app/redux/store'
import { useAddPlayerToSessionMutation } from '../../../services/apis/players'
import { useGetActiveMembersNotInSessionQuery } from '../../../services/apis/members'
import './SearchModal.css'
import Modal from '../Modal/Modal'
import { useSelector } from 'react-redux'
import Autocomplete from '../Autocomplete/Autocomplete'
import Typography from '@mui/material/Typography/Typography'






const SearchModal = () => {

  
  const sessionID = useSelector((state: RootState) => state.gym.sessionId) // Current Session id is stored globally


  const {data: playerOptions} = useGetActiveMembersNotInSessionQuery(sessionID) // API call to get all active members not in session


  //API call 
  const [addPlayer] = useAddPlayerToSessionMutation()

  const addPlayerToSession = () => {
    console.log('Adding players to session: ') // Debugging
    // if (label !== null){
    //   const email = label.label.split(' ')[2]
    //   console.log('Adding player to session: ', {
    //     session: sessionID,
    //     email: email
    //   }) // Debugging
    //   // addPlayer({session: sessionID, email: email}) // API call to add player to session
    //   // handleModalClose()
    // }
    // else {
    //   console.log('ERROR: No player selected')
    // }
  }

  return (
    <Modal>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Search for members to add below:
      </Typography>
      <Autocomplete
        options={playerOptions ?? []}
      />
    </Modal>

  )
}

export default SearchModal