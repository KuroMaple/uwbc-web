import { useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import './PlayerCounter.css'


const PlayerCounter = () => {
  const playerCount = useSelector((state: RootState) => state.gym.playerCount)
  return (
    <>
      <span className='counter'>
        {playerCount} / 70
      </span>
    </>
  )
}

export default PlayerCounter