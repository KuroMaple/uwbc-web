import { useDispatch } from 'react-redux'
import { setModalMapId, setModalOpen, setSnackOpen } from '../../../app/redux/appUtilSlice'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import IconButton from '@mui/material/IconButton'
import { Stack } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import DeleteIcon from '@mui/icons-material/Delete'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CheckIcon from '@mui/icons-material/Check'
import 'intro.js/introjs.css'

type Props = {
  filterByMGO: boolean
  setFilterByMGO: React.Dispatch<React.SetStateAction<boolean>>
  deleteMode: boolean
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>
}

const Controls = ({ filterByMGO, setFilterByMGO, deleteMode, setDeleteMode } : Props) => {

  const dispatch = useDispatch()
  const handleModalOpen = (modalId: string) => {
    dispatch(setModalMapId(modalId))
    dispatch(setModalOpen(true))
  }
  
  return (
    
    <Stack direction='row'>
      <IconButton
        onClick={() => handleModalOpen('AddPlayers')}
        title='Add Players'
        id='add-player'>
        <AddToPhotosIcon/>
      </IconButton>
      <IconButton
        id='filter-by-mgo'
        title='Filter by MGO'
        onClick={() => {
          if(!filterByMGO){
            dispatch(
              setSnackOpen(
                {
                  open: true,
                  message: 'Filter by MGO activated',
                  severity: 'info'
                }
              )
            )
          }
         
          setFilterByMGO(!filterByMGO)
        }}
        sx={{
          backgroundColor: filterByMGO ? '#27C376' : 'inherit',
          ':hover': {
            backgroundColor: filterByMGO ? '#27C376' : '#EAEAEA',
          },
        }}>
        <TuneIcon/>
      </IconButton>
      <IconButton
        title='Delete Mode'
        onClick={() => {
          if(!deleteMode){
            dispatch(
              setSnackOpen(
                {
                  open: true,
                  message: 'Delete mode activated',
                  severity: 'error'
                }
              )
            )
          }

          setDeleteMode(!deleteMode)
        }}
        sx={{
          backgroundColor: deleteMode ? '#e30000' : 'inherit',
          color: deleteMode ? '#FFFFFF' : '',
          ':hover': {
            backgroundColor: deleteMode ? '#e30000' : '#EAEAEA',
          },
        }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        title='Tag Players'
        onClick={() => handleModalOpen('TagPlayers')}
        // sx={{
        //   backgroundColor: tagMode ? '#009fe3' : 'inherit',
        //   color: tagMode ? '#FFFFFF' : '',
        //   ':hover': {
        //     backgroundColor: tagMode ? '#009fe3' : '#EAEAEA',
        //   },
        // }}
      >
        <AttachFileIcon />
        {/* <CheckIcon /> */}
      </IconButton>
    </Stack>
  )
}

export default Controls