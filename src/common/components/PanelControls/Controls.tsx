import { useDispatch } from 'react-redux'
import { createPlayer } from '../../../app/redux/gymSlice'
import { genPlayer } from '../Player/playerGen'
import { Positions } from '../../interfaces/IPlayer'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos'
import IconButton from '@mui/material/IconButton'
import { Stack } from '@mui/material'

interface Props {
  parent: Positions
}

const Controls: React.FC<Props> = ({ parent }) => {

  const dispatch = useDispatch()
  
  return (
    <Stack>
      <IconButton
        onClick={() => {
          dispatch(createPlayer(genPlayer(parent)))
        }}
        title='Add Player'>
        <AddToPhotosIcon/>
      </IconButton>
      
    </Stack>
  )
}

export default Controls