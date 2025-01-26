import { RootState } from '../../../../app/redux/store'
import { useSelector } from 'react-redux'
import TagPlayers from '../TagPlayers'
import { useState } from 'react'
import IPlayer from '../../../interfaces/IPlayer'

const TabPanelTagModal = () => {
  const players = useSelector((state: RootState) => state.gym.benchPlayers)
  const [tagCheckedPlayers, setTagCheckedPlayers] = useState<IPlayer[]>([])

  return (
    <div>
      <div
        className='tag-players-list bg-orange-200'
      >
        {players.map((player) => (
          <TagPlayers key={player.id} player={player} tagCheckedPlayers={tagCheckedPlayers} setTagCheckedPlayers={setTagCheckedPlayers}/>
        ))}
      </div>
    </div>
  )
}

export default TabPanelTagModal