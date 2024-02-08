import { useDispatch } from 'react-redux'
import { createPlayer } from '../../../app/redux/gymSlice'
import { genPlayer } from '../Player/playerGen'
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


// Tutorial Logic




const Controls: React.FC<Props> = ({ parent, filterByMGO, setFilterByMGO }) => {

 
    
  const dispatch = useDispatch()
  
  return (
    
    <Stack direction='row'>
      <IconButton
        onClick={() => {
          dispatch(createPlayer(genPlayer(parent)))
        }}
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