import { Box, Button, Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModalOpen } from '../../../app/redux/gymSlice'
import { RootState } from '../../../app/redux/store'


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

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default SearchModal