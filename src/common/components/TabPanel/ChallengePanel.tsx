import Player from '../Player/Player'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/redux/store'
import { selectChallengePlayers } from '../../../app/redux/gymSlice'


const ChallengePanel = () => {
  //States
  const players = useSelector((state: RootState) => selectChallengePlayers(state)) // Memoized selector

  return (
    <div id='bench-players-tab' className="flex flex-col items-center justify-center h-full" >
      <div className='h-TAB-PANEL-RATIO justify-center items-center'>
        {players.map((player) => (
          <Player key={player.id} player={player} isFromChallengePanel={true} />
        ))}
      </div>
    </div>
  )
}

export default ChallengePanel
