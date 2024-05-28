import { useDispatch } from 'react-redux'
import { setModalOpen } from '../../../app/redux/addPlayerModalSlice'
import { Positions } from '../../interfaces/IPlayer'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import IconButton from '@mui/material/IconButton'
import { Stack } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'
import 'intro.js/introjs.css'

interface Props {
  parent: Positions
  filterByMGO: boolean
  setFilterByMGO: React.Dispatch<React.SetStateAction<boolean>>
}

const Controls: React.FC<Props> = ({ filterByMGO, setFilterByMGO }) => {

  const dispatch = useDispatch()
  const handleModalOpen = () => dispatch(setModalOpen(true))
    
  
  return (
    
    <Stack direction='row'>
      <IconButton
        onClick={handleModalOpen}
        title='Add Player'
        id='add-player'>
        <AddToPhotosIcon/>

      </IconButton>
      <IconButton
        id='filter-by-mgo'
        title='Filter by MGO'
        onClick={() => setFilterByMGO(!filterByMGO)}
        sx={{
          backgroundColor: filterByMGO ? '#27C376' : 'inherit',
          ':hover': {
            backgroundColor: filterByMGO ? '#27C376' : '#EAEAEA',
          },
        }}>
        <TuneIcon/>
      </IconButton>
      
    </Stack>
  )
}

export default Controls