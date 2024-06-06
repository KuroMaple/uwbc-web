import MuiModal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { setModalOpen } from '../../../app/redux/addPlayerModalSlice'
import Button from '../Button/Button'
import { Close } from '@mui/icons-material'
import { Box, SxProps } from '@mui/material'

type Props = {
  children: React.ReactNode
}

const modalContentStyles: SxProps = {
  transform: 'translate(-50%, -50%)',
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  width: '400px',
  height: '500px',
  bgcolor: 'background.paper',
  boxShadow: 20,
  p: 4,
  borderRadius: '8px',
}

const Modal = ({ children }: Props) => {

  // Redux operations
  const dispatch = useDispatch()
  const modalOpen = useSelector((state: RootState) => state.addPlayerModal.open)
  const handleModalClose = () => dispatch(setModalOpen(false))

  return (
    <MuiModal
      open={modalOpen}
      onClose={handleModalClose}
    >
      <Box
        sx={{...modalContentStyles}}
      >
        {children}
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

export default Modal