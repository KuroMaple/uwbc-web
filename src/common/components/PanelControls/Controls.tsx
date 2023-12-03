import { useDispatch } from 'react-redux'
import { createPlayer } from '../../../app/redux/gymSlice'
import { genPlayer } from '../Player/playerGen'
import { Positions } from '../../interfaces/IPlayer'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import IconButton from '@mui/material/IconButton'
import { Stack } from '@mui/material'
import TuneIcon from '@mui/icons-material/Tune'

interface Props {
  parent: Positions
  filterMGO: () => void
}

const Controls: React.FC<Props> = ({ parent, filterMGO }) => {

  const dispatch = useDispatch()
  
  return (
    <Stack direction='row'>
      <IconButton
        onClick={() => {
          dispatch(createPlayer(genPlayer(parent)))
        }}
        title='Add Player'>
        <AddToPhotosIcon/>
      </IconButton>
      <IconButton
        title='Filter by MGO'
        onClick={filterMGO}>
        <TuneIcon/>
      </IconButton>
      
    </Stack>
  )
}

export default Controls