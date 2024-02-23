import { Box, Button, TextField, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalOpen } from '../../../app/redux/gymSlice'
import { RootState } from '../../../app/redux/store'
import { useGetActiveMembersQuery } from '../../../services/apis/members'
import Autocomplete from '@mui/material/Autocomplete'
import IAutoCompleteOption from '../../interfaces/IAutoCompleteOption'
import { IMember } from '../../../services/interfaces/IMember'


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
  
  const dispatch = useDispatch()
  const modalOpen = useSelector((state: RootState) => state.gym.addPlayerModalOpen)
  const handleModalClose = () => dispatch(setModalOpen(false))

  const sessionID = useSelector((state: RootState) => state.gym.sessionId)
  const [playerList, setPlayerList] = useState<IAutoCompleteOption[]>([])

  const {data: memberList} = useGetActiveMembersQuery()

  const transformResponse = (members: IMember[]) => {
    const modifiedMembers = members.map((member) => {
      return {
        label: member.first_name + ' ' + member.last_name + ' ' + member.email,
      }
    })
    console.log('modifiedMembers: ', modifiedMembers)
    setPlayerList(modifiedMembers)
  }

  useEffect(() => {
    if (playerList.length === 0){
      transformResponse(memberList ?? [])
    }
  }, [memberList])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const addPlayerToSession = () => {
    // API call to add player to session
    

    handleModalClose()
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
            options={playerList}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Member Name" />
            }
          />
          <Button onClick={handleModalClose}>Add</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default SearchModal